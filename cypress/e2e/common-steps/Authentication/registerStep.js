import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Perhatikan jumlah "../" untuk keluar dari folder Authentication -> common-steps -> e2e -> root
import RegisterPage from '../../../pages/Authentication/RegisterPage';

const registerPage = new RegisterPage();

// Step Definitions untuk Registrasi

Given('pengguna berada di halaman registrasi', () => {
    registerPage.visitRegisterPage();
});

When('pengguna mengisi form registrasi dengan data valid', () => {
    registerPage.fillRegistrationForm();
});

When('pengguna menyetujui kebijakan privasi', () => {
    registerPage.checkPrivacyPolicy();
});

When('pengguna menekan tombol continue registrasi', () => {
    registerPage.submitRegister();
});

Then('pengguna akan melihat judul halaman {string}', (title) => {
    registerPage.verifySuccessPage(title);
});

Then('pengguna akan melihat pesan error privasi {string}', (errorMessage) => {
    registerPage.verifyPrivacyError(errorMessage);
});