class HomePage {
    // --- Selectors ---

    getSearchInput()                    { return cy.get('input[name="search"]:visible'); }
    getSearchButton()                   { return cy.get("button[class='type-text']:visible"); }
    getSearchResultHeader()             { return cy.get('#content h1'); }
    // Mencari header filter di sidebar kiri (misal: Availability)
    getFilterHeaderByName(filterName)   { return cy.contains('.mz-filter-group-header', new RegExp(filterName, 'i')); }
    getFilterOption(optionName)         { return cy.contains('.custom-control-label', new RegExp(optionName, 'i')); }
    // Cari link 'a' (anchor) yang berisi teks 'Mega Menu' di dalam navbar
    // Ini lebih kuat dan spesifik ke tombol yang diklik/trigger hover
    getMenuByName(menuName)             { return cy.contains('.navbar-nav a', menuName);}
     // Selector Dinamis: `a[title='${subMenuName}']`
    getSubMenuByName(subMenuName)       { return cy.get(`a[title='${subMenuName}']`); }
    getCategoryHeader()                 { return cy.get('#content h2');}

    // --- Actions ---

    // ... search actions ...
    toggleFilter(filterName) {
        // Klik header filter (jika tertutup)
        // Kita pakai force:true atau scrollIntoView jika perlu
        this.getFilterHeaderByName(filterName).click({ force: true });
    }

    // [REVISI FINAL] Gunakan Regex untuk Intercept (Lebih Kuat)
    selectFilterOption(optionName) {
        // 1. Setup Intercept menggunakan Regex
        // Artinya: Tangkap request apapun yang URL-nya mengandung tulisan "route=extension/module/mz_filter/product"
        cy.intercept('GET', /route=extension\/module\/mz_filter\/product/).as('filterLoading');

        // 2. Klik Input Checkbox (Force Click)
        this.getFilterOption(optionName)
            .first()
            .parent()
            .find('input')
            .click({ force: true });

        // 3. Validasi URL (Bukti filter aktif)
        // Kita cek URL dulu agar yakin proses klik berhasil
        cy.url().should('include', 'mz_fss'); 

        // 4. Tunggu Loading Selesai
        // Robot akan menunggu request yang cocok dengan Regex di atas
        cy.wait('@filterLoading', { timeout: 10000 });
        
        // 5. [Safety] Tunggu sebentar agar DOM stabil
        // Kadang setelah request selesai, gambar produk butuh 0.5 detik untuk render ulang
        cy.wait(500); 
    }

    visitHomePage() {
        cy.visit('/');
    }

    searchProduct(productName) {
        this.getSearchInput().clear().type(productName);
    }

    clickSearch() {
        this.getSearchButton().click({ force: true });
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
    // --- Cek Duplikasi Filter ---
    checkDuplicateFilters(optionName) {
        // 1. Ambil semua label di sidebar kiri
        cy.get('.custom-control-label:visible')
        .then($allLabels => {
        // 2. Filter manual menggunakan jQuery/JavaScript biasa
        // Cari label yang teksnya mengandung optionName (misal: "In stock")
        const duplicates = $allLabels.filter((index, element) => {
            const text = Cypress.$(element).text().trim().toLowerCase();
            return text.includes(optionName.toLowerCase());
        });

        // 3. Logic pengecekan duplikasi
        const count = duplicates.length;
        if (count > 1) {
            // Jika ada duplikasi, lanjutkan test dengan warning
            cy.log(`⚠️ WARNING: ISSUE DETECTED! ${count} duplicate filter options for "${optionName}". Proceeding with the test.`);

            // Optional : Take screenshot for evidence
            cy.screenshot(`duplicate-filters-${optionName.replace(/\s+/g, '-')}`);
        } else {
            // Jika tidak ada duplikasi, lanjutkan test normal
            cy.log(`✅ No duplicate filter options for "${optionName}". Proceeding with the test.`);
        }
        });
    }
}

export default HomePage;