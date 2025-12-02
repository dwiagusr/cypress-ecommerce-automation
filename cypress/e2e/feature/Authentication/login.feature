Feature: Login Functionality

  # Scenario 1: Successful Login
  Scenario: Successful Login with Existing User
    Given I am on the login page
    When I enter username "test.user.1764607288632@mail.com" and password "Password123!"
    And I click the login button
    Then I should see the "My Account" page

  # Scenario 2: Failed Login
  Scenario: Failed Login with Incorrect Credentials
    Given I am on the login page
    When I enter username "wrong@mail.com" and password "wrongpass"
    And I click the login button
    Then I should see an error message containing "Warning"