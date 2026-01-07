# Healthcare Playwright Automation - Quick Start Guide

## 🚀 Quick Setup (5 minutes)

### 1. Open Terminal in VS Code

Press `Ctrl + ~` to open integrated terminal

### 2. Navigate to Project

```bash
cd c:\Users\shubh\VS-Workspace\healthcare-playwright
```

### 3. Install Dependencies

```bash
npm install
```

This installs:
- Playwright Test Framework
- All required dependencies

Output example:
```
added 150 packages in 12s
```

### 4. Install Playwright Browsers

```bash
npm exec playwright install chromium
```

This downloads the Chromium browser (~300MB).

### 5. Verify Installation

```bash
npm test -- --version
```

You should see Playwright version information.

---

## ✅ Running Your First Test

### Run All Tests

```bash
npm test
```

**Expected Output**:
```
✓ [chromium] › tests/ui/login.spec.js (4 tests passed)
✓ [chromium] › tests/ui/appointment.spec.js (5 tests passed)
✓ [chromium] › tests/ui/logout.spec.js (4 tests passed)
✓ [chromium] › tests/api/patient-api.spec.js (10 tests passed)

23 passed (2m 15s)
```

### View Test Report

```bash
npm run report
```

This opens an interactive HTML report in your browser showing:
- ✅ Passing/❌ failing tests
- 📸 Screenshots
- 🎥 Video recordings (if failures)
- ⏱️ Execution times

---

## 🎯 Running Specific Tests

### UI Tests Only
```bash
npm run test:ui
```

### API Tests Only
```bash
npm run test:api
```

### Specific Test File
```bash
npm test tests/ui/login.spec.js
```

### See Browser While Testing (Headed Mode)
```bash
npm run test:headed
```

### Debug Mode
```bash
npm run test:debug
```

---

## 📁 Project File Breakdown

### `package.json`
- Project metadata
- Dependencies list
- npm scripts for running tests

### `playwright.config.js`
- Test settings (timeout, retries)
- Browser configuration
- Reporter setup
- Base URL configuration

### `tests/ui/` Directory
**login.spec.js** - Login functionality (4 tests)
- Valid credentials login ✓
- Invalid credentials error ✓
- Empty fields validation ✓
- Form elements presence ✓

**appointment.spec.js** - Appointment booking (5 tests)
- Complete appointment booking ✓
- Confirmation details verification ✓
- Different facility selection ✓
- Form element validation ✓

**logout.spec.js** - Logout functionality (4 tests)
- Successful logout ✓
- Session termination ✓
- Protected page access ✓
- No cached authentication ✓

### `tests/api/` Directory
**patient-api.spec.js** - API CRUD operations (10 tests)
- GET all patients ✓
- GET single patient ✓
- POST create patient ✓
- PUT update patient ✓
- DELETE patient ✓
- PATCH partial update ✓
- Response validation ✓
- Header verification ✓
- Performance testing ✓

### `Jenkinsfile`
- CI/CD pipeline configuration
- Automated test execution
- Report generation
- Result publishing

### `README.md`
- Comprehensive documentation
- Setup instructions
- Test scenario details
- Interview Q&A

---

## 🔍 Understanding Test Structure

