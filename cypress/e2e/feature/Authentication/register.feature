Feature: Registrasi Pengguna Baru

  Scenario: Registrasi Berhasil dengan Data Unik
    Given pengguna berada di halaman registrasi
    When pengguna mengisi form registrasi dengan data valid
    And pengguna menyetujui kebijakan privasi
    And pengguna menekan tombol continue registrasi
    Then pengguna akan melihat judul halaman "Your Account Has Been Created!"

  Scenario: Registrasi Gagal Tanpa Kebijakan Privasi
    Given pengguna berada di halaman registrasi
    When pengguna mengisi form registrasi dengan data valid
    # Sengaja tidak menyetujui privasi
    And pengguna menekan tombol continue registrasi
    Then pengguna akan melihat pesan error privasi "Warning: You must agree to the Privacy Policy!"