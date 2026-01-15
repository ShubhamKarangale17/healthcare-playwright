/**
 * Example Test File - Advanced Usage
 * 
 * This file demonstrates:
 * 1. Using helper functions from testHelpers
 * 2. Using centralized config from testConfig
 * 3. Creating reusable test utilities
 * 4. Building maintainable test suites
 * 
 * Copy this pattern to create new tests with maximum reusability
 */

const { test, expect } = require('@playwright/test');
const {
  loginUser,
  logoutUser,
  bookAppointment,
  apiGetRequest,
  apiPostRequest,
  validateApiStatus,
} = require('../../helpers/testHelpers');
const {
  APP_CONFIG,
  TEST_CREDENTIALS,
  APPOINTMENT_DATA,
  PATIENT_DATA,
  SELECTORS,
  HTTP_STATUS,
  TIMEOUTS,
} = require('../../config/testConfig');

/**
 * EXAMPLE 1: Using Helpers with Config
 * 
 * This demonstrates how to use reusable functions
 * Across multiple test files, reducing code duplication
 * 
 * NOTE: These are example tests showing patterns - they are skipped by default
 * Uncomment test.only() to run individual examples
 */
test.describe.skip('Example - Login with Helpers - @ui @example', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to home page
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    await page.waitForLoadState('networkidle');
  });

  test('Login using helper function', async ({ page }) => {
    // Use the loginUser helper instead of writing login code every time
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );

    // Verify we're logged in
    const appointmentHeader = await page.locator(SELECTORS.headers.appointmentHeader);
    await expect(appointmentHeader).toBeVisible();
  });

  test('Book appointment using helper', async ({ page }) => {
    // First login
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );

    // Then book appointment using helper
    await bookAppointment(page, APPOINTMENT_DATA.defaultAppointment);

    // Verify confirmation
    const confirmationHeader = await page.locator(SELECTORS.confirmation.header);
    await expect(confirmationHeader).toBeVisible();
  });

  test('Logout using helper', async ({ page }) => {
    // Login
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );

    // Logout using helper
    await logoutUser(page);

    // Verify logged out
    const loginLink = await page.locator(SELECTORS.navigation.loginLink);
    await expect(loginLink).toBeVisible();
  });
});

/**
 * EXAMPLE 2: Using Config for Data-Driven Tests
 * 
 * This demonstrates how to use config data to create
 * parameterized tests that test multiple scenarios
 */
test.describe.skip('Example - Data-Driven Appointment Tests - @ui @example', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );
  });

  test('Book appointment at default facility', async ({ page }) => {
    await bookAppointment(page, APPOINTMENT_DATA.defaultAppointment);
    await expect(page.locator(SELECTORS.confirmation.header)).toBeVisible();
  });

  test('Book appointment at alternate facility', async ({ page }) => {
    await bookAppointment(page, APPOINTMENT_DATA.alternateAppointment);
    await expect(page.locator(SELECTORS.confirmation.header)).toBeVisible();
  });

  test('Book appointment with all facilities', async ({ page }) => {
    // Loop through all facilities
    for (const facility of APPOINTMENT_DATA.facilities) {
      // Create appointment data
      const appointmentData = {
        ...APPOINTMENT_DATA.defaultAppointment,
        facility: facility,
      };

      // Navigate back to form
      await page.goto(`${APP_CONFIG.healthcareApp.baseUrl}/profile.php`);
      await page.waitForLoadState('networkidle');

      // Book appointment
      await bookAppointment(page, appointmentData);
      await expect(page.locator(SELECTORS.confirmation.header)).toBeVisible();

      // Verify facility in confirmation
      const pageContent = await page.content();
      expect(pageContent).toContain(facility);
    }
  });
});

/**
 * EXAMPLE 3: API Testing with Helpers and Config
 * 
 * This demonstrates how to use helper functions
 * for API testing with centralized configuration
 */
test.describe.skip('Example - API Testing with Helpers - @api @example', () => {

  test('Get all patients and validate status', async ({ request }) => {
    // Use API helper function
    const response = await apiGetRequest(
      request,
      APP_CONFIG.api.baseUrl,
      APP_CONFIG.api.endpoints.users
    );

    // Use HTTP status constants
    validateApiStatus(response.status, HTTP_STATUS.OK);

    // Validate response data
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Create patient using helper and config data', async ({ request }) => {
    // Use API helper with patient data from config
    const response = await apiPostRequest(
      request,
      APP_CONFIG.api.baseUrl,
      APP_CONFIG.api.endpoints.users,
      PATIENT_DATA.newPatient
    );

    // Validate response
    validateApiStatus(response.status, HTTP_STATUS.CREATED);
    expect(response.data.name).toBe(PATIENT_DATA.newPatient.name);
    expect(response.data.email).toBe(PATIENT_DATA.newPatient.email);
  });

  test('Create multiple patients from config', async ({ request }) => {
    const patients = [
      PATIENT_DATA.newPatient,
      PATIENT_DATA.updatedPatient,
      PATIENT_DATA.alternatePatient,
    ];

    for (const patient of patients) {
      const response = await apiPostRequest(
        request,
        APP_CONFIG.api.baseUrl,
        APP_CONFIG.api.endpoints.users,
        patient
      );

      validateApiStatus(response.status, HTTP_STATUS.CREATED);
      expect(response.data.id).toBeGreaterThan(0);
    }
  });
});

