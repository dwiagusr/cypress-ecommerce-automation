@ShopCategoryListView
Feature: Mobile Sub-Category Listing Verification

  Scenario Outline: Verify Mobile Brands Exist in Mega Menu
    Given I am on the home page
    When I hover over the "Mega Menu" menu
    Then I should see the "<brand>" option in the list

    Examples:
      | brand   |
      | HTC     |
      | Samsung |
      | Apple   |
      | Xiaomi  |