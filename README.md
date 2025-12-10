# ROBIN - Dealer Management System (DMS) App Design

## Latar Belakang

Proyek ini merupakan bagian dari "Project ROBIN - Dealer Management System App Design Challenge" dengan tujuan untuk merancang serangkaian antarmuka pengguna (User Interface) baru untuk aplikasi Dealer Management System (DMS) yang diberi nama ROBIN.

Aplikasi ROBIN DMS dirancang untuk menggantikan sistem DMS yang sudah ada/lama pada salah satu bisnis di industri Otomotif yang berfokus pada aktivitas Dealer. Sistem ini akan mendukung proses inti seperti penjualan (sales), layanan (service), suku cadang (spare parts), dan CRM (Customer Relationship Management).

## Tujuan Desain Utama:

- Menciptakan desain UI untuk aplikasi web responsif (fokus pada Desktop/Web).

- Menghasilkan 7 layar Desktop/Web yang unik, intuitif, mudah digunakan, dan memiliki hierarki visual yang baik.

- Menetapkan base design template untuk aplikasi ROBIN DMS baru yang akan digunakan sebagai panduan desain untuk layar-layar selanjutnya di masa mendatang.

## Target Pengguna

Aplikasi ROBIN DMS dirancang untuk digunakan oleh berbagai peran di dalam operasional dealer, antara lain:

- DMS Admin

- DMS Business User

- Dealer Normal User

- Dealer Admin User

## Daftar Halaman

Total terdapat 7 layar unik yang perlu dirancang dalam proyek ini, mencakup fitur-fitur penting dari aplikasi DMS baru:

| No.    | Nama Halaman / Fitur                            | Deskripsi Singkat                                                                                                                                               |
| :----- | :---------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **01** | **Login Screen**                                | Layar untuk login dengan validasi username dan password, serta fitur Forgot Password dan penanganan locked account.                                             |
| **02** | **DMS Home Screen**                             | Halaman utama yang menampilkan dashboard kaya fitur, widget, menu navigasi berdasarkan modul, action item, informasi, dan fasilitas pencarian/favorit menu.     |
| **03** | **Terms and Conditions - Dealer Branch Screen** | Layar untuk Dealer mendefinisikan Terms & Conditions spesifik cabang yang akan dicetak pada dokumen yang menghadap pelanggan, selain T&C dari Manufaktur.       |
| **04** | **Manufacturer Hierarchy Screen**               | Layar yang memungkinkan Application Administrator untuk membangun dan melihat hierarki Manufaktur dalam tampilan tree yang terstruktur.                         |
| **05** | **Customer Master Screen**                      | Layar untuk membuat, memelihara, dan melihat detail pelanggan (360 degree view) yang memiliki ID unik di seluruh jaringan DMS.                                  |
| **06** | **Material Receipt Note (MRN) Screen**          | Layar untuk mencatat penerimaan material/suku cadang yang dikirim ke dealer (terhadap Purchase Invoice No. atau Local PO), serta menambah stok ke Dealer Stock. |
| **07** | **User Management**                             | Layar untuk mengatur dan menambahkan pengguna ROBIN.                                                                                                            |

## Memulai Proyek

### 1. Prasyarat

Pastikan Anda telah menginstal Node.js (disarankan versi LTS) dan npm (atau yarn/pnpm) di sistem Anda.

### 2. Instalasi Dependensi

Kloning repositori proyek dan instal semua dependensi yang diperlukan:

```bash
# Kloning repositori (ganti dengan link repositori Anda)
git clone https://github.com/iamalexhere/robin-dms.git
cd project-robin-dms

# Instal dependensi menggunakan npm
npm install -g pnpm@latest-10
```

### 3. Mode Pengembangan (Development)

Jalankan server pengembangan lokal dengan fitur Hot Module Replacement (HMR) untuk kemudahan live-reloading saat Anda melakukan perubahan pada kode:

```bash
pnpm dev
```

Aplikasi akan tersedia dan dapat diakses melalui browser Anda pada alamat berikut: `http://localhost:5173`.

## 4. Produksi (Building for Production)

Untuk membuat build statis yang siap di-deploy ke lingkungan produksi, jalankan perintah build:

```bash
pnpm build
```

Hasil build yang telah dioptimalkan akan tersimpan dalam direktori dist. File ini siap untuk di-hosting di server manapun.

⚠️ Catatan Penting Penerapan (Final Submission)

Perintah npm run build ini harus dijalankan hanya ketika desain dan fungsionalitas sudah final dan siap untuk diserahkan sebagai source file akhir proyek. Pastikan semua persyaratan desain dan feedback telah dipenuhi sepenuhnya sebelum melakukan build dan penyerahan akhir.
