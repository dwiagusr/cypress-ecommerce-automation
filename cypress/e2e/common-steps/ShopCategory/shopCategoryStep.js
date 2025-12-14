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

When('I select the {string} sub-category', (subMenuName) => {
    homePage.clickSubMenu(subMenuName);
});

Then('I should see the {string} product list header', (categoryName) => {
    homePage.verifyCategoryHeader(categoryName);
});