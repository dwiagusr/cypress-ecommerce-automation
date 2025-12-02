import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Sesuaikan jumlah titik-titik (../) dengan struktur folder Anda!
import HomePage from '../../../pages/Dashboard/HomePage';

const homePage = new HomePage();

// --- Step Definitions ---

Given('I am on the home page', () => {
    // Memanggil fungsi dari HomePage yang sudah kita buat
    homePage.visitHomePage();
});

Then('I should see the {string} sub-category link', (brandName) => {
    // Fungsi ini memanggil logic 'should exist' di HomePage.js
    homePage.verifySubMenuLinkPresence(brandName);
});

When('I hover over the {string} menu', (menuName) => {
    homePage.hoverMenu(menuName);
});

When('I select the {string} sub-category', (subMenuName) => {
    homePage.clickSubMenu(subMenuName);
});

Then('I should see the {string} product list header', (categoryName) => {
    homePage.verifyCategoryHeader(categoryName);
});