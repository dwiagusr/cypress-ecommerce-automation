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
        return cy.get('#content > h2');
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
        // Ambil elemen alert
        this.getErrorAlert().then(($alert) => {
            // Ambil teks aslinya
            const actualText = $alert.text();
            
            // Cetak ke log Cypress (agar kita bisa baca)
            cy.log(`Teks yang ditemukan di website: "${actualText}"`);
            cy.log(`Teks yang kita cari: "${expectedText}"`);
            
            // Lakukan pengecekan
            expect(actualText).to.include(expectedText);
        });
    }
}

export default LoginPage;