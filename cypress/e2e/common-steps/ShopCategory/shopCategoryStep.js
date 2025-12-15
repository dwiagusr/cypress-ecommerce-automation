import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
// Import the Page Object
import HomePage from '@pages/Dashboard/HomePage';

const homePage = new HomePage();
// =================================================================
// --- Step Definitions ---
// =================================================================

Given('I am on the home page', () => {
    // Function calls the visitHomePage() logic in HomePage.js
    homePage.visitHomePage();
});

Then('I should see the {string} sub-category link', (brandName) => {
    // Function calls the verifySubMenuLinkPresence() logic in HomePage.js
    homePage.verifySubMenuLinkPresence(brandName);
});

When('I hover over the {string} menu', (menuName) => {
    // Function calls the hoverMenu() logic in HomePage.js
    homePage.hoverMenu(menuName);
});

When('I select the {string} sub-category', (brandName) => {
    // Performs a click on the sub-category link (e.g., "Apple", "HTC")
    homePage.clickSubMenu(brandName);
});

Then('I should see the {string} option in the list', (brandName) => {
    homePage.verifyBrandNameVisible(brandName); 
});

Then('I should see the {string} product list header', (expectedHeader) => {
    // Validates that the user has been redirected to the correct page
    // by checking the H1 header text.
    homePage.verifyPageHeader(expectedHeader);
});