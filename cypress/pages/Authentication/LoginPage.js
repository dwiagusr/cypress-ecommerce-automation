class LoginPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    getEmailInput() {
        return cy.get('#input-email');
    }

    getPasswordInput() {
        return cy.get('#input-password');
    }

    getLoginButton() {
        return cy.get('input[value="Login"]');
    }
    
    // Header used to verify successful login
    getAccountHeading() {
        return cy.contains('h2', 'My Account');
    }

    // Alert banner used to verify failed login attempts
    getErrorAlert() {
        return cy.get('.alert-danger');
    }


    // =================================================================
    // ACTIONS
    // =================================================================
    
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
    

    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================
    
    verifySuccessLogin() {
        // Confirm user is on the dashboard by checking the heading
        this.getAccountHeading().should('contain', 'My Account');
    }

    verifyErrorMessage(expectedText) {
        // Validate that the error alert is visible and contains the expected text
        this.getErrorAlert()
            .should('be.visible')
            .and('contain', expectedText);
    }
}

export default LoginPage;