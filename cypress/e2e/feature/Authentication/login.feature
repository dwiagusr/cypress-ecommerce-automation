Feature: Fungsionalitas Login di Website

  # Skenario 1: Login Berhasil (User Tetap)
  Scenario: Login Berhasil dengan User Tetap
    Given pengguna berada di halaman login
    When pengguna memasukkan username "test.user.1764607288632@mail.com" dan password "Password123!"
    And pengguna menekan tombol login
    Then pengguna akan melihat halaman My Account

  # Skenario 2: Login Gagal (Bisa tetap disimpan atau dihapus)
  Scenario: Login Gagal dengan Email Salah
    Given pengguna berada di halaman login
    When pengguna memasukkan username "salah@mail.com" dan password "ngawur"
    And pengguna menekan tombol login
    Then pengguna akan melihat pesan error "Warning"