class CheckoutPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    // --- Billing Details Form ---
    getFirstNameInput() { return cy.get('#input-payment-firstname'); }
    getLastNameInput()  { return cy.get('#input-payment-lastname'); }
    // Added optional selectors for full data coverage
    getCompanyInput()   { return cy.get('#input-payment-company'); } 
    getAddressInput()   { return cy.get('#input-payment-address-1'); }
    // Added optional selector for Address 2
    getAddress2Input()  { return cy.get('#input-payment-address-2'); }
    getCityInput()      { return cy.get('#input-payment-city'); }
    getPostCodeInput()  { return cy.get('#input-payment-postcode'); }
    getCountrySelect()  { return cy.get('#input-payment-country'); }
    getZoneSelect()     { return cy.get('#input-payment-zone'); }
    getNewAddressRadio(){ return cy.get('#input-payment-address-new'); }
    // --- Order Comment & Terms ---
    getOrderCommentInput() { return cy.get('textarea[name="comment"]'); }
    getTermsCheckbox()     { return cy.get('input[name="agree"]'); }
    // --- Buttons ---
    // Generic Continue Button (Finds button with text "Continue")
    getContinueButton()    { return cy.contains('button', 'Continue'); }
    getConfirmButton()     { return cy.get('#button-confirm'); }
    // --- Confirm Order Section Selectors ---
    getConfirmOrderHeader()     { return cy.contains('h1, h2, h3', 'Confirm Order'); }
    getProductSummaryCell(productName) { return cy.contains('.table-responsive table td', productName); }
    getPaymentAddressSection()  { return cy.contains('h4, legend', 'Payment Address').parent(); }
    getShippingAddressSection() { return cy.contains('h4, legend', 'Shipping Address').parent(); }
    getShippingMethodSection()  { return cy.contains('h4, legend', 'Shipping Method').parent(); }
    // --- Success Page Element ---
    getPageTitle() { return cy.get('#content h1'); }


    // =================================================================
    // ACTIONS (STATIC / MANUAL TEST)
    // =================================================================

    /**
     * Fills billing details with hardcoded data (Used for @Checkout feature)
     */
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

        // Populate address data with static values
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

    // =================================================================
    // ACTIONS (DYNAMIC / DDT)
    // =================================================================

    /**
     * Fills billing details using data from JSON/Excel (Used for @CheckoutDDT feature)
     * @param {Object} data - The row data object from the fixture file
     */
    fillBillingDetailsDynamic(data) {
        const newAddressSelector = '#input-payment-address-new';
        
        // Reuse logic to switch to "New Address" if the user has previous history
        cy.get('body').then(($body) => {
            if ($body.find(newAddressSelector).length > 0) {
                this.getNewAddressRadio().should('exist').click({force: true});
                cy.wait(500);
            }
        });

        // Clear existing text and Type new data
        // Using data['HeaderName'] matching the Excel file
        this.getFirstNameInput()
            .scrollIntoView({ block: 'center' })
            .clear()
            .type(data['First Name']);

        this.getLastNameInput()
            .scrollIntoView({ block: 'center' })
            .clear()
            .type(data['Last Name']);

        // Handle Optional Field: Company
        if (data['Company']) {
            this.getCompanyInput()
                .scrollIntoView({ block: 'center' })
                .clear()
                .type(data['Company']);
        }

        this.getAddressInput()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .clear()
            .type(data['Address 1'], { force: true });

        // Handle Optional Field: Address 2
        if (data['Address 2']) {
            this.getAddress2Input()
                .scrollIntoView({ block: 'center' })
                .clear()
                .type(data['Address 2'], { force: true });
        }

        this.getCityInput()
            .scrollIntoView({ block: 'center' })
            .clear()
            .type(data['City'], { force: true });
        
        // Convert Post Code to string to ensure safety
        this.getPostCodeInput()
            .scrollIntoView({ block: 'center' })
            .clear()
            .type(data['Post Code'].toString());

        // Handle Dropdowns
        this.getCountrySelect()
            .scrollIntoView({ block: 'center' })
            .select(data['Country']);
        
        // Wait for Zone to load properly
        cy.wait(1000); 
        this.getZoneSelect()
            .scrollIntoView({ block: 'center' })
            .should('be.visible')
            .select(data['Region / State']);
    }

    // =================================================================
    // SHARED ACTIONS
    // =================================================================

    fillOrderComment(message) {
        this.getOrderCommentInput().clear().type(message);
    }

    agreeTermsAndConditions() {
        // Force check because it might be covered by custom UI elements
        this.getTermsCheckbox().check({ force: true });
    }

    clickContinue() {
        this.getContinueButton().should('be.visible').click();
    }

    clickConfirmOrder() {
        this.getConfirmButton().click();
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    /**
     * Verifies order summary with static/expected text (Used for @Checkout feature)
     */
    verifyOrderSummary(productName, expectedComment) {
        // 1. Verify Header "Confirm Order"
        this.getConfirmOrderHeader()
            .scrollIntoView()
            .should('be.visible');

        // 2. Verify Product Name exists
        this.getProductSummaryCell(productName)
            .scrollIntoView({ block: 'nearest' })
            .should('exist')
            .and('contain.text', productName);

        // 3. Verify Payment Address (Static Check)
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

    /**
     * Verifies order summary dynamically based on Excel data (Used for @CheckoutDDT feature)
     */
    verifyOrderSummaryDynamic(productName, data, expectedComment) {
        // Verify Header
        this.getConfirmOrderHeader().scrollIntoView().should('be.visible');

        // Verify Product Name
        this.getProductSummaryCell(productName).should('exist');

        // Verify Payment Address matches the Excel Data
        this.getPaymentAddressSection().scrollIntoView()
            .should('contain.text', data['First Name'])
            .should('contain.text', data['Last Name'])
            .should('contain.text', data['Address 1'])
            .should('contain.text', data['City']);

        // Verify Comment
        cy.contains('div', expectedComment).scrollIntoView().should('be.visible');
    }

    verifyOrderSuccess(message) {
        this.getPageTitle().should('contain', message);
    }


    // =================================================================
    // ACTIONS FOR NEGATIVE SCENARIOS
    // =================================================================

    selectNewAddressOption() {
        // Explicitly select "New Address" to reveal the form for validation testing
        this.getNewAddressRadio().should('exist').click({ force: true });
        cy.wait(500); 
    }

    fillBillingDetailsSkippingFirstName() {
        // SKIP First Name input to trigger validation error
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