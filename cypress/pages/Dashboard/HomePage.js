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
        // Selector Dinamis: `a[title='${subMenuName}']`
        return cy.get(`a[title='${subMenuName}']`); 
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
        // 1. Trigger mouseover di elemen link utama
        this.getMenuByName(menuName).trigger('mouseover', { force: true });
        
        // 2. [FIX SINKRONISASI] Cari dropdown container (UL) dan paksa visibility-nya
        this.getMenuByName(menuName)
            .parent() // Naik ke parent LI
            .find('.dropdown-menu') // Temukan UL dropdown menu di dalamnya
            .invoke('show'); // Paksa ubah CSS 'display: none' menjadi 'display: block'
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
            .and('be.visible')
            // [BARIS BARU] Tambahkan aksi setelah assertion berhasil
            .then(() => {
                // cy.log mencetak pesan ini ke Command Log Cypress
                cy.log(` ✅SUCCESS: Sub menu "${subMenuName}" is visible.`);
            });
    }
}

export default HomePage;