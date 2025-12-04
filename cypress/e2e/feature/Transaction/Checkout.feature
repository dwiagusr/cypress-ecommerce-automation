@Checkout
Feature: Product Purchase Flow

  Background: Login to Application
    Given I am on the login page
    When I enter username "test.user.1764607288632@mail.com" and password "Password123!"
    And I click the login button
    Then I should see the "My Account" page

  Scenario: Successful Checkout for a Product
    # Cari produk dulu (Gunakan logic yang sudah ada di HomePage)
    Given I search for product "HTC Touch HD"
    And I click the search button
    
    # Masuk ke halaman detail produk & Add to Cart
    When I add the product to the cart
    And I proceed to checkout
    
    # Proses Checkout (Isi Alamat & Pembayaran)
    And I fill the billing details with valid data
    And I confirm the delivery method
    And I confirm the payment method
    And I confirm the order
    
    # Verifikasi Akhir
    Then I should see the order success message "Your order has been placed!"