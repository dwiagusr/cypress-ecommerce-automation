class CheckoutPage {
    // --- Selectors ---

    // Form Billing Details
    getFirstNameInput() { return cy.get('#input-payment-firstname'); }
    getLastNameInput()  { return cy.get('#input-payment-lastname'); }
    getAddressInput()   { return cy.get('#input-payment-address-1'); }
    getCityInput()      { return cy.get('#input-payment-city'); }
    getPostCodeInput()  { return cy.get('#input-payment-postcode'); }
    getCountrySelect()  { return cy.get('#input-payment-country'); }
    getZoneSelect()     { return cy.get('#input-payment-zone'); }
    
    // Tombol-tombol Continue (Karena ini One Page Checkout, ID-nya mungkin beda-beda)
    // Tips Mentor: Kita pakai selector generik yang kuat untuk tombol "Continue" di setiap langkah
    getBillingContinueBtn() { return cy.get('#button-payment-address'); }
    getDeliveryMethodContinueBtn() { return cy.get('#button-shipping-method'); }
    
    // Payment Method
    getTermsCheckbox() { return cy.get('input[name="agree"]'); }
    getPaymentMethodContinueBtn() { return cy.get('#button-payment-method'); }
    
    // Confirm Order
    getConfirmOrderBtn() { return cy.get('#button-confirm'); }
    
    // Success Page
    getPageTitle() { return cy.get('#content h1'); }

    // --- Actions ---

    fillBillingDetails() {
        // Kita isi data alamat dummy
        this.getFirstNameInput().type('QA');
        this.getLastNameInput().type('User');
        this.getAddressInput().type('Jalan Teknologi No. 10');
        this.getCityInput().type('Jakarta');
        this.getPostCodeInput().type('12345');
        
        // Dropdown (Select)
        this.getCountrySelect().select('Indonesia');
        
        // Tunggu sebentar agar loading Zone (Provinsi) selesai setelah pilih Negara
        cy.wait(1000); 
        this.getZoneSelect().select('DKI Jakarta');
        
        // Klik Continue
        this.getBillingContinueBtn().click();
    }

    confirmDeliveryMethod() {
        this.getDeliveryMethodContinueBtn().click();
    }

    confirmPaymentMethod() {
        this.getTermsCheckbox().check({ force: true });
        this.getPaymentMethodContinueBtn().click();
    }

    clickConfirmOrder() {
        this.getConfirmOrderBtn().click();
    }

    // --- Assertions ---

    verifyOrderSuccess(message) {
        this.getPageTitle().should('contain', message);
    }
}

export default CheckoutPage;