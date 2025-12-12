class ProductPage {
    // --- Selectors ---
    
    getProductTitleLink(productName) {
        // Mencari link produk berdasarkan nama produk
        return cy.contains('.product-thumb h4 a', productName);
    }

    getAddToCartButton() {
        return cy.contains('button.button-cart', 'Add to Cart');
    }

    getCheckoutLinkInNotification() {
        // [REVISI] Selector Notifikasi yang Benar
        // 1. Cari elemen Alert/Notification yang terlihat
        // 2. Filter yang mengandung teks "Checkout"
        // Menggunakan 'a' (anchor) karena tombol itu sebenarnya adalah Link
        
        return cy.get('#notification-box-top, .alert') // Cari container notifikasi
            .should('be.visible') // Pastikan muncul dulu
            .find('a') // Cari semua link di dalamnya
            .contains('Checkout'); // Ambil yang tulisannya "Checkout"
    }

    getProductImage() {
        return cy.get('.product-thumb .image a').first();
    }

    // --- Actions ---

    // Klik Produk & Pastikan Pindah Halaman
    openProductDetail(productName) {
        // 1. Simpan URL lama (Halaman Search)
        cy.url().then(url => {
            const oldUrl = url;

            // 2. Klik Judul Produk
            // Kita gunakan selector yang lebih spesifik agar tidak salah klik
            cy.contains('.product-thumb h4 a', productName)
                .should('be.visible')
                .click(); 

            // 3. [PENTING] Validasi Navigasi
            // Robot dilarang lanjut kalau URL belum berubah (artinya belum masuk detail produk)
            cy.url().should('not.eq', oldUrl);
            cy.url().should('include', 'route=product/product'); // Ciri khas URL halaman detail
        });
    }
    
clickAddToCart() {
        this.getAddToCartButton().click({force: true});
    }

    proceedToCheckout() {
        // Klik link 'checkout' di notifikasi toast
        this.getCheckoutLinkInNotification().click();
    }

    // --- Assertions ---

    verifyProductInStock() {
        // Cek apakah icon (Out of Stock) ada atau tidak
        // Coba akses 'Body' dulu agar tidak langsung failed (timeout) jikka element tidak ada
        cy.get('body').then($body => {
            // Jika Icon 'Out of Stock' tidak ditemukan, berarti produk tersedia
            if ($body.find('.badge-danger').length > 0) {
                // .... STOP test dan muncul pesan error
                throw new Error("⛔ TEST STOPPED: Product is Out of Stock!");
            }
        });

        // Jika icon 'Out of Stock' tidak ditemukan, lanjutkan test
        cy.get('.badge-success')
        .should('be.visible')
        .and('contain', 'In Stock')
        .then(() => {
            cy.log("✅ Product is In Stock, proceed with the test.");
        });
    }
}

export default ProductPage;