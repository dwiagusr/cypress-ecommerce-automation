@Registration
Feature: User Registration

  Scenario: Successful Registration with Unique Data
    Given I am on the registration page
    When I fill the registration form with valid data
    And I agree to the privacy policy
    And I click the continue button
    Then I should see the page title "Your Account Has Been Created!"

  Scenario: Failed Registration without Privacy Policy
    Given I am on the registration page
    When I fill the registration form with valid data
    # Intentionally skipping privacy policy
    And I click the continue button
    Then I should see a privacy error message "Warning: You must agree to the Privacy Policy!"