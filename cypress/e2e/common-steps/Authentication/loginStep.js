import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../../pages/Authentication/LoginPage';

const loginPage = new LoginPage();

// ... (Step Given dan When biarkan sama) ...

Given('pengguna berada di halaman login', () => {
  loginPage.visitLoginPage();
});

When('pengguna memasukkan username {string} dan password {string}', (username, password) => {
  loginPage.fillLoginDetails(username, password);
});

When('pengguna menekan tombol login', () => {
  loginPage.submitLogin();
});

// [HAPUS atau KOMENTARI step "Then" yang lama tentang My Account]
// Then('pengguna akan melihat halaman My Account', () => {
//   loginPage.verifySuccessLogin();
// });

// [TAMBAHKAN STEP BARU INI]
Then('pengguna akan melihat pesan error {string}', (errorMessage) => {
  loginPage.verifyErrorMessage(errorMessage);
});