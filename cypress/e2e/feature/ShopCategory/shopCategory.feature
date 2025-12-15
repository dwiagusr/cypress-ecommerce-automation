@ShopCategory
Feature: Mega Menu Navigation

  Scenario Outline: Verify Mega Menu Redirects to Correct Brand Page
    Given I am on the home page
    When I hover over the "Mega Menu" menu
    And I select the "<brand>" sub-category
    Then I should see the "<brand>" product list header

    Examples:
      | brand   |
      | LG      |
      | Samsung |
      | Nokia   |
      | HTC     |
      | Apple   |
      | Xiaomi  |