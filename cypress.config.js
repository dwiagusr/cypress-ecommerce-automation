const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  // =================================================================
  // GLOBAL CONFIGURATION
  // =================================================================
  
  // Project ID for Cypress Cloud Dashboard
  projectId: "qt7vaf",

  // Viewport Settings (Screen resolution for the browser)
  viewportWidth: 1280,
  viewportHeight: 720,

  // =================================================================
  // REPORTER CONFIGURATION (MOCHAWESOME)
  // =================================================================
  
  // Defines the reporter to generate HTML reports
  reporter: 'cypress-mochawesome-reporter',
  
  // Custom options for the report appearance and behavior
  reporterOptions: {
    charts: true,                 // Displays pie charts for Pass/Fail status
    reportPageTitle: 'Automation Test Report', // Title in the browser tab
    embeddedScreenshots: true,    // Attaches screenshots directly to the HTML file
    inlineAssets: true,           // Inlines CSS/JS for a single-file HTML report
    saveAllAttempts: false,       // Only saves the final attempt if retries are enabled
  },

  // =================================================================
  // E2E TESTING CONFIGURATION
  // =================================================================
  e2e: {
    // --- Timeouts ---
    // Increases the default page load timeout (useful for slow environments)
    pageLoadTimeout: 120000, // 120 seconds

    // Increases the timeout for finding elements (default is 4000ms)
    defaultCommandTimeout: 10000, // 10 seconds

    // --- Base URL & Spec Pattern ---
    // The main URL for the application under test
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
    
    // Pattern to locate test files (Using .feature files for Cucumber)
    specPattern: "cypress/e2e/**/*.feature",

    // --- Node Events Setup (Plugins & Preprocessors) ---
    async setupNodeEvents(on, config) {
      
      // 1. Configure the Bundler (esbuild)
      // This allows Cypress to process and run modern JavaScript/TypeScript efficiently
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on("file:preprocessor", bundler);

      // 2. Configure Cucumber Preprocessor
      // Enables support for BDD/Gherkin syntax (.feature files)
      await addCucumberPreprocessorPlugin(on, config);

      // 3. Configure Mochawesome Reporter Plugin
      // Registers the listener to generate reports after the run finishes
      require('cypress-mochawesome-reporter/plugin')(on);

      // Return the updated config object
      return config;
    },
  },
});