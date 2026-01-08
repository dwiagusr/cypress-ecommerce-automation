const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

/**
 * Project Configuration by Dwi Agus Rianto
 * Focus: Cypress + Cucumber BDD + Multi-Reporting (Allure & Mochawesome)
 */
module.exports = defineConfig({
  // --- Global Settings ---
  projectId: "qt7vaf",
  viewportWidth: 1280,
  viewportHeight: 720,

  // --- Mochawesome Reporter Configuration ---
  // Keeping this as a secondary reporter for versatility
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Automation Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  // --- E2E Testing Configuration ---
  e2e: {
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 10000,
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
    specPattern: "cypress/e2e/**/*.feature",

    async setupNodeEvents(on, config) {
      // 1. Initialize Cucumber BDD Preprocessor
      await addCucumberPreprocessorPlugin(on, config);

      // 2. Configure esbuild for processing .feature files
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on("file:preprocessor", bundler);

      // 3. Initialize Mochawesome Plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // 4. Initialize Allure Reporting Plugin
      allureWriter(on, config);

      // Crucial: Return the updated config object
      return config;
    },

    // --- Environment Variables ---
    env: {
      allure: true, // Enables Allure recording by default
      allureResultsPath: "allure-results", // Directory for raw results
    }
  },
});