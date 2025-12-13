import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '../../../pages/Dashboard/HomePage';
import ProductPage from '../../../pages/Transaction/ProductPage';
import CheckoutPage from '../../../pages/Transaction/CheckoutPage';

const homePage = new HomePage();
const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();

// =================================================================
// SEARCH STEPS
// =================================================================

Given('I search for product {string}', function (productName) {
    homePage.searchProduct(productName);
});

When('I click the search button', function () {
    homePage.clickSearch();
});

// =================================================================
// FILTER STEPS
// =================================================================

When('I verify for duplicate filter options named {string}', function (optionName) {
    homePage.checkDuplicateFilters(optionName);
});

// Note: Ensure toggleFilter is handled correctly if the filter is collapsed by default
When('I filter the results by {string}', function (filterName) {
    homePage.toggleFilter(filterName); 
});

When('I select {string} from the filter options', function (optionName) {
    homePage.selectFilterOption(optionName);
});

// =================================================================
// PRODUCT DETAIL & CART STEPS
// =================================================================

When('I select {string} from the search results', function (productName) {
    productPage.openProductDetail(productName);
});

When('I verify the product is in stock', function () {
    productPage.verifyProductInStock();
});

When('I add the product to the cart', function () {
    productPage.clickAddToCart();
});

When('I proceed to checkout', function () {
    productPage.proceedToCheckout();
});

// =================================================================
// CHECKOUT STEPS
// =================================================================

When('I fill the billing details with valid data', function () {
    // Fills the address form. Logic to handle "New Address" radio button is inside the Page Object.
    checkoutPage.fillBillingDetails();
});

When('I fill the order comment {string} and agree to terms', function (comment) {
    // Input the order comment and check the Terms & Conditions box
    checkoutPage.fillOrderComment(comment);
    checkoutPage.agreeTermsAndConditions();
    checkoutPage.clickContinue();
});

// [NEW STEP] Verifying the Order Summary Section
When('I verify the order summary details with product {string} and comment {string}', function (productName, comment) {
    // Validate the product name, address details, and comment in the summary section before confirming
    checkoutPage.verifyOrderSummary(productName, comment);
});

When('I confirm the order', function () {
    // Click the final "Continue" or "Confirm" button to place the order
    checkoutPage.clickConfirmOrder();
});

Then('I should see the order success message {string}', function (message) {
    // Verify the success landing page
    checkoutPage.verifyOrderSuccess(message);
});

// =================================================================
// --- NEGATIVE SCENARIOS STEPS ---
// =================================================================

When('I choose to use a new address', function () {
    checkoutPage.selectNewAddressOption();
});

When('I fill the billing details but leave First Name empty', function () {
    checkoutPage.fillBillingDetailsSkippingFirstName();
});

When('I click the continue button in billing details', function () {
    // Note: This clicks the specific continue button for the address section
    checkoutPage.clickContinueButtonInBilling();
});

Then('I should see an error message {string}', function (errorMessage) {
    checkoutPage.verifyFieldErrorMessage(errorMessage);
});