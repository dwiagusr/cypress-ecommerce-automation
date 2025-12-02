@ShopCategoryListView
Feature: Mobile Sub-Category Listing Verification

  # Kita TIDAK perlu BACKGROUND LOGIN karena menu ini terlihat oleh semua user

  Scenario Outline: Verify Mobile Brands Exist in Mega Menu
    Given I am on the home page
    When I hover over the "Mega Menu" menu
    Then I should see the "<phoneBrand>" sub-category link

    Examples:
      | phoneBrand |
      | HTC        |
      | Apple      |
      | LG         |
      | Samsung    |
      | Nokia      |
      | Xiomi      |