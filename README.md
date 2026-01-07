# Healthcare Automation Framework - Playwright

A production-ready end-to-end automation framework for testing the Healthcare demo website using Playwright. This project includes UI automation, API automation, and complete CI/CD integration with Jenkins.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [CI/CD Integration](#cicd-integration)
- [Reports & Results](#reports--results)
- [Interview Preparation Notes](#interview-preparation-notes)

---

## 🎯 Project Overview

This automation framework provides comprehensive end-to-end testing for a Healthcare demo website. It combines:

- **UI Automation**: Testing the complete user journey from login to appointment booking
- **API Automation**: Testing RESTful API endpoints using Playwright's API testing capabilities
- **CI/CD Integration**: Jenkins pipeline for automated testing and reporting
- **Professional Structure**: Industry-standard project organization

### Target Application

**Healthcare Demo Website**: https://katalon-demo-cura.herokuapp.com/

**Test Credentials**:
- Username: `John Doe`
- Password: `ThisIsNotAPassword`

---

## 🛠️ Tech Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| **Playwright** | ^1.40.1 | End-to-end testing framework |
| **Node.js** | 18.x LTS | Runtime environment |
| **JavaScript (ES6+)** | Latest | Programming language |
| **Jenkins** | 2.x | CI/CD orchestration |
| **JUnit XML Reporter** | Built-in | Test result reporting |
| **HTML Reporter** | Built-in | Visual test reports |

### Why Playwright?

1. **Multi-browser Support**: Test across Chromium, Firefox, and WebKit
2. **API Testing**: Built-in API testing without additional libraries
3. **Reliable Locators**: Auto-waiting and self-healing mechanisms
4. **Network Interception**: Capture and mock network requests
5. **Performance**: Fast execution with parallel test capability
6. **CI/CD Ready**: Native support for Jenkins and other CI systems
7. **Developer Experience**: Clear syntax and extensive documentation

---

## 📁 Project Structure

```
healthcare-playwright/
│
├── tests/                          # Test directory
│   ├── ui/                         # UI Automation Tests
│   │   ├── login.spec.js           # Login functionality tests
│   │   ├── appointment.spec.js     # Appointment booking tests
│   │   └── logout.spec.js          # Logout functionality tests
│   │
│   └── api/                        # API Automation Tests
│       └── patient-api.spec.js     # Patient API CRUD operations
│
├── playwright.config.js            # Playwright configuration file
├── package.json                    # Node.js dependencies and scripts
├── Jenkinsfile                     # Jenkins pipeline configuration
├── README.md                       # This file
└── test-results/                   # Test results (generated)
    ├── junit.xml                   # JUnit XML format
    └── results.json                # JSON format results
```

### Directory Explanation

**tests/ui/**
- Contains all UI automation tests
- Tests user interactions, navigation, and form submissions
- Uses Playwright's page object pattern concepts
- Includes login, appointment booking, and logout scenarios

**tests/api/**
- Contains API automation tests
- Tests CRUD operations against JSONPlaceholder API
- Validates response status, headers, and body content
- Includes performance testing

**playwright.config.js**
- Central configuration for Playwright
- Browser settings and timeouts
- Reporter configuration (HTML, JUnit, JSON)
- Screenshot and video on failure settings

---

## 📦 Prerequisites

Before installation, ensure you have:

1. **Node.js**: Version 14.0 or higher
   - Download from: https://nodejs.org/

2. **npm**: Usually comes with Node.js
   - Verify: `npm --version`

3. **Git**: For version control
   - Download from: https://git-scm.com/

4. **Jenkins** (For CI/CD): Version 2.x or higher
   - Installation guide: https://www.jenkins.io/doc/book/installing/

5. **VS Code** (Recommended): For code editing
   - Download from: https://code.visualstudio.com/

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
# Clone the project
git clone <repository-url>
cd healthcare-playwright
```

### Step 2: Install Node Dependencies

```bash
# Install all dependencies from package.json
npm install
```

This command installs:
- `@playwright/test`: Playwright test framework

### Step 3: Install Playwright Browsers

```bash
# Install Chromium browser (default)
npm exec playwright install chromium

# Or install all supported browsers
npm exec playwright install
```

### Step 4: Verify Installation

```bash
# Check Node version
node --version
# Expected: v14.0.0 or higher

# Check npm version
npm --version
# Expected: 6.0.0 or higher

# Verify Playwright installation
npm test -- --version
```

---

## ⚙️ Configuration

### Playwright Configuration (playwright.config.js)

Key configurations:

```javascript
// Test timeout - each test has 30 seconds
timeout: 30 * 1000

// Expect assertion timeout - 5 seconds
expect.timeout: 5000

// Retry failed tests once
retries: 1

// Run tests sequentially (set to higher for parallel)
workers: 1

// Reporters
reporter: ['html', 'json', 'junit', 'list']

// Base URL for all tests
baseURL: 'https://katalon-demo-cura.herokuapp.com'

// Screenshot on failure
screenshot: 'only-on-failure'

// Video on failure
video: 'retain-on-failure'
```

### Environment Variables (Optional)

Create a `.env` file for sensitive data:

```env
# Healthcare Website Credentials
TEST_USERNAME=John Doe
TEST_PASSWORD=ThisIsNotAPassword

# API Configuration
API_BASE_URL=https://jsonplaceholder.typicode.com

# Jenkins Configuration
JENKINS_URL=http://localhost:8080
```

---

## ▶️ Running Tests

### Run All Tests

```bash
npm test
```

### Run UI Tests Only

```bash
npm run test:ui
```

**Expected Output**:
```
✓ tests/ui/login.spec.js (4 tests)
✓ tests/ui/appointment.spec.js (5 tests)
✓ tests/ui/logout.spec.js (4 tests)
```

### Run API Tests Only

```bash
npm run test:api
```

**Expected Output**:
```
✓ tests/api/patient-api.spec.js (10 tests)
```

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Specific Test File

```bash
# Run only login tests
npm test tests/ui/login.spec.js

# Run only API tests
npm test tests/api/patient-api.spec.js
```

### Run Tests by Tag

```bash
# Run all UI tests
npm test -- --grep @ui

# Run all API tests
npm test -- --grep @api

# Run login tests
npm test -- --grep @login
```

### Run Tests in Specific Browser

```bash
# Run in Chrome only
npm run test:chrome

# Run in Firefox
npm test -- --project=firefox

# Run in Safari
npm test -- --project=webkit
```

---

## 🧪 Test Scenarios

### UI Test Scenarios

#### 1. Login Tests (tests/ui/login.spec.js)
- **Successful Login**: Verify user can login with valid credentials
- **Invalid Credentials**: Verify error message for wrong username/password
- **Empty Fields**: Verify validation for empty login fields
- **Form Elements**: Verify all login form elements are present and functional

#### 2. Appointment Tests (tests/ui/appointment.spec.js)
- **Book Appointment**: Complete appointment booking workflow
- **Confirmation Details**: Verify appointment details in confirmation page
- **Different Facility**: Book appointment at different facility
- **Form Validation**: Verify all form fields are accessible and enabled

#### 3. Logout Tests (tests/ui/logout.spec.js)
- **Logout Success**: Verify user successfully logs out
- **Session Termination**: Verify session ends after logout
- **Protected Pages**: Verify cannot access appointment page without login
- **No Cache**: Verify authentication is not cached after logout

### API Test Scenarios

#### 1. GET Requests
- **Get All Patients**: Retrieve all users from API
- **Get Single Patient**: Retrieve specific patient by ID
- **Non-existent Patient**: Handle 404 scenarios

#### 2. POST Request
- **Create Patient**: Create new patient record
- **Validate Response**: Verify created patient data

#### 3. PUT Request
- **Update Patient**: Update existing patient data

#### 4. DELETE Request
- **Delete Patient**: Remove patient record

#### 5. PATCH Request
- **Partial Update**: Update specific patient fields

#### 6. Performance Testing
- **Response Time**: Verify API responds within 2 seconds

---

## 🔄 CI/CD Integration

### Jenkins Pipeline Configuration

The `Jenkinsfile` defines the complete CI/CD workflow:

#### Pipeline Stages

1. **Checkout**: Clone repository from Git
2. **Install Dependencies**: Run `npm install`
3. **Install Browsers**: Install Playwright browsers
4. **Run UI Tests**: Execute UI test suite
5. **Run API Tests**: Execute API test suite
6. **Generate Reports**: Create test reports
7. **Publish Results**: Archive and publish JUnit XML reports

#### Post-Build Actions

- Publish JUnit XML results to Jenkins
- Archive HTML reports
- Archive test artifacts
- Clean workspace

### Jenkins Setup Steps

#### Step 1: Create New Jenkins Job

1. Log in to Jenkins
2. Click "New Item"
3. Enter job name: `healthcare-playwright-tests`
4. Select "Pipeline"
5. Click OK

#### Step 2: Configure Pipeline

1. In Pipeline section, select "Pipeline script from SCM"
2. Select "Git" as SCM
3. Enter repository URL
4. Set branch: `*/main` or `*/master`
5. Script path: `Jenkinsfile`
6. Save

#### Step 3: Configure Tools

In Jenkins "Manage Jenkins" > "Configure System":

1. **Node.js Plugin**:
   - Go to "Global Tool Configuration"
   - Add Node.js installation
   - Name: `Node.js 18.x`
   - Version: `18.x`

2. **JUnit Plugin**:
   - Should be installed by default

#### Step 4: Run Pipeline

1. Click "Build Now"
2. Monitor build progress in "Console Output"
3. View results in "Test Results"
4. Download reports from "Artifacts"

### GitHub Actions Alternative

If using GitHub instead of Jenkins, create `.github/workflows/test.yml`:

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm exec playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

## 📊 Reports & Results

### HTML Report

After running tests, view the visual HTML report:

```bash
npm run report
```

This opens an interactive HTML report showing:
- Test names and status
- Execution time
- Screenshots of failures
- Video recordings of failures
- Detailed error messages

### JUnit XML Report

Location: `test-results/junit.xml`

Used by Jenkins for integration:
- Test count
- Pass/fail statistics
- Execution time
- Error details

### JSON Report

Location: `test-results/results.json`

Contains complete test metadata in JSON format.

### Artifacts in Jenkins

Jenkins archives:
- `playwright-report/` - HTML report
- `test-results/` - All result files
- Available for download after build completion

---

## 🎓 Interview Preparation Notes

### Why Playwright?

**Advantages Over Selenium/Cypress**:

1. **API Testing**: Built-in API testing without additional libraries
2. **Multiple Browsers**: Single codebase, test across Chrome, Firefox, Safari
3. **Fast & Reliable**: Auto-waiting for elements, no flaky tests
4. **Network Control**: Intercept, mock, monitor network requests
5. **Mobile Testing**: Built-in emulation for mobile devices
6. **Debugging**: Inspector, trace, and debug tools
7. **Performance**: Faster execution than Selenium
8. **Community**: Strong community support and documentation

### Why JavaScript?

1. **Easy Learning Curve**: Similar syntax to test libraries
2. **No Compilation**: Direct execution, faster feedback
3. **Rich Ecosystem**: npm has millions of packages
4. **Developer Friendly**: Used by frontend developers
5. **Flexibility**: Functional and object-oriented programming support

### Project Design Decisions

1. **Separate UI and API Tests**:
   - Different concerns and assertions
   - Can be run independently
   - Different tagging for filtering

2. **Page Object Pattern Concepts**:
   - Selectors defined at top of files
   - DRY principle (Don't Repeat Yourself)
   - Easy maintenance when selectors change

3. **Comprehensive Comments**:
   - Each test has detailed steps
   - Business logic is clear
   - Easy for new team members to understand

4. **CI/CD Integration**:
   - Jenkins pipeline automates testing
   - Reports published automatically
   - Easy integration with other tools

### Common Interview Questions

**Q: How do you handle flaky tests?**
A: Playwright has built-in auto-waiting and retries. Configure in playwright.config.js. Use proper locators, avoid hard waits.

**Q: How do you maintain test data?**
A: Keep test data separate, use constants at top of files or environment variables.

**Q: How do you structure a large test suite?**
A: Organize by feature/module, use tags for filtering, separate UI and API tests.

**Q: How do you debug failing tests?**
A: Use debug mode (`--debug`), trace feature (`trace: 'on'`), screenshots, and videos.

**Q: How do you handle authentication?**
A: Store in environment variables, use fixtures for repeated login, maintain session.

**Q: How do you ensure tests are maintainable?**
A: Use consistent naming, clear comments, DRY principle, reusable helpers.

---

## 🔧 Troubleshooting

### Issue: Playwright Browsers Not Installed

```bash
# Solution: Reinstall browsers
npm exec playwright install
```

### Issue: Tests Timeout

```bash
# Increase timeout in playwright.config.js
timeout: 60 * 1000  // 60 seconds
```

### Issue: Element Not Found

Check:
1. Selector is correct
2. Wait for page load: `await page.waitForLoadState('networkidle')`
3. Element is visible: `await expect(element).toBeVisible()`

### Issue: Jenkins Job Fails

Check:
1. Node.js is installed on Jenkins agent
2. Browsers are installed: `npm exec playwright install`
3. Check "Console Output" for error details
4. Verify Git credentials

---

## 📚 Additional Resources

- **Playwright Documentation**: https://playwright.dev/
- **Playwright API Reference**: https://playwright.dev/docs/api/class-test
- **Jenkins Documentation**: https://www.jenkins.io/doc/
- **Healthcare Demo Site**: https://katalon-demo-cura.herokuapp.com/

---

## 📝 Test Metrics

### Expected Results

| Component | Count | Status |
|-----------|-------|--------|
| UI Tests | 13 | ✓ Passing |
| API Tests | 10 | ✓ Passing |
| Total Tests | 23 | ✓ Passing |
| Average Duration | 2-3 min | ✓ Acceptable |

---

## 👨‍💼 About the Author

**Senior QA Automation Engineer**

This framework is designed with industry best practices and is production-ready. It demonstrates:
- Strong technical skills in test automation
- Understanding of CI/CD principles
- Professional code organization
- Clear documentation and communication

---

## 📄 License

ISC

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-test`
3. Commit changes: `git commit -am 'Add new test'`
4. Push to branch: `git push origin feature/new-test`
5. Submit pull request

---

**Last Updated**: January 2025
**Framework Version**: 1.0.0
**Playwright Version**: 1.40.1+
