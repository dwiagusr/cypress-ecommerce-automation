class HomePage {
    // =================================================================
    // SELECTORS
    // =================================================================

    // --- Search & Header ---
    getSearchInput()        { return cy.get('input[name="search"]:visible'); }
    getSearchButton()       { return cy.get("button[class='type-text']:visible"); }
    getSearchResultHeader() { return cy.get('#content h1'); }
    getCategoryHeader()     { return cy.get('#content h2'); }

    // --- Navigation Menu (Navbar) ---
    // Finds the main menu link (anchor) inside the navbar
    getMenuByName(menuName) { return cy.contains('.navbar-nav a', menuName); }
    
    // Finds sub-menu items dynamically based on the 'title' attribute
    getSubMenuByName(subMenuName) { return cy.get(`a[title='${subMenuName}']`); }

    // --- Filters (Sidebar) ---
    // Finds filter group headers (e.g., Availability, Price)
    getFilterHeaderByName(filterName) { 
        return cy.contains('.mz-filter-group-header', new RegExp(filterName, 'i')); 
    }
    
    // Finds filter checkboxes (e.g., In Stock, Red, Blue)
    getFilterOption(optionName) { 
        return cy.contains('.custom-control-label', new RegExp(optionName, 'i')); 
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
        // 1. Trigger mouseover event on the main menu item
        this.getMenuByName(menuName).trigger('mouseover', { force: true });
        
        // 2. Force the dropdown container to show (Sync Fix)
        // This handles cases where CSS hover effects are slow or rely on 'display: none'
        this.getMenuByName(menuName)
            .parent()                 // Go up to the parent LI element
            .find('.dropdown-menu')   // Find the dropdown UL inside
            .invoke('show');          // Force CSS display: block
    }

    clickSubMenu(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('be.visible')     // Ensure element is visible before interaction
            .click({ force: true });  // Force click to bypass potential overlays
    }

    // --- Filter Actions ---
    toggleFilter(filterName) {
        // Expand the filter section if it's collapsed
        this.getFilterHeaderByName(filterName).click({ force: true });
    }

    selectFilterOption(optionName) {
        // 1. Setup Request Interception (Regex based)
        // Captures any GET request containing the filter module path
        cy.intercept('GET', /route=extension\/module\/mz_filter\/product/).as('filterLoading');

        // 2. Click the Filter Checkbox
        // We select the input element related to the label and force click it
        this.getFilterOption(optionName)
            .first()
            .parent()
            .find('input')
            .click({ force: true });

        // 3. URL Validation
        // Ensure the URL updates to reflect the applied filter (mz_fss parameter)
        cy.url().should('include', 'mz_fss'); 

        // 4. Wait for Network Idle
        // Waits for the intercepted request to complete (ensures products are reloaded)
        cy.wait('@filterLoading', { timeout: 10000 });
        
        // 5. DOM Stabilization
        // Small buffer to allow product images to render completely
        cy.wait(500); 
    }


    // =================================================================
    // VERIFICATIONS (ASSERTIONS)
    // =================================================================

    verifySearchResult(productName) {
        this.getSearchResultHeader().should('contain', productName);
    }

    verifyCategoryHeader(categoryName) {
        // Verify specifically for an h2 header within the content area
        cy.get('#content').contains('h2', categoryName).should('be.visible');
    }

    verifySubMenuLinkPresence(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('exist') 
            .and('be.visible')
            .then(() => {
                // Log success message to Cypress Command Log
                cy.log(`✅ SUCCESS: Sub menu "${subMenuName}" is visible.`);
            });
    }

    // --- Duplicate Filter Detection ---
    checkDuplicateFilters(optionName) {
        // 1. Retrieve all visible filter labels from the sidebar
        cy.get('.custom-control-label:visible').then($allLabels => {
            
            // 2. Filter using JavaScript logic
            // Find labels that contain the target text (case-insensitive)
            const duplicates = $allLabels.filter((index, element) => {
                const text = Cypress.$(element).text().trim().toLowerCase();
                return text.includes(optionName.toLowerCase());
            });

            // 3. Count occurrences and Log
            const count = duplicates.length;
            if (count > 1) {
                // WARN: Issue detected, but do not fail the test immediately
                cy.log(`⚠️ WARNING: ISSUE DETECTED! ${count} duplicate filter options found for "${optionName}". Proceeding with the test.`);

                // Optional: Capture evidence
                cy.screenshot(`duplicate-filters-${optionName.replace(/\s+/g, '-')}`);
            } else {
                // PASS: No duplicates found
                cy.log(`✅ No duplicate filter options for "${optionName}". Proceeding with the test.`);
            }
        });
    }
}

export default HomePage;