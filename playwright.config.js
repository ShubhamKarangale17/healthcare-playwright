// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Playwright Configuration
 * Configures test settings, reporters, and browser options
 */
module.exports = defineConfig({
  testDir: './tests',
  
  // Test timeout settings
  timeout: 60 * 1000,
  expect: {
    timeout: 10000,
  },

  // Retry failed tests once
  retries: 0,
  
  // Workers for parallel execution
  workers: 1,

  // Reporter configuration
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Browser context options
    baseURL: 'https://katalon-demo-cura.herokuapp.com',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Web server configuration (if needed for local testing)
  webServer: {
    command: 'npm run start',
    url: 'https://katalon-demo-cura.herokuapp.com',
    reuseExistingServer: !process.env.CI,
  },
});
