@Checkout
Feature: Product Purchase Flow

  Background: Login to Application
    Given I am on the login page
    When I enter username "test.user.1764607288632@mail.com" and password "Password123!"
    And I click the login button
    Then I should see the "My Account" page

  Scenario: Successful Checkout for a Product
    # 1. Search for Product
    Given I search for product "HTC Touch HD"
    When I click the search button
    
    # 2. Apply Filter (Availability)
    And I verify for duplicate filter options named "In stock"
    And I select "In stock" from the filter options
    
    # 3. Select Product from Results
    When I select "HTC Touch HD" from the search results
    And I verify the product is in stock
    
    # 4. Add to Cart & Proceed
    When I add the product to the cart
    And I proceed to checkout
    
    # 5. Checkout Process (One Page Checkout)
    # Step: Fill Billing Details
    And I fill the billing details with valid data
    
    # Step: Input Comment & Terms
    And I fill the order comment "QA Automation Portfolio Test" and agree to terms
    
    # [NEW] Step: Verify Order Summary (Product Name, Address, Comment)
    # This ensures data integrity before final confirmation
    Then I verify the order summary details with product "HTC Touch HD" and comment "QA Automation Portfolio Test"
    
    # 6. Final Execution
    When I confirm the order
    
    # 7. Final Verification
    Then I should see the order success message "Your order has been placed!"