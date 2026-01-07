const { test, expect } = require('@playwright/test');

/**
 * Login Test Suite
 * Tests user authentication functionality on the Healthcare demo website
 */

// Test data
const VALID_USERNAME = 'John Doe';
const VALID_PASSWORD = 'ThisIsNotAPassword';
const INVALID_USERNAME = 'InvalidUser';
const INVALID_PASSWORD = 'WrongPassword';

// Page selectors
const selectors = {
  loginLink: 'a[href="./profile.php?mode=login"]',
  usernameInput: 'input#txt-username',
  passwordInput: 'input#txt-password',
  loginButton: 'button#btn-login',
  errorMessage: 'div.alert-danger',
  appointmentHeader: 'h1:has-text("Make Appointment")',
  logoutLink: 'a:has-text("Logout")',
};

test.describe('Login Tests - @ui @login', () => {
  
  test.beforeEach(async ({ page }) => {
    /**
     * Navigate to the homepage before each test
     * This ensures we start from a known state
     */
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Verify successful login with valid credentials', async ({ page }) => {
    /**
     * Test Case 1: User should successfully login with valid credentials
     * 
     * Steps:
     * 1. Click on Login link
     * 2. Enter valid username
     * 3. Enter valid password
     * 4. Click Login button
     * 5. Verify redirect to Make Appointment page
     * 6. Verify logout link is visible (indicating user is logged in)
     */

    // Click on login link to navigate to login page
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Verify we are on the login page
    const urlAfterClick = page.url();
    expect(urlAfterClick).toContain('profile.php');

    // Enter username
    await page.fill(selectors.usernameInput, VALID_USERNAME);

    // Enter password
    await page.fill(selectors.passwordInput, VALID_PASSWORD);

    // Click login button
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');

    // Verify successful login by checking for Make Appointment header
    const appointmentHeader = await page.locator(selectors.appointmentHeader);
    await expect(appointmentHeader).toBeVisible();

    // Verify logout link is visible (user is authenticated)
    const logoutLink = await page.locator(selectors.logoutLink);
    await expect(logoutLink).toBeVisible();

    console.log('✓ User successfully logged in with valid credentials');
  });

  test('Verify error message on invalid login credentials', async ({ page }) => {
    /**
     * Test Case 2: User should see error message with invalid credentials
     * 
     * Steps:
     * 1. Click on Login link
     * 2. Enter invalid username
     * 3. Enter invalid password
     * 4. Click Login button
     * 5. Verify error message is displayed
     * 6. Verify user remains on login page
     */

    // Click on login link
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Enter invalid username
    await page.fill(selectors.usernameInput, INVALID_USERNAME);

    // Enter invalid password
    await page.fill(selectors.passwordInput, INVALID_PASSWORD);

    // Click login button
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');

    // Verify error message is displayed
    const errorMessage = await page.locator(selectors.errorMessage);
    await expect(errorMessage).toBeVisible();

    // Verify error message contains appropriate text
    const errorText = await errorMessage.textContent();
    expect(errorText).toContain('Login failed');

    // Verify we are still on the login page (username field should be visible)
    const usernameField = await page.locator(selectors.usernameInput);
    await expect(usernameField).toBeVisible();

    console.log('✓ Error message displayed for invalid credentials');
  });

  test('Verify error message with empty credentials', async ({ page }) => {
    /**
     * Test Case 3: User should see error with empty fields
     * 
     * Steps:
     * 1. Click on Login link
     * 2. Leave username and password empty
     * 3. Click Login button
     * 4. Verify error message or validation
     */

    // Click on login link
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Click login button without entering credentials
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');

    // Verify error message is displayed
    const errorMessage = await page.locator(selectors.errorMessage);
    await expect(errorMessage).toBeVisible();

    console.log('✓ Error message displayed for empty credentials');
  });

  test('Verify login form elements are present', async ({ page }) => {
    /**
     * Test Case 4: Verify all required login form elements exist
     * 
     * Steps:
     * 1. Click on Login link
     * 2. Verify username input field is visible
     * 3. Verify password input field is visible
     * 4. Verify login button is visible
     */

    // Click on login link
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Verify all form elements are present
    const usernameInput = await page.locator(selectors.usernameInput);
    const passwordInput = await page.locator(selectors.passwordInput);
    const loginButton = await page.locator(selectors.loginButton);

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();

    // Verify button text
    const buttonText = await loginButton.textContent();
    expect(buttonText).toContain('Login');

    console.log('✓ All login form elements are visible');
  });
});
