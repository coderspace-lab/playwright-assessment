# playwright-assessment
End-to-end test automation for SauceDemo and JSONPlaceholder API using Playwright with TypeScript.

## Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install --with-deps
```

## Environment Setup

Create a `.env` file in the root directory:
```bash
# UI Testing
UI_BASE_URL=https://www.saucedemo.com
STANDARD_USER=your_username_here
PASSWORD=your_password_here

# API Testing
API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Running Tests
```bash
# Run all tests
npx playwright test

# Run UI tests only
npx playwright test tests/ui/

# Run API tests only
npx playwright test tests/api/

# Run specific test file
npx playwright test tests/ui/checkout.spec.ts

# Run with UI (headed mode)
npx playwright test --headed

# Debug mode
npx playwright test --debug
```
## Test Reports
```bash
# View HTML report after test run
npx playwright show-report
```
**Latest Test Report in CI/CD:** [View Report](https://coderspace-lab.github.io/playwright-assessment/)

## CI/CD

Tests run automatically on:
- Push to `main` branch
- Pull requests to `main` branch

Pipeline includes:
- Dependency installation
- Browser setup
- Test execution
- Report artifact upload
