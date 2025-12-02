import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../../pages/Authentication/LoginPage'; 
// (Sesuaikan path import di atas dengan struktur folder Anda saat ini)

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  loginPage.visitLoginPage();
});

When('I enter username {string} and password {string}', (username, password) => {
  loginPage.fillLoginDetails(username, password);
});

When('I click the login button', () => {
  loginPage.submitLogin();
});

Then('I should see the {string} page', (pageName) => {
  // Kita buat dinamis, jadi bisa cek "My Account" atau halaman lain
  // Tapi fungsinya tetap memanggil verifySuccessLogin untuk saat ini
  loginPage.verifySuccessLogin(); 
});

Then('I should see an error message containing {string}', (errorMessage) => {
  loginPage.verifyErrorMessage(errorMessage);
});