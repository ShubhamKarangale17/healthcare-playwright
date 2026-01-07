/**
 * Playwright Test Helpers
 * 
 * Collection of reusable helper functions for common test operations
 * These can be imported and used in your test files
 * 
 * Usage:
 * const { loginUser, bookAppointment } = require('../helpers/testHelpers');
 * 
 * Then in test:
 * await loginUser(page, username, password);
 */

/**
 * Login Helper Function
 * 
 * Automates the login process
 * 
 * @param {Page} page - Playwright page object
 * @param {string} username - Login username
 * @param {string} password - Login password
 * @returns {Promise<void>}
 */
async function loginUser(page, username, password) {
  const selectors = {
    loginLink: 'a[href="./profile.php?mode=login"]',
    usernameInput: 'input#txt-username',
    passwordInput: 'input#txt-password',
    loginButton: 'button#btn-login',
  };

  try {
    // Click login link
    await page.click(selectors.loginLink);
    await page.waitForLoadState('networkidle');

    // Fill username
    await page.fill(selectors.usernameInput, username);

    // Fill password
    await page.fill(selectors.passwordInput, password);

    // Click login button
    await page.click(selectors.loginButton);
    await page.waitForLoadState('networkidle');

    console.log(`✓ Successfully logged in as: ${username}`);
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
}

/**
 * Logout Helper Function
 * 
 * Logs out the current user
 * 
 * @param {Page} page - Playwright page object
 * @returns {Promise<void>}
 */
async function logoutUser(page) {
  const logoutLink = 'a:has-text("Logout")';

  try {
    await page.click(logoutLink);
    await page.waitForLoadState('networkidle');
    console.log('✓ Successfully logged out');
  } catch (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }
}

/**
 * Book Appointment Helper Function
 * 
 * Books an appointment with provided details
 * 
 * @param {Page} page - Playwright page object
 * @param {Object} appointmentData - Appointment details
 * @param {string} appointmentData.facility - Facility name
 * @param {boolean} appointmentData.readmission - Hospital readmission checkbox
 * @param {string} appointmentData.program - Healthcare program
 * @param {string} appointmentData.visitDate - Visit date
 * @param {string} appointmentData.comment - Appointment comment
 * @returns {Promise<void>}
 */
async function bookAppointment(page, appointmentData) {
  const selectors = {
    facilityDropdown: 'select#combo_facility',
    readmissionCheckbox: 'input#chk_hospotal_readmission',
    programRadioButtons: 'input[name="radio_program"]',
    visitDateInput: 'input#txt_visit_date',
    commentTextarea: 'textarea#txt_comment',
    bookButton: 'button#btn-book-appointment',
  };

  try {
    // Select facility
    if (appointmentData.facility) {
      await page.selectOption(selectors.facilityDropdown, appointmentData.facility);
    }

    // Check readmission checkbox
    if (appointmentData.readmission) {
      await page.check(selectors.readmissionCheckbox);
    }

    // Select program (first option by default)
    if (appointmentData.program) {
      const programOption = appointmentData.program === 'Medicare' ? 0 : 1;
      await page.locator(selectors.programRadioButtons).nth(programOption).check();
    }

    // Enter visit date
    if (appointmentData.visitDate) {
      await page.fill(selectors.visitDateInput, appointmentData.visitDate);
    }

    // Enter comment
    if (appointmentData.comment) {
      await page.fill(selectors.commentTextarea, appointmentData.comment);
    }

    // Click book appointment button
    await page.click(selectors.bookButton);
    await page.waitForLoadState('networkidle');

    console.log('✓ Appointment booked successfully');
  } catch (error) {
    throw new Error(`Booking appointment failed: ${error.message}`);
  }
}

/**
 * API Helper Function - GET Request
 * 
 * Makes a GET request to the API
 * 
 * @param {APIRequestContext} request - Playwright request context
 * @param {string} baseURL - Base URL for API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<{status: number, data: Object}>}
 */
async function apiGetRequest(request, baseURL, endpoint) {
  try {
    const response = await request.get(`${baseURL}${endpoint}`);
    const status = response.status();
    const data = await response.json();

    return {
      status,
      data,
    };
  } catch (error) {
    throw new Error(`GET request failed: ${error.message}`);
  }
}

/**
 * API Helper Function - POST Request
 * 
 * Makes a POST request to the API
 * 
 * @param {APIRequestContext} request - Playwright request context
 * @param {string} baseURL - Base URL for API
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body data
 * @returns {Promise<{status: number, data: Object}>}
 */
async function apiPostRequest(request, baseURL, endpoint, payload) {
  try {
    const response = await request.post(`${baseURL}${endpoint}`, {
      data: payload,
    });

    const status = response.status();
    const data = await response.json();

    return {
      status,
      data,
    };
  } catch (error) {
    throw new Error(`POST request failed: ${error.message}`);
  }
}

/**
 * API Helper Function - PUT Request
 * 
 * Makes a PUT request to the API
 * 
 * @param {APIRequestContext} request - Playwright request context
 * @param {string} baseURL - Base URL for API
 * @param {string} endpoint - API endpoint
 * @param {Object} payload - Request body data
 * @returns {Promise<{status: number, data: Object}>}
 */
async function apiPutRequest(request, baseURL, endpoint, payload) {
  try {
    const response = await request.put(`${baseURL}${endpoint}`, {
      data: payload,
    });

    const status = response.status();
    const data = await response.json();

    return {
      status,
      data,
    };
  } catch (error) {
    throw new Error(`PUT request failed: ${error.message}`);
  }
}

/**
 * API Helper Function - DELETE Request
 * 
 * Makes a DELETE request to the API
 * 
 * @param {APIRequestContext} request - Playwright request context
 * @param {string} baseURL - Base URL for API
 * @param {string} endpoint - API endpoint
 * @returns {Promise<{status: number, data: Object}>}
 */
async function apiDeleteRequest(request, baseURL, endpoint) {
  try {
    const response = await request.delete(`${baseURL}${endpoint}`);
    const status = response.status();
    const data = await response.json();

    return {
      status,
      data,
    };
  } catch (error) {
    throw new Error(`DELETE request failed: ${error.message}`);
  }
}

/**
 * Wait for Element Visibility Helper
 * 
 * Waits for an element to become visible
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<void>}
 */
async function waitForElement(page, selector, timeout = 5000) {
  try {
    await page.waitForSelector(selector, { timeout });
    console.log(`✓ Element visible: ${selector}`);
  } catch (error) {
    throw new Error(`Element not found within timeout: ${selector}`);
  }
}

/**
 * Get Element Text Helper
 * 
 * Retrieves text content of an element
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @returns {Promise<string>}
 */
async function getElementText(page, selector) {
  try {
    const text = await page.locator(selector).textContent();
    return text.trim();
  } catch (error) {
    throw new Error(`Failed to get text from element: ${selector}`);
  }
}

/**
 * Check Element Exists Helper
 * 
 * Checks if an element exists on the page
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @returns {Promise<boolean>}
 */
async function elementExists(page, selector) {
  try {
    const count = await page.locator(selector).count();
    return count > 0;
  } catch (error) {
    return false;
  }
}

/**
 * Fill Form Field Helper
 * 
 * Fills a form field with provided value
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Input field selector
 * @param {string} value - Value to enter
 * @returns {Promise<void>}
 */
async function fillFormField(page, selector, value) {
  try {
    await page.fill(selector, value);
    console.log(`✓ Field filled: ${selector}`);
  } catch (error) {
    throw new Error(`Failed to fill field ${selector}: ${error.message}`);
  }
}

/**
 * Click Element Helper
 * 
 * Clicks on an element with error handling
 * 
 * @param {Page} page - Playwright page object
 * @param {string} selector - Element selector
 * @returns {Promise<void>}
 */
async function clickElement(page, selector) {
  try {
    await page.click(selector);
    console.log(`✓ Element clicked: ${selector}`);
  } catch (error) {
    throw new Error(`Failed to click element ${selector}: ${error.message}`);
  }
}

/**
 * Take Screenshot Helper
 * 
 * Captures a screenshot of the current page
 * 
 * @param {Page} page - Playwright page object
 * @param {string} filename - Output filename
 * @returns {Promise<void>}
 */
async function takeScreenshot(page, filename) {
  try {
    await page.screenshot({ path: `screenshots/${filename}.png` });
    console.log(`✓ Screenshot taken: ${filename}`);
  } catch (error) {
    throw new Error(`Failed to take screenshot: ${error.message}`);
  }
}

/**
 * Validate API Response Status
 * 
 * Validates HTTP response status codes
 * 
 * @param {number} actualStatus - Actual response status
 * @param {number} expectedStatus - Expected response status
 * @throws {Error} If status doesn't match
 * @returns {boolean}
 */
function validateApiStatus(actualStatus, expectedStatus) {
  if (actualStatus !== expectedStatus) {
    throw new Error(
      `API Status mismatch. Expected: ${expectedStatus}, Got: ${actualStatus}`
    );
  }
  return true;
}

/**
 * Validate API Response Has Fields
 * 
 * Validates that API response contains required fields
 * 
 * @param {Object} data - Response data
 * @param {Array} requiredFields - Array of required field names
 * @throws {Error} If required fields are missing
 * @returns {boolean}
 */
function validateApiResponseFields(data, requiredFields) {
  const missingFields = requiredFields.filter((field) => !(field in data));

  if (missingFields.length > 0) {
    throw new Error(
      `Response missing required fields: ${missingFields.join(', ')}`
    );
  }
  return true;
}

// Export all helper functions
module.exports = {
  // Authentication helpers
  loginUser,
  logoutUser,

  // Appointment helpers
  bookAppointment,

  // API helpers
  apiGetRequest,
  apiPostRequest,
  apiPutRequest,
  apiDeleteRequest,

  // Page interaction helpers
  waitForElement,
  getElementText,
  elementExists,
  fillFormField,
  clickElement,
  takeScreenshot,

  // Validation helpers
  validateApiStatus,
  validateApiResponseFields,
};
