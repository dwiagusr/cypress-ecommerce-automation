class ProductPage {
    // =================================================================
    // SELECTORS
    // =================================================================

    getProductTitleLink(productName) {
        // Locates the product link based on the provided product name
        return cy.contains('.product-thumb h4 a', productName);
    }

    getAddToCartButton() {
        // Locates the 'Add to Cart' button specifically
        return cy.contains('button.button-cart', 'Add to Cart');
    }

    getCheckoutLinkInNotification() {
        // [FIXED] Robust Notification Selector
        // 1. Find the visible Alert/Notification container
        // 2. Search for an anchor tag ('a') containing the text "Checkout"
        return cy.get('#notification-box-top, .alert') // Target the notification box
            .should('be.visible') // Ensure it is visible
            .find('a') // Find link elements inside
            .contains('Checkout'); // Filter by text
    }

    getProductImage() {
        return cy.get('.product-thumb .image a').first();
    }


    // =================================================================
    // ACTIONS
    // =================================================================

    // Navigates to the product detail page and validates the URL change
    openProductDetail(productName) {
        // 1. Capture the current URL (Search Results Page)
        cy.url().then(url => {
            const oldUrl = url;

            // 2. Click the Product Title
            // Using a specific selector to ensure accurate clicking
            this.getProductTitleLink(productName)
                .should('be.visible')
                .click(); 

            // 3. [CRITICAL] Navigation Validation
            // Ensure the URL has changed before the robot proceeds.
            // This prevents the test from running if the page didn't load.
            cy.url().should('not.eq', oldUrl);
            cy.url().should('include', 'route=product/product'); // Unique pattern for Product Detail pages
        });
    }
    
    clickAddToCart() {
        // Force click is used to bypass potential hover overlays or CSS animations
        this.getAddToCartButton().click({ force: true });
    }

    proceedToCheckout() {
        // Click the 'Checkout' link found within the success notification toast
        this.getCheckoutLinkInNotification().click();
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    verifyProductInStock() {
        // Conditional Check: Verify if the "Out of Stock" badge exists.
        // We access 'body' first to prevent Cypress from failing immediately if the element is missing.
        cy.get('body').then($body => {
            // If the danger badge (Out of Stock) is found in the DOM:
            if ($body.find('.badge-danger').length > 0) {
                // STOP the test and throw a clear error message
                throw new Error("⛔ TEST STOPPED: Product is Out of Stock!");
            }
        });

        // If "Out of Stock" was not found, verify the "In Stock" badge is visible.
        cy.get('.badge-success')
            .should('be.visible')
            .and('contain', 'In Stock')
            .then(() => {
                cy.log("✅ Product is In Stock, proceed with the test.");
            });
    }
}

export default ProductPage;