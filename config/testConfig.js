/**
 * Test Configuration and Constants
 * 
 * Centralized configuration for all test values
 * This makes it easy to update values globally
 */

// ============================================
// APPLICATION CONFIGURATION
// ============================================

const APP_CONFIG = {
  // Healthcare Demo Website
  healthcareApp: {
    baseUrl: 'https://katalon-demo-cura.herokuapp.com',
    homepage: '/',
    loginPath: '/profile.php?mode=login',
    appointmentPath: '/profile.php',
  },

  // JSON Placeholder API (for API testing)
  api: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    endpoints: {
      users: '/users',
      posts: '/posts',
      comments: '/comments',
    },
  },
};

// ============================================
// TEST CREDENTIALS
// ============================================

const TEST_CREDENTIALS = {
  validUser: {
    username: 'John Doe',
    password: 'ThisIsNotAPassword',
  },

  invalidUser: {
    username: 'InvalidUser',
    password: 'WrongPassword',
  },

  emptyCredentials: {
    username: '',
    password: '',
  },
};

// ============================================
// APPOINTMENT TEST DATA
// ============================================

const APPOINTMENT_DATA = {
  defaultAppointment: {
    facility: 'Seoul CURA Healthcare Center',
    readmission: true,
    program: 'Medicare',
    visitDate: '01/01/2025',
    comment: 'Please schedule at your earliest convenience.',
  },

  alternateAppointment: {
    facility: 'Tokyo CURA Healthcare Center',
    readmission: false,
    program: 'UnitedHealthcare',
    visitDate: '02/15/2025',
    comment: 'Tokyo appointment request',
  },

  londonAppointment: {
    facility: 'London CURA Healthcare Center',
    readmission: true,
    program: 'Medicaid',
    visitDate: '03/20/2025',
    comment: 'London facility appointment',
  },

  facilities: [
    'Seoul CURA Healthcare Center',
    'Tokyo CURA Healthcare Center',
    'London CURA Healthcare Center',
  ],

  programs: [
    'Medicare',
    'UnitedHealthcare',
    'Medicaid',
  ],
};

// ============================================
// PATIENT/API TEST DATA
// ============================================

const PATIENT_DATA = {
  newPatient: {
    name: 'John Smith',
    email: 'john.smith@healthcare.com',
    phone: '555-1234',
    company: {
      name: 'Healthcare Solutions Inc',
    },
  },

  updatedPatient: {
    name: 'John Smith Updated',
    email: 'john.smith.updated@healthcare.com',
    phone: '555-5678',
    company: {
      name: 'Updated Healthcare Inc',
    },
  },

  alternatePatient: {
    name: 'Jane Doe',
    email: 'jane.doe@healthcare.com',
    phone: '555-9999',
    website: 'janedoe.health',
    company: {
      name: 'Jane Healthcare LLC',
      catchPhrase: 'Innovative solutions',
      bs: 'patient-centric',
    },
  },
};

// ============================================
// TIMEOUTS (in milliseconds)
// ============================================

const TIMEOUTS = {
  // Page load timeout
  pageLoad: 30000,

  // Element visibility timeout
  elementWait: 5000,

  // Network idle timeout
  networkIdle: 10000,

  // API request timeout
  apiRequest: 5000,

  // Screenshot wait (for stable screenshots)
  screenshot: 2000,

  // Short pause for animations
  shortWait: 1000,

  // Long wait for slow operations
  longWait: 10000,
};

// ============================================
// SELECTORS (Healthcare App)
// ============================================

