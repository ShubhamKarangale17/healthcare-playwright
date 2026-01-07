# 📖 Healthcare Playwright Framework - Navigation Guide

Welcome! This guide helps you navigate and understand the complete Healthcare Playwright automation framework.

---

## 🚀 START HERE (Choose Your Path)

### If you have 5 minutes ⚡
→ Read: **[QUICKSTART.md](QUICKSTART.md)**
- Installation in 5 steps
- Run your first test
- View test report

### If you have 15 minutes 📚
→ Read: **[README.md](README.md)**
- Complete project overview
- All setup instructions
- Test scenarios explained
- Jenkins integration guide

### If you have 30 minutes 🎓
→ Read: **[PROJECT.md](PROJECT.md)**
- Project statistics
- Complete file structure
- Code quality features
- Interview talking points

### If you're setting up Jenkins 🔧
→ Read: **[Jenkinsfile](Jenkinsfile)** & Jenkins section in README.md
- Pipeline stages explained
- Jenkins setup steps
- Report configuration

### If you want to write tests 💻
→ Read: **[tests/examples/advanced-example.spec.js](tests/examples/advanced-example.spec.js)**
- Shows best practices
- Demonstrates helper usage
- Config usage examples
- Data-driven testing patterns

---

## 📁 Project Structure Guide

```
healthcare-playwright/
├── tests/                      ← All test files
│   ├── ui/                     ← User Interface tests
│   │   ├── login.spec.js       ← Login functionality (4 tests)
│   │   ├── appointment.spec.js ← Appointment booking (5 tests)
│   │   └── logout.spec.js      ← Logout functionality (4 tests)
│   │
│   ├── api/                    ← API tests
│   │   └── patient-api.spec.js ← CRUD operations (10 tests)
│   │
│   └── examples/               ← Example/reference tests
│       └── advanced-example.spec.js ← Best practices examples
│
├── helpers/                    ← Reusable functions
│   └── testHelpers.js          ← 12 helper functions
│
├── config/                     ← Centralized configuration
│   └── testConfig.js           ← All test data & selectors
│
├── Documentation Files         ← Project documentation
│   ├── README.md              ← 500 lines, complete guide
│   ├── QUICKSTART.md          ← 5-minute setup guide
│   ├── PROJECT.md             ← Project deep-dive
│   ├── SETUP_COMPLETE.md      ← What was created
│   └── INDEX.md               ← This file
│
├── Configuration Files         ← Project setup
│   ├── package.json           ← Dependencies & scripts
│   ├── playwright.config.js   ← Playwright settings
│   ├── Jenkinsfile            ← Jenkins CI/CD pipeline
│   └── .gitignore             ← Git ignore rules
│
└── Verification
    └── verify-setup.js        ← Setup verification script
```

---

## 📚 Documentation Map

### For Different Users

| User Type | Start Here | Then Read | Key File |
|-----------|-----------|-----------|----------|
| **New Users** | QUICKSTART.md | README.md | tests/ui/login.spec.js |
| **Developers** | README.md | advanced-example.spec.js | helpers/testHelpers.js |
| **DevOps** | Jenkinsfile | README.md (Jenkins section) | playwright.config.js |
| **Interviewees** | PROJECT.md | README.md Interview Q&A | SETUP_COMPLETE.md |
| **QA Engineers** | tests/ folder | README.md | config/testConfig.js |

---

## 🧪 Test Files Overview

### UI Tests (13 tests total, ~90-120 seconds)

**[tests/ui/login.spec.js](tests/ui/login.spec.js)** - 4 tests
```
✓ Successful login with valid credentials
✓ Error message on invalid credentials
✓ Empty fields validation
✓ Form elements verification
```

**[tests/ui/appointment.spec.js](tests/ui/appointment.spec.js)** - 5 tests
```
✓ Book appointment successfully
✓ Verify confirmation details
✓ Book with different facility
✓ Form validation
```

**[tests/ui/logout.spec.js](tests/ui/logout.spec.js)** - 4 tests
```
✓ Successful logout
✓ Session termination
✓ Protected pages cannot access
✓ No cached authentication
```

### API Tests (10 tests total, ~30-45 seconds)

