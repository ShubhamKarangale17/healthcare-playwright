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
  // Sauce Labs Demo Website - E-Commerce Platform
  healthcareApp: {
    baseUrl: 'https://www.saucedemo.com',
    homepage: '/',
    loginPath: '/',
    dashboardPath: '/inventory.html',
    patientsPath: '/inventory.html',
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
    username: 'standard_user',
    password: 'secret_sauce',
  },

  invalidUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },

  emptyCredentials: {
    username: '',
    password: '',
  },
};

// ============================================
// PATIENT ENCOUNTER TEST DATA (OpenEMR)
// ============================================

const APPOINTMENT_DATA = {
  defaultEncounter: {
    patientName: 'John Smith',
    dobMonth: '01',
    dobDay: '15',
    dobYear: '1980',
    gender: 'Male',
    visitDate: '01/08/2025',
    visitReason: 'Routine checkup',
    department: 'General Practice',
  },

  alternateEncounter: {
    patientName: 'Jane Doe',
    dobMonth: '05',
    dobDay: '20',
    dobYear: '1985',
    gender: 'Female',
    visitDate: '01/09/2025',
    visitReason: 'Follow-up appointment',
    department: 'Cardiology',
  },

  emergencyEncounter: {
    patientName: 'Robert Johnson',
    dobMonth: '12',
    dobDay: '10',
    dobYear: '1975',
    gender: 'Male',
    visitDate: '01/08/2025',
    visitReason: 'Emergency visit',
    department: 'Emergency Medicine',
  },
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
// SELECTORS (OpenEMR)
// ============================================

const SELECTORS = {
  // Login Form
  login: {
    usernameInput: 'input[name="authUser"]',
    passwordInput: 'input[name="clearPass"]',
    languageSelect: 'select[name*="language"]',
    loginButton: 'button',
    errorMessage: 'div.alert',
  },

  // Navigation
  navigation: {
    logoutLink: 'a:has-text("Logout")',
    menuButton: 'button',
    homeLink: 'a',
    patientLink: 'a:has-text("Patients")',
    reportLink: 'a',
  },

  // Dashboard
  dashboard: {
    header: 'h1',
    mainContent: 'body',
    patientButton: 'button',
    encounterButton: 'button',
  },

  // Patient List
  patientList: {
    searchInput: 'input[type="text"]',
    patientTable: 'table',
    firstPatientRow: 'tr',
    newPatientButton: 'button',
  },

  // Patient Form
  patientForm: {
    firstNameInput: 'input[name*="fname"]',
    lastNameInput: 'input[name*="lname"]',
    dobInput: 'input[type="date"]',
    genderSelect: 'select',
    saveButton: 'button',
  },

  // Encounter Form
  encounterForm: {
    visitDateInput: 'input[type="date"]',
    visitReasonInput: 'textarea',
    departmentSelect: 'select',
    startEncounterButton: 'button',
    addNoteButton: 'button',
  },

  // Page Headers
  headers: {
    mainHeader: 'h1',
    pageTitle: 'h1',
    successMessage: 'div.alert',
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
