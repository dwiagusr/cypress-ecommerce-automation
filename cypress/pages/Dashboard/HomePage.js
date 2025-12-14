class HomePage {
    // =================================================================
    // SELECTORS
    // =================================================================

    // --- Search & Header ---
    getSearchInput()        { return cy.get('input[name="search"]').filter(':visible'); }
    getSearchButton()       { return cy.get("button[class='type-text']").filter(':visible'); }
    getSearchResultHeader() { return cy.get('#content h1'); }
    getCategoryHeader()     { return cy.get('#content h2'); }

    // --- Navigation Menu (Navbar) ---
    getMenuByName(menuName) { return cy.contains('.navbar-nav a', menuName); }
    getSubMenuByName(subMenuName) { return cy.get(`a[title='${subMenuName}']`); }

    // --- Filters (Sidebar) ---
    getFilterHeaderByName(filterName) { 
        return cy.contains('.mz-filter-group-header', new RegExp(filterName, 'i')); 
    }
    
    // Finds filter labels but ensures we only pick visible ones to avoid hidden mobile elements
    getFilterOption(optionName) { 
        return cy.get('.custom-control-label')
            .filter(':visible')
            .contains(new RegExp(optionName, 'i')); 
    }

    // --- Product List & Details ---
    getProductTitleLinks() { return cy.get('.product-thumb h4 a'); }
    
    // Finds the "Add to Cart" button. Uses filter(':visible') to avoid clicking hidden mobile buttons.
    getAddToCartButton() { 
        return cy.get('button')
            .filter(':visible')
            .contains('Add to Cart', { matchCase: false }); 
    }


    // =================================================================
    // ACTIONS
    // =================================================================

    visitHomePage() {
        cy.visit('/');
    }

    // --- Search Actions ---
    searchProduct(productName) {
        this.getSearchInput().clear().type(productName);
    }

    clickSearch() {
        this.getSearchButton().click({ force: true });
    }

    // --- Menu Actions ---
    hoverMenu(menuName) {
        // 1. Trigger mouseover event
        this.getMenuByName(menuName).trigger('mouseover', { force: true });
        
        // 2. Force show the dropdown (Fix for CSS hover delays)
        this.getMenuByName(menuName)
            .parent()
            .find('.dropdown-menu')
            .invoke('show');
    }

    clickSubMenu(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('be.visible')
            .click({ force: true });
    }

    // --- Filter Actions ---
    toggleFilter(filterName) {
        this.getFilterHeaderByName(filterName).click({ force: true });
    }

    /**
     * Smart Filter Selection:
     * Checks if the filter is already applied (via Checkbox state AND URL param)
     * to prevent accidental toggling (turning off) or double-waiting.
     */
    selectFilterOption(optionName) {
        // 1. Setup Request Interception
        cy.intercept('GET', /route=extension\/module\/mz_filter\/product/).as('filterLoading');

        // 2. Get the input element associated with the label
        this.getFilterOption(optionName)
            .parent()
            .find('input')
            .then(($input) => {
                // 3. Check URL + Checkbox State Combo
                cy.url().then((currentUrl) => {
                    const isChecked = $input.is(':checked');
                    const isUrlFiltered = currentUrl.includes('mz_fss');

                    // LOGIC: Only skip if UI matches Backend (Both Active)
                    if (isChecked && isUrlFiltered) {
                        cy.log(`ℹ️ Filter "${optionName}" is already active and synced. Skipping click.`);
                    } else {
                        // Scenario: Unchecked OR Checked but URL is clean (Ghost state) -> Click needed.
                        cy.log(`⚡ Action needed: Input Checked=${isChecked}, URL Active=${isUrlFiltered}. Clicking filter...`);

                        cy.wrap($input).click({ force: true });

                        // CRITICAL: Only wait for network response if we actually clicked
                        cy.wait('@filterLoading', { timeout: 10000 });
                    }
                });
            });

        // 4. Final Validation: Ensure URL param exists
        cy.url().should('include', 'mz_fss'); 

        // 5. Short buffer for DOM rendering
        cy.wait(500); 
    }

    /**
     * Fallback Strategy for Out-of-Stock Items:
     * Tries the first product. If "Out of Stock", goes back, re-applies filter,
     * and selects the second product.
     * @param {string} filterOptionName - Name of the filter to re-apply (e.g., "In Stock")
     */
    selectProductWithFallback(filterOptionName) {
        // 1. Click the FIRST product (Index 0)
        this.getProductTitleLinks().first().should('be.visible').click();

        // 2. Check availability context
        cy.get('body').then(($body) => {
            // Check for danger badge or text
            const isOutOfStock = $body.find('.badge-danger').length > 0 || $body.text().includes('Out Of Stock');

            if (isOutOfStock) {
                cy.log(`⚠️ Alert: First product is Out of Stock. Initiating fallback strategy...`);

                // 3. Return to List Page
                cy.go('back');
                this.getProductTitleLinks().should('be.visible');

                // 4. Re-apply Filter (Back button often resets AJAX state)
                cy.log(`🔄 Re-applying filter: ${filterOptionName}`);
                this.selectFilterOption(filterOptionName);

                // 5. Select the SECOND product (Index 1)
                this.getProductTitleLinks().eq(1).should('be.visible').click();

                // 6. Verify we landed on a valid product page
                this.getAddToCartButton().should('be.visible');

            } else {
                cy.log('✅ Success: First product is available.');
                // Verify button visibility
                this.getAddToCartButton().should('be.visible');
            }
        });
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    verifySearchResult(productName) {
        this.getSearchResultHeader().should('contain', productName);
    }

    verifyCategoryHeader(categoryName) {
        cy.get('#content').contains('h2', categoryName).should('be.visible');
    }

    verifySubMenuLinkPresence(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('exist') 
            .and('be.visible')
            .then(() => {
                cy.log(`✅ SUCCESS: Sub menu "${subMenuName}" is visible.`);
            });
    }

    // --- Duplicate Filter Detection (Utility) ---
    checkDuplicateFilters(optionName) {
        cy.get('.custom-control-label:visible').then($allLabels => {
            // Filter labels matching the text
            const duplicates = $allLabels.filter((index, element) => {
                const text = Cypress.$(element).text().trim().toLowerCase();
                return text.includes(optionName.toLowerCase());
            });

            const count = duplicates.length;
            if (count > 1) {
                cy.log(`⚠️ WARNING: ${count} duplicate filter options found for "${optionName}".`);
                cy.screenshot(`duplicate-filters-${optionName.replace(/\s+/g, '-')}`);
            } else {
                cy.log(`✅ No duplicate filter options for "${optionName}".`);
            }
        });
    }
}

export default HomePage;