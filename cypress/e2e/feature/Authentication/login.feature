Feature: Fungsionalitas Login di Website

  Scenario: Login Berhasil dengan Kredensial Valid
    Given pengguna berada di halaman login
    When pengguna memasukkan username "valid_email@mail.com" dan password "yourpassword"
    And pengguna menekan tombol login
    Then pengguna akan melihat pesan error "Warning"