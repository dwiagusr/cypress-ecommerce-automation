@SearchProduct
Feature: Product Search Functionality

  Scenario Outline: User searches for existing products
    Given I am on the home page
    When I search for "<productName>"
    Then I should see the "Search - <productName>" header
    And I should see products related to "<productName>" in the results

    Examples:
      | productName |
      | MacBook     |
      | iPhone      |

  Scenario: User searches for a non-existing product
    Given I am on the home page
    When I search for "KambingGuling"
    Then I should see the error message "There is no product that matches the search criteria."