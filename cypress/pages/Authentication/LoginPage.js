class LoginPage {
    // --- Selectors ---
    getEmailInput() {
        return cy.get('#input-email');
    }

    getPasswordInput() {
        return cy.get('#input-password');
    }

    getLoginButton() {
        return cy.get('input[value="Login"]');
    }
    
    getAccountHeading() {
        return cy.contains('h2', 'My Account');
    }

    // [PENTING] Selector ini yang dicari oleh tes Anda sekarang
    getErrorAlert() {
        return cy.get('.alert-danger');
    }

    // --- Actions ---
    
    visitLoginPage() {
        cy.visit('index.php?route=account/login'); 
    }

    fillLoginDetails(email, password) {
        this.getEmailInput().type(email);
        this.getPasswordInput().type(password);
    }

    submitLogin() {
        this.getLoginButton().click();
    }
    
    // --- Assertions ---
    
    verifySuccessLogin() {
        this.getAccountHeading().should('contain', 'My Account');
    }

    // [PENTING] Fungsi ini yang menyebabkan error "is not a function" tadi
    // Pastikan fungsi ini ada di dalam kurung kurawal class LoginPage
    verifyErrorMessage(expectedText) {
        this.getErrorAlert().should('contain', expectedText);
    }
}

export default LoginPage;