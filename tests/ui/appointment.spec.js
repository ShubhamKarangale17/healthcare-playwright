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
     * Login before each test
     * This ensures we have an authenticated session
     */
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click login link
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Enter credentials
    await page.fill(selectors.usernameInput, TEST_USER.username);
    await page.fill(selectors.passwordInput, TEST_USER.password);

    // Click login button
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');

    // Verify we are logged in
    const appointmentHeader = await page.locator(selectors.appointmentHeader);
    await expect(appointmentHeader).toBeVisible();
  });

  test('Book appointment successfully with all details', async ({ page }) => {
    /**
     * Test Case 1: User should successfully book an appointment
     * 
     * Steps:
     * 1. Select facility from dropdown
     * 2. Check hospital readmission checkbox
     * 3. Select healthcare program
     * 4. Choose visit date
     * 5. Enter comment
     * 6. Click Book Appointment button
     * 7. Verify confirmation details
     */

    // Select facility from dropdown
    await page.selectOption(selectors.facilityDropdown, 'Seoul CURA Healthcare Center');
    
    // Verify facility is selected
    const selectedFacility = await page.locator(selectors.facilityDropdown).inputValue();
    expect(selectedFacility).toBe('Seoul CURA Healthcare Center');

    // Check hospital readmission checkbox
    const readmissionCheckbox = await page.locator(selectors.readmissionCheckbox);
    await readmissionCheckbox.check();
    
    // Verify checkbox is checked
    const isChecked = await readmissionCheckbox.isChecked();
    expect(isChecked).toBe(true);

    // Select healthcare program - select Medicare
    await page.locator(selectors.programRadioButtons).first().check();

    // Enter visit date
    await page.fill(selectors.visitDateInput, APPOINTMENT_DATA.visitDate);

    // Verify date is entered
    const enteredDate = await page.locator(selectors.visitDateInput).inputValue();
    expect(enteredDate).toContain('01/01/2025');

    // Enter comment
    await page.fill(selectors.commentTextarea, APPOINTMENT_DATA.comment);

    // Click Book Appointment button
    await page.click(selectors.bookButton);
    await page.waitForLoadState('networkidle');

    // Verify appointment confirmation page is displayed
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible();

    console.log('✓ Appointment booked successfully');
  });

  test('Verify appointment confirmation details are displayed', async ({ page }) => {
    /**
     * Test Case 2: Verify all appointment details are shown on confirmation
     * 
     * Steps:
     * 1. Fill in appointment form
     * 2. Book appointment
     * 3. Verify facility appears in confirmation
     * 4. Verify program appears in confirmation
     * 5. Verify date appears in confirmation
     */

    // Select facility
    await page.selectOption(selectors.facilityDropdown, 'Seoul CURA Healthcare Center');

    // Check readmission checkbox
    await page.locator(selectors.readmissionCheckbox).check();

    // Select program
    await page.locator(selectors.programRadioButtons).first().check();

    // Enter visit date
    await page.fill(selectors.visitDateInput, APPOINTMENT_DATA.visitDate);

    // Enter comment
    await page.fill(selectors.commentTextarea, APPOINTMENT_DATA.comment);

    // Click Book Appointment button
    await page.click(selectors.bookButton);
    await page.waitForLoadState('networkidle');

    // Verify confirmation page
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible();

    // Verify facility is displayed in confirmation
    const pageContent = await page.content();
    expect(pageContent).toContain('Seoul CURA Healthcare Center');

    // Verify date is displayed
    expect(pageContent).toContain('01/01/2025');

    // Verify "Yes" for readmission (checkbox was selected)
    expect(pageContent).toContain('Yes');

    console.log('✓ All appointment details displayed in confirmation');
  });

  test('Verify appointment booking with different facility', async ({ page }) => {
    /**
     * Test Case 3: Book appointment with different facility
     * 
     * Steps:
     * 1. Select different facility (Tokyo CURA Center)
     * 2. Complete appointment form
     * 3. Book appointment
     * 4. Verify facility in confirmation
     */

    // Select different facility - Tokyo
    await page.selectOption(selectors.facilityDropdown, 'Tokyo CURA Healthcare Center');

    // Check readmission checkbox
    await page.locator(selectors.readmissionCheckbox).check();

    // Select program
    await page.locator(selectors.programRadioButtons).nth(1).check(); // UnitedHealthcare

    // Enter visit date
    await page.fill(selectors.visitDateInput, APPOINTMENT_DATA.visitDate);

    // Enter comment
    await page.fill(selectors.commentTextarea, 'Tokyo appointment request');

    // Click Book Appointment button
    await page.click(selectors.bookButton);
    await page.waitForLoadState('networkidle');

    // Verify confirmation
    const confirmationHeader = await page.locator(selectors.confirmationHeader);
    await expect(confirmationHeader).toBeVisible();

    // Verify Tokyo facility in confirmation
    const pageContent = await page.content();
    expect(pageContent).toContain('Tokyo CURA Healthcare Center');

    console.log('✓ Appointment booked with different facility');
  });

  test('Verify appointment form validation', async ({ page }) => {
    /**
     * Test Case 4: Verify form elements are accessible and functional
     * 
     * Steps:
     * 1. Verify facility dropdown exists
     * 2. Verify readmission checkbox exists
     * 3. Verify program radio buttons exist
     * 4. Verify date input exists
     * 5. Verify comment textarea exists
     * 6. Verify book button exists
     */

    // Verify facility dropdown
    const facilityDropdown = await page.locator(selectors.facilityDropdown);
    await expect(facilityDropdown).toBeVisible();
    await expect(facilityDropdown).toBeEnabled();

    // Verify readmission checkbox
    const readmissionCheckbox = await page.locator(selectors.readmissionCheckbox);
    await expect(readmissionCheckbox).toBeVisible();

    // Verify program radio buttons
    const programRadios = await page.locator(selectors.programRadioButtons);
    const radioCount = await programRadios.count();
    expect(radioCount).toBeGreaterThan(0);

    // Verify date input
    const dateInput = await page.locator(selectors.visitDateInput);
    await expect(dateInput).toBeVisible();
    await expect(dateInput).toBeEnabled();

    // Verify comment textarea
    const commentTextarea = await page.locator(selectors.commentTextarea);
    await expect(commentTextarea).toBeVisible();
    await expect(commentTextarea).toBeEnabled();

    // Verify book button
    const bookButton = await page.locator(selectors.bookButton);
    await expect(bookButton).toBeVisible();
    await expect(bookButton).toBeEnabled();

    console.log('✓ All appointment form elements validated');
  });
});
