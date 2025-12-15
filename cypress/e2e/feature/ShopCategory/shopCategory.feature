Feature: Mega Menu Content Verification

  Background:
    Given I am on the home page

  Scenario Outline: Verify Brand Spelling in Mega Menu
    When I hover over the "Mega Menu" menu
    Then I should see the "<brand>" option in the list

    Examples:
      | brand   |
      | HTC     |
      | Samsung |
      | Apple   |
      | Xiaomi  |