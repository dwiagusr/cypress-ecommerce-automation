class ProductPage {
    // --- Selectors ---
    
    // Tombol Add to Cart di halaman hasil pencarian (atau detail produk)
    // Kita ambil tombol Add to Cart pertama yang muncul di hasil pencarian
    getFirstProductAddToCartBtn() { 
        return cy.get('.product-layout .button-group button').first(); 
    }

    // Tombol Checkout di notifikasi sukses (Toast message)
    getCheckoutLinkInNotification() {
        // Mencari link "Checkout" di dalam alert notifikasi hitam/hijau yang muncul
        return cy.contains('.toast-body a', 'Checkout');
    }

    // --- Actions ---

    addToCart() {
        // Klik tombol Add to Cart
        this.getFirstProductAddToCartBtn().click();
    }

    proceedToCheckout() {
        // Tunggu notifikasi muncul dan klik Checkout
        this.getCheckoutLinkInNotification().click();
    }
}

export default ProductPage;