const SELECTORS = {
  // Navigation
  navigation: {
    homeLink: 'a[href="./index.php"]',
    makeAppointmentLink: 'a:has-text("Make Appointment")',
    loginLink: 'a[href="./profile.php?mode=login"]',
    logoutLink: 'a:has-text("Logout")',
  },

  // Login Form
  login: {
    form: 'form#login-form',
    usernameInput: 'input#txt-username',
    passwordInput: 'input#txt-password',
    loginButton: 'button#btn-login',
    errorMessage: 'div.alert-danger',
  },

  // Appointment Form
  appointment: {
    form: 'form#appointment-form',
    facilityDropdown: 'select#combo_facility',
    readmissionCheckbox: 'input#chk_hospotal_readmission',
    programRadioButtons: 'input[name="radio_program"]',
    visitDateInput: 'input#txt_visit_date',
    commentTextarea: 'textarea#txt_comment',
    bookButton: 'button#btn-book-appointment',
  },

  // Confirmation Page
  confirmation: {
    header: 'h2:has-text("Appointment Confirmation")',
    details: 'div.col-xs-12',
    facilityDisplay: 'text=Facility',
    dateDisplay: 'text=Visit Date',
    commentDisplay: 'text=Comment',
  },

  // Page Headers
  headers: {
    appointmentHeader: 'h1:has-text("Make Appointment")',
    confirmationHeader: 'h2:has-text("Appointment Confirmation")',
    homeHeader: 'h1',
  },
};

// ============================================
// HTTP STATUS CODES
// ============================================

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
};

// ============================================
// ASSERTION MESSAGES
// ============================================

const ASSERTION_MESSAGES = {
  loginSuccess: 'User should be logged in successfully',
  loginFailure: 'Login should fail with invalid credentials',
  appointmentBooked: 'Appointment should be booked successfully',
  appointmentConfirmed: 'Appointment confirmation should be displayed',
  logoutSuccess: 'User should be logged out successfully',
  sessionEnded: 'User session should end after logout',
  apiResponseOK: 'API response status should be 200',
  apiDataValid: 'API response data should be valid',
};

// ============================================
// TEST TAGS
// ============================================

const TEST_TAGS = {
  // Test type tags
  UI: '@ui',
  API: '@api',
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  CRITICAL: '@critical',

  // Feature tags
  LOGIN: '@login',
  APPOINTMENT: '@appointment',
  LOGOUT: '@logout',
  PATIENT: '@patient',

  // Priority tags
  HIGH: '@high',
  MEDIUM: '@medium',
  LOW: '@low',

  // Environment tags
  DEV: '@dev',
  STAGING: '@staging',
  PROD: '@prod',
};

// ============================================
// BROWSER OPTIONS
// ============================================

const BROWSER_OPTIONS = {
  headless: true,
  slowMo: 0,
  
  // Chrome specific
  chrome: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  },

  // Firefox specific
  firefox: {
    firefoxUserPrefs: {},
  },

  // Safari specific
  webkit: {},
};

// ============================================
// TEST RETRIES
// ============================================

const RETRY_CONFIG = {
  // Number of retries for failed tests
  maxRetries: 1,

  // Retry only on specific errors
  retryOnErrors: [
    'Timeout',
    'Navigation',
    'Network',
  ],

  // Don't retry these errors
  noRetryOnErrors: [
    'AssertionError',
    'TypeError',
  ],
};

// ============================================
// REPORTER CONFIGURATION
// ============================================

const REPORTER_CONFIG = {
  html: {
    open: 'never',
    outputFolder: 'playwright-report',
  },

  junit: {
    outputFile: 'test-results/junit.xml',
  },

  json: {
    outputFile: 'test-results/results.json',
  },

  list: {
    printSteps: true,
  },
};

// ============================================
// EXPORT ALL CONFIGURATIONS
// ============================================

module.exports = {
  APP_CONFIG,
  TEST_CREDENTIALS,
  APPOINTMENT_DATA,
  PATIENT_DATA,
  TIMEOUTS,
  SELECTORS,
  HTTP_STATUS,
  ASSERTION_MESSAGES,
  TEST_TAGS,
  BROWSER_OPTIONS,
  RETRY_CONFIG,
  REPORTER_CONFIG,
};
