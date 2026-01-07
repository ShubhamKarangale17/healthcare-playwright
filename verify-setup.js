#!/usr/bin/env node

/**
 * Healthcare Playwright Framework - Setup Verification
 * 
 * This script verifies that all components are properly installed
 * and ready to run tests.
 * 
 * Run this after installation: node verify-setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  const exists = fs.existsSync(fullPath);
  const status = exists ? '✓' : '✗';
  const statusColor = exists ? 'green' : 'red';
  
  log(`  ${status} ${description}`, statusColor);
  return exists;
}

function checkCommand(command, description) {
  try {
    execSync(`${command} --version`, { stdio: 'pipe' });
    log(`  ✓ ${description}`, 'green');
    return true;
  } catch (error) {
    log(`  ✗ ${description}`, 'red');
    return false;
  }
}

function checkDirectory(dirPath, description) {
  const fullPath = path.join(__dirname, dirPath);
  const exists = fs.existsSync(fullPath);
  const isDir = exists && fs.statSync(fullPath).isDirectory();
  const status = isDir ? '✓' : '✗';
  const statusColor = isDir ? 'green' : 'red';
  
  log(`  ${status} ${description} (${dirPath})`, statusColor);
  return isDir;
}

// Main verification
log('\n========================================', 'cyan');
log('Healthcare Playwright Framework Setup Verification', 'cyan');
log('========================================\n', 'cyan');

let allChecksPass = true;

// 1. Check Node.js and npm
log('1. Checking Runtime Environment...', 'blue');
const nodeOk = checkCommand('node', 'Node.js installed');
const npmOk = checkCommand('npm', 'npm installed');
allChecksPass = allChecksPass && nodeOk && npmOk;

// 2. Check Dependencies
log('\n2. Checking Dependencies...', 'blue');
const packageJsonOk = checkFile('package.json', 'package.json exists');
const nodeModulesOk = checkDirectory('node_modules', 'node_modules directory');
if (!nodeModulesOk) {
  log('  ⚠ Run: npm install', 'yellow');
}
allChecksPass = allChecksPass && packageJsonOk && nodeModulesOk;

// 3. Check Configuration Files
log('\n3. Checking Configuration Files...', 'blue');
const playwrightConfigOk = checkFile('playwright.config.js', 'playwright.config.js');
const gitignoreOk = checkFile('.gitignore', '.gitignore');
allChecksPass = allChecksPass && playwrightConfigOk && gitignoreOk;

// 4. Check Test Files
log('\n4. Checking Test Files...', 'blue');
const loginTestOk = checkFile('tests/ui/login.spec.js', 'Login tests (4 tests)');
const appointmentTestOk = checkFile('tests/ui/appointment.spec.js', 'Appointment tests (5 tests)');
const logoutTestOk = checkFile('tests/ui/logout.spec.js', 'Logout tests (4 tests)');
const apiTestOk = checkFile('tests/api/patient-api.spec.js', 'API tests (10 tests)');
allChecksPass = allChecksPass && loginTestOk && appointmentTestOk && logoutTestOk && apiTestOk;

// 5. Check Helper and Config Files
log('\n5. Checking Helper and Config Files...', 'blue');
const helpersOk = checkFile('helpers/testHelpers.js', 'Test helpers (12 functions)');
const configOk = checkFile('config/testConfig.js', 'Test configuration');
allChecksPass = allChecksPass && helpersOk && configOk;

// 6. Check Documentation
log('\n6. Checking Documentation...', 'blue');
const readmeOk = checkFile('README.md', 'README.md');
const quickstartOk = checkFile('QUICKSTART.md', 'QUICKSTART.md');
const projectDocOk = checkFile('PROJECT.md', 'PROJECT.md');
allChecksPass = allChecksPass && readmeOk && quickstartOk && projectDocOk;

// 7. Check CI/CD Configuration
log('\n7. Checking CI/CD Configuration...', 'blue');
const jenkinsfileOk = checkFile('Jenkinsfile', 'Jenkinsfile (Jenkins integration)');
allChecksPass = allChecksPass && jenkinsfileOk;

// 8. Check Test Directories
log('\n8. Checking Test Directory Structure...', 'blue');
const testsDir = checkDirectory('tests', 'tests directory');
const uiDir = checkDirectory('tests/ui', 'UI tests directory');
const apiDir = checkDirectory('tests/api', 'API tests directory');
allChecksPass = allChecksPass && testsDir && uiDir && apiDir;

// 9. Check Playwright Installation
log('\n9. Checking Playwright Installation...', 'blue');
try {
  const playwrightPath = path.join(__dirname, 'node_modules/@playwright/test');
  const playwrightOk = fs.existsSync(playwrightPath);
  if (playwrightOk) {
    log('  ✓ Playwright installed', 'green');
  } else {
    log('  ✗ Playwright not installed', 'red');
    log('  ⚠ Run: npm install', 'yellow');
    allChecksPass = false;
  }
} catch (error) {
  log('  ✗ Error checking Playwright', 'red');
  allChecksPass = false;
}

// 10. Check Playwright Browsers
log('\n10. Checking Playwright Browsers...', 'blue');
try {
  const chromiumPath = path.join(
    __dirname,
    process.platform === 'win32'
      ? 'node_modules/.cache/ms-playwright/chromium-*'
      : 'node_modules/.cache/ms-playwright/chromium-*'
  );
  // Browser check is best done through Playwright itself
  log('  ℹ Browsers status: Run tests to verify', 'yellow');
  log('  ⚠ To install browsers: npm exec playwright install chromium', 'yellow');
} catch (error) {
  log('  ℹ Browsers status: Run tests to verify', 'yellow');
}

// Summary
log('\n========================================', 'cyan');
if (allChecksPass) {
  log('✓ All Checks Passed! Framework is ready.', 'green');
  log('\nNext Steps:', 'blue');
  log('  1. Install Playwright browsers: npm exec playwright install chromium', 'cyan');
  log('  2. Run all tests: npm test', 'cyan');
  log('  3. View report: npm run report', 'cyan');
} else {
  log('✗ Some Checks Failed! See above for details.', 'red');
  log('\nCommon Issues:', 'blue');
  log('  • Dependencies not installed: npm install', 'yellow');
  log('  • Browsers not installed: npm exec playwright install', 'yellow');
  log('  • File missing: Check project structure', 'yellow');
}
log('========================================\n', 'cyan');

// Exit code
process.exit(allChecksPass ? 0 : 1);
