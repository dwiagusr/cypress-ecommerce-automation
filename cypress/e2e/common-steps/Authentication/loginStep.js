import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '@pages/Authentication/LoginPage';

const loginPage = new LoginPage();

// =================================================================
// SCENARIO A: Dynamic Steps for Login.feature
// (Used when the Feature File sends specific email/password data)
// =================================================================

Given('I am on the login page', () => {
    loginPage.visitLoginPage();
});

// This step receives {string} data from Login.feature
When('I enter username {string} and password {string}', (email, password) => {
    loginPage.fillLoginDetails(email, password);
});

When('I click the login button', () => {
    loginPage.submitLogin();
});

Then('I should see the {string} page', (pageName) => {
    // Verifies successful login by checking the dashboard header
    loginPage.verifySuccessLogin(); 
});

Then('I should see an error message containing {string}', (errorMessage) => {
    loginPage.verifyErrorMessage(errorMessage);
});


// =================================================================
// SCENARIO B: Shortcut Step for Backgrounds (e.g., CheckoutNegative.feature)
// (Used when the Feature File simply says "I login to the application")
// =================================================================

Given('I login to the application', () => {
    // 1. Visit Login Page
    loginPage.visitLoginPage();

    // 2. Define Valid Credentials manually here
    // We use hardcoded data because the Background step doesn't send any data.
    // NOTE: Use the account that already has an address saved!
    const validEmail = 'test.user.1764607288632@mail.com'; 
    const validPass  = 'Password123!';

    // 3. Fill and Submit
    loginPage.fillLoginDetails(validEmail, validPass);
    loginPage.submitLogin();

    // 4. Verify Success before proceeding to other tests
    loginPage.verifySuccessLogin();
});