**[tests/api/patient-api.spec.js](tests/api/patient-api.spec.js)** - 10 tests
```
✓ GET all patients
✓ GET single patient
✓ GET non-existent patient
✓ POST create patient
✓ POST with validation
✓ PUT update patient
✓ DELETE patient
✓ PATCH partial update
✓ Response headers
✓ Performance testing
```

### Example Tests (6 advanced examples)

**[tests/examples/advanced-example.spec.js](tests/examples/advanced-example.spec.js)** - 6 examples
```
Shows:
✓ Using helpers effectively
✓ Data-driven testing
✓ API testing patterns
✓ Selector-based tests
✓ Timeout configuration
✓ Complete workflows
```

---

## 🔧 Helper Functions Guide

See: **[helpers/testHelpers.js](helpers/testHelpers.js)**

### Authentication Helpers
```javascript
loginUser(page, username, password)        // Login user
logoutUser(page)                           // Logout user
```

### Booking Helpers
```javascript
bookAppointment(page, appointmentData)     // Book appointment
```

### API Helpers
```javascript
apiGetRequest(request, url, endpoint)      // GET request
apiPostRequest(request, url, endpoint, data)  // POST request
apiPutRequest(request, url, endpoint, data)   // PUT request
apiDeleteRequest(request, url, endpoint)      // DELETE request
```

### Page Interaction Helpers
```javascript
waitForElement(page, selector)             // Wait for element
getElementText(page, selector)             // Get element text
elementExists(page, selector)              // Check if exists
fillFormField(page, selector, value)       // Fill form field
clickElement(page, selector)               // Click element
takeScreenshot(page, filename)             // Screenshot
```

### Validation Helpers
```javascript
validateApiStatus(actual, expected)        // Validate HTTP status
validateApiResponseFields(data, fields)    // Validate fields exist
```

---

## ⚙️ Configuration Guide

See: **[config/testConfig.js](config/testConfig.js)**

### Available Configuration Sections

1. **APP_CONFIG** - Application URLs
   ```javascript
   APP_CONFIG.healthcareApp.baseUrl
   APP_CONFIG.api.baseUrl
   ```

2. **TEST_CREDENTIALS** - Login data
   ```javascript
   TEST_CREDENTIALS.validUser
   TEST_CREDENTIALS.invalidUser
   ```

3. **APPOINTMENT_DATA** - Test data
   ```javascript
   APPOINTMENT_DATA.defaultAppointment
   APPOINTMENT_DATA.facilities
   ```

4. **SELECTORS** - UI element locators
   ```javascript
   SELECTORS.login.usernameInput
   SELECTORS.appointment.facilityDropdown
   ```

5. **TIMEOUTS** - Wait values
   ```javascript
   TIMEOUTS.pageLoad
   TIMEOUTS.elementWait
   ```

6. **HTTP_STATUS** - API status codes
   ```javascript
   HTTP_STATUS.OK
   HTTP_STATUS.CREATED
   ```

---

## 🚀 Quick Command Reference

```bash
# Installation
npm install                          # Install dependencies
npm exec playwright install         # Install browsers

# Running Tests
npm test                            # Run all 23 tests
npm run test:ui                     # Run 13 UI tests
npm run test:api                    # Run 10 API tests
npm run test:headed                 # See browser while running
npm run test:debug                  # Debug mode

# Reporting
npm run report                      # View HTML report

# Verification
node verify-setup.js               # Verify installation

# Browser Specific
npm run test:chrome                # Chrome only
npm test -- --project=firefox      # Firefox only
npm test -- --project=webkit       # Safari only
```

---

## 🎯 Common Tasks

### Run First Time Setup
```bash
cd c:\Users\shubh\VS-Workspace\healthcare-playwright
npm install
npm exec playwright install chromium
npm test
npm run report
```

### Add New Test
1. Create file: `tests/feature/newfeature.spec.js`
2. Copy pattern from: `tests/ui/login.spec.js`
3. Update selectors in: `config/testConfig.js`
4. Run: `npm test tests/feature/newfeature.spec.js`

### Debug Failing Test
```bash
npm run test:debug
# OR
npm run test:headed
```

### Run Specific Tests
```bash
npm test login.spec.js              # Specific file
npm test -- --grep "login"          # By test name
npm test -- --grep "@ui"            # By tag
```

### View Test Report
```bash
npm run report
```