### Typical Test Format

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Feature Tests - @tag', () => {
  
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('Test description', async ({ page }) => {
    // Test code
    await page.click('selector');
    await expect(element).toBeVisible();
  });
});
```

### Key Concepts

**test.describe()**
- Groups related tests together
- Supports nested descriptions
- Tags tests with @tag

**test.beforeEach()**
- Runs before each test in the group
- Perfect for login setup, navigation

**async { page }**
- Page object from Playwright
- Used to interact with webpage
- Auto-waits for elements

**expect()**
- Makes assertions
- Checks element visibility, text, count, etc.
- Clear, readable assertions

---

## 🌐 Test Application Details

### Healthcare Demo Website
- **URL**: https://katalon-demo-cura.herokuapp.com/
- **Username**: John Doe
- **Password**: ThisIsNotAPassword
- **Status**: Public demo site (always available)

### API Test Base URL
- **URL**: https://jsonplaceholder.typicode.com
- **Type**: Free public API for testing
- **Data**: Mock patient/user data
- **Limitations**: Data resets daily

---

## 📊 Expected Test Results

### All Tests Should Pass
```
✓ 23 passed
✗ 0 failed
⏭️ 0 skipped
```

### Execution Time
- UI Tests: ~90-120 seconds (13 tests)
- API Tests: ~30-45 seconds (10 tests)
- Total: ~2-3 minutes

### If Tests Fail

**Check network connection**
```bash
ping katalon-demo-cura.herokuapp.com
```

**Check selectors are correct**
- Open DevTools (F12) in browser
- Inspect elements to verify selectors match

**Increase timeout**
Edit `playwright.config.js`:
```javascript
timeout: 60 * 1000  // 60 seconds instead of 30
```

---

## 🛠️ Common Commands Reference

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests |
| `npm run test:ui` | Run UI tests only |
| `npm run test:api` | Run API tests only |
| `npm run test:headed` | Run with browser visible |
| `npm run test:debug` | Debug mode with inspector |
| `npm run report` | View HTML test report |
| `npm install` | Install dependencies |

---

## 📝 Writing Your Own Test

### Example: Add a New Login Test

1. Open `tests/ui/login.spec.js`
2. Add test inside `test.describe()`:

```javascript
test('Verify login button has correct text', async ({ page }) => {
  await page.click(selectors.loginLink);
  await page.waitForLoadState('networkidle');
  
  const loginButton = await page.locator(selectors.loginButton);
  const text = await loginButton.textContent();
  
  expect(text).toContain('Login');
});
```

3. Run tests:
```bash
npm test tests/ui/login.spec.js
```

---

## 🔗 Useful Links

- **Playwright Docs**: https://playwright.dev/
- **Playwright Selectors**: https://playwright.dev/docs/locators
- **Assertions**: https://playwright.dev/docs/test-assertions
- **Debug Tips**: https://playwright.dev/docs/debug

---

## 💡 Tips for Success

1. **Start Simple**: Run all tests first to see what works
2. **Read Test Names**: They describe what's being tested
3. **Check Comments**: Detailed step-by-step explanations in code
4. **Use Debug Mode**: `npm run test:debug` when tests fail
5. **Read Error Messages**: They're usually very helpful
6. **Check Reports**: HTML report shows failure details

---

## 🎓 Interview Talking Points

When discussing this project in interviews, highlight:

1. **Framework Selection**:
   - "Chose Playwright for multi-browser support and built-in API testing"
   - "Faster and more reliable than Selenium/Cypress"

2. **Test Organization**:
   - "Separated UI and API tests for better maintainability"
   - "Used tags (@ui, @api) for selective test execution"

3. **CI/CD Integration**:
   - "Integrated with Jenkins for automated testing"
   - "Generates JUnit XML for Jenkins integration"

4. **Code Quality**:
   - "Comprehensive comments for each test"
   - "DRY principle with selector definitions"
   - "Clear, descriptive test names"

5. **Error Handling**:
   - "Screenshots and videos on failure"
   - "Configured retries for flaky tests"
   - "Proper wait strategies for reliability"

---

## ❓ Frequently Asked Questions

**Q: Can I run tests in parallel?**
A: Yes. Edit `playwright.config.js`, change `workers: 1` to `workers: 4`

**Q: How do I run tests in Firefox/Safari?**
A: Use `npm test -- --project=firefox` or `--project=webkit`

**Q: How do I debug a specific failing test?**
A: Run `npm run test:debug` then use the Playwright Inspector

**Q: Where are test results stored?**
A: In `test-results/` and `playwright-report/` directories

**Q: Can I run just one test?**
A: Yes: `npm test -- --grep "test name"`

---

## 🎉 You're All Set!

Your Healthcare Playwright Automation Framework is ready to use. 

**Next Steps:**
1. Run `npm test` to execute all tests
2. Check `npm run report` for visual report
3. Review test code in `tests/` folder
4. Modify/add new tests as needed
5. Set up Jenkins for CI/CD (optional)

Good luck! 🚀

