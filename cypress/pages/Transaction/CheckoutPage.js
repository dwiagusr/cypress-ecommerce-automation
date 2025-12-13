class CheckoutPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    // --- Billing Details Form ---
    getFirstNameInput() { return cy.get('#input-payment-firstname'); }
    getLastNameInput()  { return cy.get('#input-payment-lastname'); }
    getAddressInput()   { return cy.get('#input-payment-address-1'); }
    getCityInput()      { return cy.get('#input-payment-city'); }
    getPostCodeInput()  { return cy.get('#input-payment-postcode'); }
    getCountrySelect()  { return cy.get('#input-payment-country'); }
    getZoneSelect()     { return cy.get('#input-payment-zone'); }
    getNewAddressRadio(){ return cy.get('#input-payment-address-new'); }

    // Other Elements
    getOrderCommentInput() { return cy.get('textarea[name="comment"]'); }
    getTermsCheckbox()     { return cy.get('input[name="agree"]'); }
    
    // Generic Continue Button (Finds button with text "Continue")
    getContinueButton()    { return cy.contains('button', 'Continue'); }

    // Confirm Order Section Selectors
    getConfirmOrderHeader() { return cy.contains('h1, h2, h3', 'Confirm Order'); }
    getProductSummaryCell(productName) { return cy.contains('.table-responsive table td', productName); }
    getPaymentAddressSection() { return cy.contains('h4, legend', 'Payment Address').parent(); }
    getShippingAddressSection() { return cy.contains('h4, legend', 'Shipping Address').parent(); }
    getShippingMethodSection() { return cy.contains('h4, legend', 'Shipping Method').parent(); }
    getConfirmButton() { return cy.get('#button-confirm'); }

    // Success Page Element
    getPageTitle() { return cy.get('#content h1'); }


    // =================================================================
    // ACTIONS
    // =================================================================

    fillBillingDetails() {
        const newAddressSelector = '#input-payment-address-new';
        
        // Check document body to handle "Existing Address" vs "New Address" logic
        cy.get('body').then(($body) => {
            if ($body.find(newAddressSelector).length > 0) {
                // CASE 1: Existing User (Radio button is present)
                // Switch to "New Address" to reveal the form
                cy.log('Existing address found. Switching to "New Address".');
                this.getNewAddressRadio().should('exist').click({force: true});
                cy.wait(500);
            } else {
                // CASE 2: New User (No radio button, form is already visible)
                cy.log('No existing address found. Proceeding with new address form.');
            }
        });

        // Populate address data
        this.getFirstNameInput().type('QA');
        this.getLastNameInput().type('User');
        this.getAddressInput().type('Jalan Teknologi No. 10');
        this.getCityInput().type('Jakarta');
        this.getPostCodeInput().type('12345');
        
        // Handle Dropdown (Select)
        this.getCountrySelect().select('Indonesia');
        
        // Wait for Zone (Province) loading (AJAX)
        cy.wait(1000); 
        this.getZoneSelect().select('Jakarta');
    }

    fillOrderComment(message) {
        this.getOrderCommentInput().type(message);
    }

    agreeTermsAndConditions() {
        // Force check because it might be covered by custom UI
        this.getTermsCheckbox().check({ force: true });
    }

    clickContinue() {
        this.getContinueButton().should('be.visible').click();
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    verifyOrderSummary(productName, expectedComment) {
        // 1. Verify Header "Confirm Order"
        this.getConfirmOrderHeader()
            .scrollIntoView()
            .should('be.visible');

        // 2. Verify Product Name exists (using 'exist' to handle sticky header issues)
        this.getProductSummaryCell(productName)
            .scrollIntoView({ block: 'nearest' })
            .should('exist')
            .and('contain.text', productName);

        // 3. Verify Payment Address
        this.getPaymentAddressSection()
            .scrollIntoView() 
            .should('contain.text', 'QA User')
            .should('contain.text', 'Jalan Teknologi No. 10')
            .should('contain.text', 'Jakarta,Indonesia');

        // 4. Verify Shipping Address
        this.getShippingAddressSection()
            .scrollIntoView()
            .should('contain.text', 'QA User')
            .should('contain.text', 'Jalan Teknologi No. 10');

        // 5. Verify Shipping Method
        this.getShippingMethodSection()
            .scrollIntoView()
            .should('contain.text', 'Flat Shipping Rate');

        // 6. Verify Order Comments
        cy.contains('div', expectedComment)
            .scrollIntoView()
            .should('be.visible');
    }

    clickConfirmOrder() {
        this.getConfirmButton().click();
    }

    verifyOrderSuccess(message) {
        this.getPageTitle().should('contain', message);
    }


    // =================================================================
    // --- Actions for Negative Scenarios ---
    // =================================================================

    selectNewAddressOption() {
        // Explicitly select "New Address" to reveal the form for validation testing
        this.getNewAddressRadio().should('exist').click({ force: true });
        cy.wait(500); 
    }

    fillBillingDetailsSkippingFirstName() {
        // SKIP First Name to trigger validation error
        
        this.getLastNameInput().type('User');
        this.getAddressInput().type('Jalan Teknologi No. 10');
        this.getCityInput().type('Jakarta');
        this.getPostCodeInput().type('12345');

        this.getCountrySelect().select('Indonesia');
        cy.wait(1000); 
        this.getZoneSelect().select('Jakarta');
    }

    clickContinueButtonInBilling() {
        // Reusing the generic continue button as requested
        this.getContinueButton().should('be.visible').click();
    }


    // =================================================================
    // VERIFICATIONS FOR NEGATIVE SCENARIOS
    // =================================================================

    verifyFieldErrorMessage(expectedMessage) {
        // This targets the div that appears directly under the invalid input
        cy.contains('.invalid-feedback', expectedMessage)
            .should('be.visible');
    }     
}

export default CheckoutPage;