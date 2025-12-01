class RegisterPage {
    // Selectors

    getFirstNameInput() { return cy.get('#input-firstname'); }
    getLastNameInput()  { return cy.get('#input-lastname'); }
    getEmailInput()     { return cy.get('#input-email'); }
    getPhoneInput()     { return cy.get('#input-telephone'); }
    getPasswordInput()  { return cy.get('#input-password'); }
    getConfirmPassInput() { return cy.get('#input-confirm'); }
    
    getPrivacyCheckbox() { return cy.get('input[name="agree"]'); }
    getContinueButton()  { return cy.get('input[value="Continue"]'); }
    
    getPageHeader()      { return cy.get('#content h1'); }
    getAlertError()      { return cy.get('.alert-danger'); }

    // Actions

    visitRegisterPage() {
        cy.visit('index.php?route=account/register');
    }

 fillRegistrationForm() {
        // 1. KITA BUAT DULU VARIABELNYA DI SINI (JANGAN SAMPAI HILANG)
        const randomNumber = Date.now(); 
        const randomEmail = `test.user.${randomNumber}@mail.com`;

        // Debugging: Kita cetak di console browser untuk memastikan email terbentuk
        cy.log(`Email yang digunakan: ${randomEmail}`);

        // 2. MULAI ISI FORM
        this.getFirstNameInput().type('Test');
        this.getLastNameInput().type('User');
        
        // 3. BARU KITA PAKAI VARIABELNYA DI SINI
        this.getEmailInput().type(randomEmail); 
        
        this.getPhoneInput().type('08123456789');
        this.getPasswordInput().type('Password123!');
        this.getConfirmPassInput().type('Password123!');
        
        // Pilih "No" untuk Newsletter
        cy.get('input[name="newsletter"][value="0"]').check();
    }

    checkPrivacyPolicy() {
        this.getPrivacyCheckbox().check();
    }
    submitRegistration() {
        this.getContinueButton().click();
    }

    // Assertions

    verifySuccessPage(expectedTitle) {
        this.getPageHeader().should('have.text', expectedTitle);
    }
    verifyPrivacyError(expectedText) {
        this.getAlertError().should('contain', expectedText);
    }
}

export default RegisterPage;
