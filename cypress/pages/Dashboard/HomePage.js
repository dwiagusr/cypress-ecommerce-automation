class HomePage {
    // --- Selectors ---

    getSearchInput() { return cy.get('input[name="search"]'); }
    getSearchButton() { return cy.get('.type-text'); }
    getSearchResultHeader() { return cy.get('#content h1'); }

getMenuByName(menuName) {
        // Cari link 'a' (anchor) yang berisi teks 'Mega Menu' di dalam navbar
        // Ini lebih kuat dan spesifik ke tombol yang diklik/trigger hover
        return cy.contains('.navbar-nav a', menuName);
    }

getSubMenuByName(subMenuName) {
        // [REVISI SINKRONISASI]
        // 1. Dapatkan wadah dropdown dan pastikan terlihat.
        //    Ini akan membuat Cypress menunggu hingga animasi selesai.
        cy.get('.dropdown-menu').should('be.visible'); 

        // 2. Setelah wadah terlihat, kita cari link spesifik di dalamnya.
        return cy.get('.dropdown-menu a').contains(subMenuName);
    }

    getCategoryHeader() {
        return cy.get('#content h2');
    }

    // --- Actions ---

    visitHomePage() {
        cy.visit('/');
    }

    searchProduct(productName) {
        this.getSearchInput().clear().type(productName);
    }

    clickSearch() {
        this.getSearchButton().click();
    }

    hoverMenu(menuName) {
        this.getMenuByName(menuName).trigger('mouseover',{ force: true });
    }

    // [FUNGSI DENGAN LOGIC PERBAIKAN AKHIR - TIDAK ADA DUPLIKASI]
    clickSubMenu(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('be.visible') // Tunggu hingga link muncul
            .click({ force: true }); // Paksa klik
    }

    // --- Assertions ---

    verifySearchResult(productName) {
        this.getSearchResultHeader().should('contain', productName);
    }

    verifyCategoryHeader(categoryName) {
        // Mencari h2 spesifik di dalam #content
        cy.get('#content').contains('h2', categoryName).should('be.visible');
    }

    verifySubMenuLinkPresence(subMenuName) {
        this.getSubMenuByName(subMenuName)
            .should('exist') 
            .and('be.visible');
    }
}

export default HomePage;