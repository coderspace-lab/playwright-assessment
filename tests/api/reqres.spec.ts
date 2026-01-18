import { test, expect } from '@playwright/test';

test.describe('API Tests - JSONPlaceholder', () => {
  const baseURL = process.env.API_BASE_URL!;

  // Requirement 1: Retrieve a list of users
  test('GET - Retrieve list of users', async ({ request }) => {
    const response = await request.get(`${baseURL}/users`);
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    
    // Verify user structure
    const firstUser = body[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('email');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('username');
  });

  // Requirement 2: Perform a successful login (simulate with POST)
  test('POST - Create a resource (simulates login)', async ({ request }) => {
    const response = await request.post(`${baseURL}/users`, {
      data: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com'
      }
    });
    
    expect(response.status()).toBe(201); // Created
    
    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.name).toBe('John Doe');
    expect(body.email).toBe('john@example.com');
  });

  // Requirement 3: Perform an update
  test('PUT - Update a user', async ({ request }) => {
    const response = await request.put(`${baseURL}/users/1`, {
      data: {
        name: 'John Updated',
        username: 'johnupdated',
        email: 'john.updated@example.com'
      }
    });
    
    expect(response.status()).toBe(200);
    
    const body = await response.json();
    expect(body.name).toBe('John Updated');
    expect(body.email).toBe('john.updated@example.com');
  });

  // Requirement 4: Perform a deletion
  test('DELETE - Delete a user', async ({ request }) => {
    const response = await request.delete(`${baseURL}/users/1`);
    
    expect(response.status()).toBe(200);
  });

  // Requirement 5a: Negative scenario - Get non-existent resource
  test('GET - Retrieve non-existent user (negative)', async ({ request }) => {
    const response = await request.get(`${baseURL}/users/999999`);
    
    expect(response.status()).toBe(404);
  });

  // Requirement 5b: Negative scenario - Invalid POST data
  test('POST - Create user with invalid endpoint (negative)', async ({ request }) => {
    const response = await request.post(`${baseURL}/invalid-endpoint`, {
      data: {
        name: 'Test'
      }
    });
    
    expect(response.status()).toBe(404);
  });

  // Requirement 6: Parameterized request with timing (simulate delay)
  test('GET - Request with timing validation', async ({ request }) => {
    const startTime = Date.now();
    
    // Get multiple resources to have measurable time
    const response = await request.get(`${baseURL}/posts`);
    
    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000; // Convert to seconds
    
    expect(response.status()).toBe(200);
    
    // Verify request completed within reasonable time (under 3 seconds)
    expect(elapsedTime).toBeLessThan(3);
    
    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
    
    console.log(`Request took ${elapsedTime.toFixed(3)} seconds`);
  });
});