@ShopCategory
Feature: Shop Category Navigation

  Background: Login to Application
    Given I am on the login page
    When I enter username "test.user.1764607288632@mail.com" and password "Password123!"
    And I click the login button
    Then I should see the "My Account" page

  # Ubah 'Scenario' menjadi 'Scenario Outline'
  Scenario Outline: Browse Mobile Brands via Mega Menu
    # Gunakan tanda kurung siku <...> sebagai variabel
    When I hover over the "Mega Menu" menu
    And I select the "<phoneBrand>" sub-category
    Then I should see the "<phoneBrand>" product list header

    # Di sinilah kita melist data yang ingin dites
    Examples:
      | phoneBrand |
      | HTC        |
      | Apple      |
      | LG         |
      | Samsung    |
      | Nokia      |
      | Xiomi      |