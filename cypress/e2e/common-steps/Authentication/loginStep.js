import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../../pages/Authentication/LoginPage'; 
// (Sesuaikan path import di atas dengan struktur folder Anda saat ini)

const loginPage = new LoginPage();

Given('pengguna berada di halaman login', () => {
  loginPage.visitLoginPage();
});

When('pengguna memasukkan username {string} dan password {string}', (username, password) => {
  loginPage.fillLoginDetails(username, password);
});

When('pengguna menekan tombol login', () => {
  loginPage.submitLogin();
});

// [INI YANG HARUS DITAMBAHKAN KEMBALI]
Then('pengguna akan melihat halaman My Account', () => {
  loginPage.verifySuccessLogin();
});

// Step untuk error (biarkan saja jika ingin tetap dipakai)
Then('pengguna akan melihat pesan error {string}', (errorMessage) => {
  loginPage.verifyErrorMessage(errorMessage);
});