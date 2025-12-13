class RegisterPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    getFirstNameInput()   { return cy.get('#input-firstname'); }
    getLastNameInput()    { return cy.get('#input-lastname'); }
    getEmailInput()       { return cy.get('#input-email'); }
    getPhoneInput()       { return cy.get('#input-telephone'); }
    getPasswordInput()    { return cy.get('#input-password'); }
    getConfirmPassInput() { return cy.get('#input-confirm'); }
    
    // Privacy Policy & Buttons
    getPrivacyCheckbox()  { return cy.get('#input-agree'); }
    getContinueButton()   { return cy.get('input[value="Continue"]'); }
    getNewsletterRadio(value) { return cy.get(`input[name="newsletter"][value="${value}"]`); }

    // Verification Elements
    getPageHeader()       { return cy.get('#content h1'); }
    getAlertError()       { return cy.get('.alert-danger'); }


    // =================================================================
    // ACTIONS
    // =================================================================

    visitRegisterPage() {
        cy.visit('index.php?route=account/register');
    }

    fillRegistrationForm() {
        // 1. Generate Dynamic Data
        // We use a timestamp to ensure the email is unique for every test run
        const randomNumber = Date.now(); 
        const randomEmail = `test.user.${randomNumber}@mail.com`;

        // Debugging: Log the generated email to the Cypress Command Log
        cy.log(`Generated Email: ${randomEmail}`);

        // 2. Fill Personal Details
        this.getFirstNameInput().type('Test');
        this.getLastNameInput().type('User');
        
        // 3. Input the generated unique email
        this.getEmailInput().type(randomEmail); 
        
        this.getPhoneInput().type('08123456789');

        // 4. Fill Password
        this.getPasswordInput().type('Password123!');
        this.getConfirmPassInput().type('Password123!');
        
        // 5. Newsletter Subscription
        // Select "No" (value="0") by default
        this.getNewsletterRadio('0').check();
    }

    checkPrivacyPolicy() {
        // Force checking because the actual input might be covered by a custom UI styling
        this.getPrivacyCheckbox().check({ force: true });
    }

    submitRegister() {
        this.getContinueButton().click();
    }   


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    verifySuccessPage(expectedTitle) {
        this.getPageHeader()
            .should('be.visible')
            .and('contain', expectedTitle);
    }

    verifyPrivacyError(expectedText) {
        this.getAlertError()
            .should('be.visible')
            .and('contain', expectedText);
    }
}

export default RegisterPage;