import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";
// Perhatikan jumlah "../" untuk keluar dari folder Authentication -> common-steps -> e2e -> root
import RegisterPage from '../../../pages/Authentication/RegisterPage';

const registerPage = new RegisterPage();

// Step Definitions untuk Registrasi

Given('I am on the registration page', () => {
    registerPage.visitRegisterPage();
});

When('I fill the registration form with valid data', () => {
    registerPage.fillRegistrationForm();
});

When('I agree to the privacy policy', () => {
    registerPage.checkPrivacyPolicy();
});

When('I click the continue button', () => {
    registerPage.submitRegister();
});

Then('I should see the page title {string}', (title) => {
    registerPage.verifySuccessPage(title);
});

Then('I should see a privacy error message {string}', (errorMessage) => {
    registerPage.verifyPrivacyError(errorMessage);
});