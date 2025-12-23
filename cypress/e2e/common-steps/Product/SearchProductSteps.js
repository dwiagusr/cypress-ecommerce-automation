import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomePage from '@pages/Dashboard/HomePage';

const homePage = new HomePage();

// Note: "Given I am on the home page" is likely reused from CommonSteps or Background.
// If not, you can uncomment the code below:
/*
Given("I am on the home page", () => {
    homePage.visitHomePage();
});
*/

When("I search for {string}", (productName) => {
    homePage.searchProduct(productName);
    homePage.clickSearch();
});

Then("I should see the {string} header", (expectedHeader) => {
    homePage.verifySearchResult(expectedHeader);
});

// This step uses the Loop Logic we added to HomePage
Then("I should see products related to {string} in the results", (keyword) => {
    homePage.verifyProductListContains(keyword);
});

// This step verifies the negative scenario
Then("I should see the error message {string}", (expectedMessage) => {
    homePage.verifyNoProductFoundMessage(expectedMessage);
});