### Set Up Jenkins
1. Create new Pipeline job in Jenkins
2. Configure SCM with Git URL
3. Set script path to: `Jenkinsfile`
4. Click "Build Now"
5. View results and artifacts

---

## 📖 Documentation by Topic

### Setup & Installation
- **QUICKSTART.md** - 5-minute setup
- **README.md** - Complete installation guide
- **PROJECT.md** - Setup details

### Test Development
- **tests/examples/advanced-example.spec.js** - Code examples
- **helpers/testHelpers.js** - Available functions
- **config/testConfig.js** - Configuration values

### CI/CD & Jenkins
- **Jenkinsfile** - Pipeline configuration
- **README.md** > CI/CD Integration section
- **PROJECT.md** > Jenkins Section

### Interview Preparation
- **PROJECT.md** > Interview Talking Points
- **README.md** > Interview Q&A section
- **QUICKSTART.md** > Tips for Success

### Troubleshooting
- **README.md** > Troubleshooting section
- **QUICKSTART.md** > FAQ
- **verify-setup.js** - Setup verification

---

## 🎓 Learning Path

### Level 1: Getting Started (30 minutes)
1. Read: QUICKSTART.md
2. Run: `npm install && npm test`
3. View: `npm run report`
4. Browse: Test files in `tests/ui/`

### Level 2: Understanding (1 hour)
1. Read: README.md
2. Review: Test code with comments
3. Study: Helper functions
4. Explore: Configuration options

### Level 3: Mastery (2 hours)
1. Read: PROJECT.md
2. Study: advanced-example.spec.js
3. Create: Your own test file
4. Debug: Running tests in debug mode

### Level 4: Production (Ongoing)
1. Set up: Jenkins pipeline
2. Extend: Add more tests
3. Maintain: Update selectors/data
4. Scale: Organize larger test suites

---

## 📊 Framework Overview

| Aspect | Details |
|--------|---------|
| **Total Tests** | 23 (13 UI + 10 API) |
| **Helper Functions** | 12 |
| **Configuration Items** | 50+ |
| **Documentation** | 1800+ lines |
| **Code Comments** | 200+ |
| **Setup Time** | <5 minutes |
| **Test Duration** | 2-3 minutes |
| **Browsers Supported** | Chrome, Firefox, Safari |

---

## 🔍 Finding Things

### I want to...

| Task | File | Location |
|------|------|----------|
| **Run tests** | QUICKSTART.md | Section "Running Your First Test" |
| **Add test data** | config/testConfig.js | Line with `const TEST_CREDENTIALS` |
| **Update selectors** | config/testConfig.js | Section `const SELECTORS` |
| **Create helper** | helpers/testHelpers.js | End of file, use pattern from existing |
| **Set up Jenkins** | Jenkinsfile | Main file + README.md |
| **Debug test** | QUICKSTART.md | Section "Debug Mode" |
| **View report** | README.md | Reports & Results section |
| **Interview prep** | PROJECT.md | Interview Talking Points |
| **Extend framework** | advanced-example.spec.js | Complete working examples |

---

## ✅ Verification Checklist

Before using the framework:

```bash
# Verify everything is installed
node verify-setup.js

# You should see:
✓ Node.js installed
✓ npm installed
✓ package.json exists
✓ All test files present
✓ All helper files present
✓ All config files present
✓ All documentation present
```

---

## 🎉 You're Ready!

This framework includes everything you need:
✅ 23 production-ready tests  
✅ 12 reusable helper functions  
✅ Complete documentation  
✅ Jenkins CI/CD pipeline  
✅ Interview preparation guide  
✅ Best practices throughout  

**Next Step:** Read [QUICKSTART.md](QUICKSTART.md) and run `npm test`

---

## 📞 Quick Links

- **Installation Guide**: [QUICKSTART.md](QUICKSTART.md)
- **Complete Reference**: [README.md](README.md)
- **Project Overview**: [PROJECT.md](PROJECT.md)
- **Code Examples**: [tests/examples/advanced-example.spec.js](tests/examples/advanced-example.spec.js)
- **Helpers**: [helpers/testHelpers.js](helpers/testHelpers.js)
- **Configuration**: [config/testConfig.js](config/testConfig.js)
- **Jenkins Config**: [Jenkinsfile](Jenkinsfile)

---

**Last Updated**: January 2025  
**Framework Version**: 1.0.0  
**Status**: ✅ Production Ready  