/**
 * EXAMPLE 4: Using Selectors from Config
 * 
 * Demonstrates how to use centralized selector definitions
 * making tests maintainable when UI changes
 */
test.describe.skip('Example - Selector-Based Tests - @ui @example', () => {
  
  test('Verify all login form elements using config selectors', async ({ page }) => {
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    await page.click(SELECTORS.navigation.loginLink);
    await page.waitForLoadState('networkidle');

    // Use selectors from config
    const usernameInput = page.locator(SELECTORS.login.usernameInput);
    const passwordInput = page.locator(SELECTORS.login.passwordInput);
    const loginButton = page.locator(SELECTORS.login.loginButton);

    // Verify all elements are visible
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('Verify all appointment form elements using config', async ({ page }) => {
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    
    // Login first
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );

    // Verify appointment form elements using config selectors
    const facilityDropdown = page.locator(SELECTORS.appointment.facilityDropdown);
    const readmissionCheckbox = page.locator(SELECTORS.appointment.readmissionCheckbox);
    const visitDateInput = page.locator(SELECTORS.appointment.visitDateInput);
    const commentTextarea = page.locator(SELECTORS.appointment.commentTextarea);
    const bookButton = page.locator(SELECTORS.appointment.bookButton);

    await expect(facilityDropdown).toBeVisible();
    await expect(readmissionCheckbox).toBeVisible();
    await expect(visitDateInput).toBeVisible();
    await expect(commentTextarea).toBeVisible();
    await expect(bookButton).toBeVisible();
  });
});

/**
 * EXAMPLE 5: Using Timeouts from Config
 * 
 * Demonstrates how to use consistent timeout values
 * across all tests from a centralized location
 */
test.describe.skip('Example - Timeout Configuration - @ui @example', () => {

  test('Wait for element with timeout from config', async ({ page }) => {
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);

    // Use timeout value from config
    const loginLink = await page.locator(SELECTORS.navigation.loginLink);
    await loginLink.waitFor({ timeout: TIMEOUTS.elementWait });
    await expect(loginLink).toBeVisible();
  });

  test('Network idle with timeout from config', async ({ page }) => {
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    
    // Use network idle timeout from config
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(TIMEOUTS.screenshot);

    // Verify page is loaded
    const content = await page.content();
    expect(content.length).toBeGreaterThan(0);
  });
});

/**
 * EXAMPLE 6: Complex Workflow Test
 * 
 * Demonstrates a complete user journey using
 * all available helpers and config
 */
test.describe.skip('Example - Complete User Journey - @ui @example', () => {

  test('Complete workflow: login, book appointment, logout', async ({ page }) => {
    // Step 1: Navigate to application
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    console.log('✓ Navigated to healthcare application');

    // Step 2: Login using helper
    await loginUser(
      page,
      TEST_CREDENTIALS.validUser.username,
      TEST_CREDENTIALS.validUser.password
    );
    console.log('✓ User logged in');

    // Step 3: Book appointment using helper
    await bookAppointment(page, APPOINTMENT_DATA.defaultAppointment);
    console.log('✓ Appointment booked');

    // Step 4: Verify confirmation
    const confirmationHeader = await page.locator(SELECTORS.confirmation.header);
    await expect(confirmationHeader).toBeVisible();
    console.log('✓ Confirmation verified');

    // Step 5: Navigate back to home
    await page.goto(APP_CONFIG.healthcareApp.baseUrl);
    console.log('✓ Navigated to home page');

    // Step 6: Logout using helper
    await logoutUser(page);
    console.log('✓ User logged out');

    // Step 7: Verify logout
    const loginLink = await page.locator(SELECTORS.navigation.loginLink);
    await expect(loginLink).toBeVisible();
    console.log('✓ Logout verified');

    console.log('✓✓✓ Complete workflow test passed ✓✓✓');
  });
});

/**
 * KEY TAKEAWAYS FOR EXTENDING THIS FRAMEWORK
 * 
 * 1. REUSE HELPERS:
 *    Import helper functions to reduce code duplication
 *    - loginUser, logoutUser, bookAppointment
 *    - API request helpers
 * 
 * 2. USE CENTRALIZED CONFIG:
 *    Access all configuration from testConfig.js
 *    - APP_CONFIG for URLs and endpoints
 *    - TEST_CREDENTIALS for test data
 *    - SELECTORS for element locators
 *    - TIMEOUTS for wait values
 *    - HTTP_STATUS constants
 * 
 * 3. DRY PRINCIPLE:
 *    Don't repeat code - use helpers for common operations
 *    When creating new tests, look for similar logic
 * 
 * 4. MAINTAINABILITY:
 *    Update selectors in one place (testConfig.js)
 *    Update timeouts globally
 *    Update test data without touching test logic
 * 
 * 5. SCALABILITY:
 *    This pattern allows adding hundreds of tests
 *    without significantly increasing codebase complexity
 */
