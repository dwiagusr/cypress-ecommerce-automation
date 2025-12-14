import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '@pages/Dashboard/HomePage';
import ProductPage from '@pages/Transaction/ProductPage';
import CheckoutPage from '@pages/Transaction/CheckoutPage';

// Import JSON data files
const dataCheckout = require('@fixtures/dataCheckout.json');

// Initialize Page Objects
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

When('I filter the results by {string}', function (filterName) {
    // Toggles the filter accordion (expands/collapses)
    homePage.toggleFilter(filterName); 
});

When('I select {string} from the filter options', function (optionName) {
    // Selects a specific checkbox within the filter group
    homePage.selectFilterOption(optionName);
});

// =================================================================
// PRODUCT SELECTION & DETAIL STEPS
// =================================================================

// [Standard] Simple selection by name (Does not handle Out-of-Stock)
When('I select {string} from the search results', function (productName) {
    productPage.openProductDetail(productName);
});

// [Robust] Selection using Fallback Strategy (Handles Out-of-Stock scenarios)
When('I select a product ensuring it is in stock', function () {
    // Tries index 0. If OOS -> Go Back -> Re-apply Filter -> Try index 1
    homePage.selectProductWithFallback('In Stock');
});

When('I verify the product is in stock', function () {
    // Asserts that the availability status on the detail page says "In Stock"
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
    // Fills the address form using static data defined in the Page Object
    checkoutPage.fillBillingDetails();
});

When('I fill the order comment {string} and agree to terms', function (comment) {
    checkoutPage.fillOrderComment(comment);
    checkoutPage.agreeTermsAndConditions();
    checkoutPage.clickContinue();
});

When('I verify the order summary details with product {string} and comment {string}', function (productName, comment) {
    // Validates product name and comment in the "Confirm Order" table
    checkoutPage.verifyOrderSummary(productName, comment);
});

When('I confirm the order', function () {
    checkoutPage.clickConfirmOrder();
});

Then('I should see the order success message {string}', function (message) {
    checkoutPage.verifyOrderSuccess(message);
});

// =================================================================
// --- NEGATIVE SCENARIOS STEPS ---
// =================================================================

When('I choose to use a new address', function () {
    // Forces the radio button to "New Address" to reveal the empty form
    checkoutPage.selectNewAddressOption();
});

When('I fill the billing details but leave First Name empty', function () {
    checkoutPage.fillBillingDetailsSkippingFirstName();
});

When('I click the continue button in billing details', function () {
    checkoutPage.clickContinueButtonInBilling();
});

Then('I should see an error message {string}', function (errorMessage) {
    // Verifies the validation error text under the input field
    checkoutPage.verifyFieldErrorMessage(errorMessage);
});

// =================================================================
// --- DDT LOOP STEP ---
// =================================================================

When('I perform checkout loop for product {string} using data from {string}', function (productName, fileName) {
    // Validate that the filename matches the imported fixture
    if (fileName.includes('dataCheckout')) {

        // Iterate through each data set in the JSON file
        dataCheckout.forEach((userData, index) => {
            
            // Log the start of the iteration
            cy.log(`*** START ORDER DATA ${index + 1}: ${userData["First Name"]} ***`);
            
            // -----------------------------------------------------
            // SECTION 1: RE-ORDER PROCESS (Search & Selection)
            // -----------------------------------------------------

            // 1. Search for the product
            homePage.searchProduct(productName);
            homePage.clickSearch();
            
            // 2. Apply Filters (using Robust Logic)
            homePage.checkDuplicateFilters('In stock'); 
            homePage.selectFilterOption('In stock');

            // 3. Select Product using FALLBACK STRATEGY
            // This ensures if Product A is OOS, it retries with Product B automatically
            homePage.selectProductWithFallback('In Stock');

            // -----------------------------------------------------
            // SECTION 2: ADD TO CART
            // -----------------------------------------------------
            
            // Add to cart and wait for the modal/redirect
            productPage.clickAddToCart();
            
            // Wait for cart update (stability wait)
            cy.wait(500); 
            productPage.proceedToCheckout();

            // -----------------------------------------------------
            // SECTION 3: FILL BILLING DETAILS (DYNAMIC)
            // -----------------------------------------------------

            checkoutPage.fillBillingDetailsDynamic(userData);

            // -----------------------------------------------------
            // SECTION 4: CONFIRMATION
            // -----------------------------------------------------

            const commentText = `DDT Test Row ${index + 1}`;
            checkoutPage.fillOrderComment(commentText);
            checkoutPage.agreeTermsAndConditions();
            checkoutPage.clickContinue();

            // Note: Optional verification step can be uncommented if needed
            // checkoutPage.verifyOrderSummaryDynamic(productName, userData, commentText);
            
            checkoutPage.clickConfirmOrder();

            // Verify Success
            checkoutPage.verifyOrderSuccess('Your order has been placed!');

            // -----------------------------------------------------
            // SECTION 5: RESET STATE
            // -----------------------------------------------------

            // Navigate back to Home to ensure clean state for next iteration
            cy.contains('a', 'Continue').click(); 
            cy.url().should('not.include', 'checkout'); 
        });
    }
});