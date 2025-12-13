Feature: Checkout Negative Scenarios

  Background:
    # This calls the "Shortcut Step" defined in Scenario B above
    Given I login to the application
    
    # Continue with product search
    And I search for product "HTC Touch HD"
    When I click the search button
    And I verify for duplicate filter options named "In stock"
    And I select "In stock" from the filter options
    When I select "HTC Touch HD" from the search results
    And I verify the product is in stock
    When I add the product to the cart
    And I proceed to checkout

  @Negative @Checkout
  Scenario: Failed checkout when First Name is empty
    When I choose to use a new address
    And I fill the billing details but leave First Name empty
    And I click the continue button in billing details
    Then I should see an error message "First Name must be between 1 and 32 characters!"