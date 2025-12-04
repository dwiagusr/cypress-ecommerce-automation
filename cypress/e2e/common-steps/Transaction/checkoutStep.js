import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '../../../../pages/Dashboard/HomePage';
import ProductPage from '../../../../pages/Transaction/ProductPage';
import CheckoutPage from '../../../../pages/Transaction/CheckoutPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();

// --- Reuse Step dari HomePage ---
Given('I search for product {string}', (productName) => {
    homePage.searchProduct(productName);
});

Given('I click the search button', () => {
    homePage.clickSearch();
});

// --- Product Steps ---
When('I add the product to the cart', () => {
    productPage.addToCart();
});

When('I proceed to checkout', () => {
    productPage.proceedToCheckout();
});

// --- Checkout Steps ---
When('I fill the billing details with valid data', () => {
    // Karena user mungkin sudah punya alamat (jika tes dijalankan 2x),
    // langkah ini mungkin perlu penyesuaian nanti.
    // Tapi untuk sekarang kita asumsikan user mengisi alamat baru.
    checkoutPage.fillBillingDetails();
});

When('I confirm the delivery method', () => {
    checkoutPage.confirmDeliveryMethod();
});

When('I confirm the payment method', () => {
    checkoutPage.confirmPaymentMethod();
});

When('I confirm the order', () => {
    checkoutPage.clickConfirmOrder();
});

Then('I should see the order success message {string}', (message) => {
    checkoutPage.verifyOrderSuccess(message);
});