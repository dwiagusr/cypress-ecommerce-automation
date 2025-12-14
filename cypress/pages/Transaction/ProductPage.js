class ProductPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    getProductTitleLink(productName) {
        // Locates the product title link in the list based on the name
        return cy.contains('.product-thumb h4 a', productName);
    }

    getAddToCartButton() {
        // Locates the 'Add to Cart' button.
        // Uses .filter(':visible') to avoid selecting hidden mobile buttons.
        return cy.get('button')
            .filter(':visible')
            .contains('Add to Cart', { matchCase: false });
    }

    getCheckoutLinkInNotification() {
        // Robust selector for the Checkout link within the notification/alert box
        // 1. Find the visible Alert/Notification container
        // 2. Search for an anchor tag ('a') containing the text "Checkout"
        return cy.get('#notification-box-top, .alert') 
            .should('be.visible') 
            .find('a') 
            .contains('Checkout'); 
    }

    getProductImage() {
        // Selects the first product image link
        return cy.get('.product-thumb .image a').first();
    }


    // =================================================================
    // ACTIONS
    // =================================================================

    /**
     * Navigates to the product detail page by clicking the title.
     * Includes critical validation to ensure the page URL has changed.
     * @param {string} productName - The name of the product to click
     */
    openProductDetail(productName) {
        // 1. Capture the current URL (Search Results Page)
        cy.url().then(url => {
            const oldUrl = url;

            // 2. Click the Product Title
            this.getProductTitleLink(productName)
                .should('be.visible')
                .click(); 

            // 3. Navigation Validation
            // Ensure the URL has changed before proceeding.
            // This prevents the test from running on the wrong page if the click failed.
            cy.url().should('not.eq', oldUrl);
            cy.url().should('include', 'route=product/product'); 
        });
    }
    
    clickAddToCart() {
        // Force click is used to bypass potential hover overlays or CSS animations
        this.getAddToCartButton().click({ force: true });
    }

    proceedToCheckout() {
        // Clicks the 'Checkout' link found within the success notification toast
        this.getCheckoutLinkInNotification().click();
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    /**
     * Verifies that the product is currently In Stock.
     * Throws an error if the "Out of Stock" badge is detected.
     */
    verifyProductInStock() {
        // 1. Conditional Check for "Out of Stock" badge
        // We access 'body' to prevent Cypress from failing immediately if the element is missing.
        cy.get('body').then($body => {
            // Check if the danger badge (Out of Stock) exists in the DOM
            if ($body.find('.badge-danger').length > 0) {
                // Terminate the test immediately with a clear error message
                throw new Error("⛔ TEST STOPPED: Product is Out of Stock!");
            }
        });

        // 2. Affirmative Check for "In Stock" badge
        // If "Out of Stock" was not found, verify the "In Stock" badge is visible.
        cy.get('.badge-success')
            .should('be.visible')
            .and('contain', 'In Stock')
            .then(() => {
                cy.log("✅ Product is In Stock, proceeding with the test.");
            });
    }
}

export default ProductPage;