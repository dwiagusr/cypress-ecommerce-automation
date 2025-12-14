@CheckoutDDT
Feature: Checkout Data Driven Testing

  Background:
    Given I am on the login page
    When I enter username "test.user.1764607288632@mail.com" and password "Password123!"
    And I click the login button
    Then I should see the "My Account" page

  Scenario: Checkout same product with multiple addresses from Excel
    When I perform checkout loop for product "HTC Touch HD" using data from "dataCheckout.json"