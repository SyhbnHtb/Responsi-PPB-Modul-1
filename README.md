REST API Cuci Sepatu — Responsi PPB Modul 1

Proyek ini merupakan hasil implementasi REST API menggunakan framework Express.js serta layanan Supabase sebagai basis data untuk mengelola informasi pesanan cuci sepatu.
Aplikasi ini dikembangkan sebagai bagian dari Responsi Praktikum Pemrograman Perangkat Bergerak (PPB) Modul 1.

REST API ini dibuat untuk menangani proses pengelolaan data pesanan laundry sepatu, mulai dari penambahan data pesanan baru, pembaruan status pencucian, hingga penghapusan data yang sudah tidak diperlukan.
Seluruh data tersimpan pada database Supabase yang berfungsi sebagai layanan backend.
API ini juga telah dideploy ke Vercel, sehingga dapat diakses secara online oleh pengguna.

Tujuan
-Mengembangkan REST API sederhana menggunakan Express.js.
-Menghubungkan sistem backend dengan database Supabase.
-Menerapkan operasi dasar CRUD (Create, Read, Update, Delete) pada data pesanan.
-Melakukan deployment agar API dapat diakses secara publik.

Fitur Utama
-Menampilkan seluruh pesanan: Mengambil semua data pesanan dari tabel.
-Menambahkan pesanan baru: Menyimpan data pesanan pelanggan ke dalam Supabase.
-Memperbarui status pesanan: Mengubah status pencucian (Menunggu, Sedang Dicuci, atau Selesai).
-Menghapus pesanan: Menghapus data berdasarkan ID pesanan.
-Format JSON yang rapi: Semua data ditampilkan dalam format JSON yang mudah dibaca dan terstruktur.

Struktur Tabel
-Tabel ini memiliki kolom id dengan tipe data UUID sebagai primary key dan nilai default dihasilkan secara otomatis menggunakan fungsi gen_random_uuid().
-Kolom nama_pelanggan bertipe text dan wajib diisi (not null), sedangkan nomor_telepon bersifat opsional.
-Kolom nama_sepatu juga bertipe text dan wajib diisi.
-Bagian tipe_layanan bertipe text dengan pembatasan nilai (constraint) hanya dapat diisi salah satu dari empat opsi: ‘Quick Clean’, ‘Deep Clean’, ‘Repaint’, atau ‘Unyellowing’.
-Selanjutnya, kolom status memiliki nilai default ‘Menunggu’ dan hanya dapat berisi ‘Menunggu’, ‘Sedang Dicuci’, atau ‘Selesai’.
-Kolom tanggal_masuk diatur otomatis menggunakan tanggal saat data dimasukkan (current_date), sedangkan tanggal_selesai bersifat opsional.
-Terakhir, kolom harga bertipe numeric(12,2) dengan nilai awal (default) sebesar 0.

Contoh Penggunaan API

GET – Menampilkan Semua Pesanan
Endpoint GET /api/orders digunakan untuk menampilkan seluruh data pesanan yang tersimpan di database.
{
    "id": "1bcf77ab-3f88-4bb5-9931-2762bda29d4e",
    "nama_pelanggan": "Hatub",
    "nomor_telepon": "081234567",
    "nama_sepatu": "Nike Air Jordan",
    "tipe_layanan": "Deep Clean",
    "status": "Menunggu",
    "tanggal_masuk": "2025-10-23",
    "tanggal_selesai": null,
    "harga": 0
}

POST – Menambahkan Pesanan Baru
Endpoint POST /api/orders berfungsi untuk menambah data pesanan baru ke dalam sistem.
Data yang dikirim melalui body request berupa JSON seperti contoh berikut:
{
  "nama_pelanggan": "Hatub",
  "nomor_telepon": "081234567",
  "nama_sepatu": "Nike Air Jordan",
  "tipe_layanan": "Deep Clean",
  "harga": 50000
}

PUT – Memperbarui Status Pesanan
Endpoint PUT /api/orders/:id digunakan untuk mengubah status pesanan berdasarkan ID tertentu.
Contoh body request:
{
  "status": "Selesai"
}

DELETE – Menghapus Pesanan
Endpoint DELETE /api/orders/:id berfungsi untuk menghapus data pesanan tertentu berdasarkan ID.
Contoh hasil response:
{
  "message": "Order dihapus"
}
