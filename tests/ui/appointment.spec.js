const { test, expect } = require('@playwright/test');

/**
 * Appointment Test Suite
 * Tests appointment booking functionality on the Healthcare demo website
 */

// Test data
const TEST_USER = {
  username: 'John Doe',
  password: 'ThisIsNotAPassword',
};

const APPOINTMENT_DATA = {
  facility: 'Seoul CURA Healthcare Center',
  visitDate: '01/01/2025',
  comment: 'Please schedule at your earliest convenience.',
};

// Page selectors
const selectors = {
  loginLink: 'a[href="./profile.php?mode=login"]',
  usernameInput: 'input#txt-username',
  passwordInput: 'input#txt-password',
  loginButton: 'button#btn-login',
  appointmentHeader: 'h1:has-text("Make Appointment")',
  facilityDropdown: 'select#combo_facility',
  readmissionCheckbox: 'input#chk_hospotal_readmission',
  programRadioButtons: 'input[name="radio_program"]',
  visitDateInput: 'input#txt_visit_date',
  commentTextarea: 'textarea#txt_comment',
  bookButton: 'button#btn-book-appointment',
  confirmationHeader: 'h2:has-text("Appointment Confirmation")',
  confirmationDetails: 'div.col-xs-12',
  logoutLink: 'a:has-text("Logout")',
};

test.describe('Appointment Tests - @ui @appointment', () => {
  
  test.beforeEach(async ({ page }) => {
    /**
     * Login before each test with extended waits
     */
    // Go to homepage
    await page.goto('/', { waitUntil: 'load' });
    await page.waitForTimeout(3000);

    // Click login link and wait for it to be ready
    const loginLink = await page.locator(selectors.loginLink);
    await loginLink.waitFor({ state: 'visible', timeout: 15000 });
    await loginLink.click();
    await page.waitForTimeout(2000);

    // Fill credentials
    const usernameField = await page.locator(selectors.usernameInput);
    await usernameField.waitFor({ state: 'visible', timeout: 10000 });
    await usernameField.fill(TEST_USER.username);
    await page.waitForTimeout(500);

    const passwordField = await page.locator(selectors.passwordInput);
    await passwordField.fill(TEST_USER.password);
    await page.waitForTimeout(500);

    // Click login
    const loginButton = await page.locator(selectors.loginButton);
    await loginButton.click();
    await page.waitForTimeout(3000);

    // Wait for appointment page to load
    const appointmentHeader = await page.locator(selectors.appointmentHeader);
    try {
      await appointmentHeader.waitFor({ state: 'visible', timeout: 20000 });
    } catch (e) {
      console.log('Appointment header not found, page content:', await page.content().then(c => c.substring(0, 500)));
      throw e;
    }
  });

  test('Book appointment successfully with all details', async ({ page }) => {
    /**
     * Test Case 1: User should successfully book an appointment
     */

    // Select facility
    const facilityDropdown = await page.locator(selectors.facilityDropdown);
    await facilityDropdown.selectOption('Seoul CURA Healthcare Center');
    await page.waitForTimeout(500);

    // Check readmission checkbox
    const readmissionCheckbox = await page.locator(selectors.readmissionCheckbox);
    await readmissionCheckbox.check();
    await page.waitForTimeout(500);

    // Select program
    const programRadios = await page.locator(selectors.programRadioButtons);
    await programRadios.first().check();
    await page.waitForTimeout(500);

    // Enter visit date
    const dateInput = await page.locator(selectors.visitDateInput);
    await dateInput.fill(APPOINTMENT_DATA.visitDate);
    await page.waitForTimeout(500);

    // Enter comment
    const commentField = await page.locator(selectors.commentTextarea);
    await commentField.fill(APPOINTMENT_DATA.comment);
    await page.waitForTimeout(500);

    // Click Book Appointment
    const bookButton = await page.locator(selectors.bookButton);
    await bookButton.click();
    await page.waitForTimeout(3000);

    // Verify confirmation
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible({ timeout: 10000 });

    console.log('✓ Appointment booked successfully');
  });

  test('Verify appointment confirmation details are displayed', async ({ page }) => {
    /**
     * Test Case 2: Verify all appointment details shown on confirmation
     */

    // Fill and book appointment
    await page.locator(selectors.facilityDropdown).selectOption('Seoul CURA Healthcare Center');
    await page.waitForTimeout(500);
    await page.locator(selectors.readmissionCheckbox).check();
    await page.waitForTimeout(500);
    await page.locator(selectors.programRadioButtons).first().check();
    await page.waitForTimeout(500);
    await page.locator(selectors.visitDateInput).fill(APPOINTMENT_DATA.visitDate);
    await page.waitForTimeout(500);
    await page.locator(selectors.commentTextarea).fill(APPOINTMENT_DATA.comment);
    await page.waitForTimeout(500);
    await page.locator(selectors.bookButton).click();
    await page.waitForTimeout(3000);

    // Verify confirmation page
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible({ timeout: 10000 });

    // Verify facility in confirmation
    const pageContent = await page.content();
    expect(pageContent).toContain('Seoul CURA Healthcare Center');
    expect(pageContent).toContain('01/01/2025');
    expect(pageContent).toContain('Yes');

    console.log('✓ All appointment details displayed in confirmation');
  });

  test('Verify appointment booking with different facility', async ({ page }) => {
    /**
     * Test Case 3: Book appointment with different facility
     */

    // Select different facility
    await page.locator(selectors.facilityDropdown).selectOption('Tokyo CURA Healthcare Center');
    await page.waitForTimeout(500);
    await page.locator(selectors.readmissionCheckbox).check();
    await page.waitForTimeout(500);
    await page.locator(selectors.programRadioButtons).nth(1).check();
    await page.waitForTimeout(500);
    await page.locator(selectors.visitDateInput).fill(APPOINTMENT_DATA.visitDate);
    await page.waitForTimeout(500);
    await page.locator(selectors.commentTextarea).fill('Tokyo appointment request');
    await page.waitForTimeout(500);
    await page.locator(selectors.bookButton).click();
    await page.waitForTimeout(3000);

    // Verify confirmation
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible({ timeout: 10000 });

    const pageContent = await page.content();
    expect(pageContent).toContain('Tokyo CURA Healthcare Center');

    console.log('✓ Appointment booked with different facility');
  });

  test('Verify appointment form validation', async ({ page }) => {
    /**
     * Test Case 4: Verify form elements are accessible
     */

    const facilityDropdown = await page.locator(selectors.facilityDropdown);
    await expect(facilityDropdown).toBeVisible();
    await expect(facilityDropdown).toBeEnabled();

    const readmissionCheckbox = await page.locator(selectors.readmissionCheckbox);
    await expect(readmissionCheckbox).toBeVisible();

    const programRadios = await page.locator(selectors.programRadioButtons);
    const radioCount = await programRadios.count();
    expect(radioCount).toBeGreaterThan(0);

    const dateInput = await page.locator(selectors.visitDateInput);
    await expect(dateInput).toBeVisible();
    await expect(dateInput).toBeEnabled();

    const commentTextarea = await page.locator(selectors.commentTextarea);
    await expect(commentTextarea).toBeVisible();
    await expect(commentTextarea).toBeEnabled();

    const bookButton = await page.locator(selectors.bookButton);
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();

    console.log('✓ All appointment form elements validated');
  });
});
