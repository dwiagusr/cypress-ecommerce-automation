const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  // 👇 PASTE PROJECT ID ANDA DI SINI (Ganti tulisan ini)
  projectId: "qt7vaf",

  // OPSI 1: Taruh di luar blok e2e (Global untuk semua tipe tes)
  viewportWidth: 1280,
  viewportHeight: 720,

  e2e: {
    // Mengatur Loading Page Timeout 
    pageLoadTimeout: 120000,

    // Waiting Element Page Timeout
    defaultCommandTimeout: 10000,
    
    // 👇 Konfigurasi Cucumber BDD

    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      // Setup untuk Cucumber BDD
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    baseUrl: 'https://ecommerce-playground.lambdatest.io/',
  },
});