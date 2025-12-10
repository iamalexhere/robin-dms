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
| **07** | **Repair Order Search Screen**                  | Layar untuk mencari dan melihat detail Repair Order berdasarkan rentang tanggal atau spesifik kendaraan (Registration Number/Chassis Number/Customer ID).       |

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
