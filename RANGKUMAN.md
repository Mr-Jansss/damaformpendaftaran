# 📚 RANGKUMAN LENGKAP SISTEM OLIMPIADE SAINS FST UNPATTI 2026

## 📋 Daftar Isi
1. [Tentang Sistem](#tentang-sistem)
2. [Teknologi yang Digunakan](#teknologi-yang-digunakan)
3. [Struktur Proyek](#struktur-proyek)
4. [Fitur Utama](#fitur-utama)
5. [Arsitektur Sistem](#arsitektur-sistem)
6. [Database Schema](#database-schema)
7. [API Endpoints](#api-endpoints)
8. [Panduan Instalasi](#panduan-instalasi)
9. [Panduan Penggunaan](#panduan-penggunaan)
10. [Keamanan](#keamanan)

---

## 🎯 Tentang Sistem

**Sistem Olimpiade Sains FST Unpatti 2026** adalah aplikasi web full-stack untuk mengelola pendaftaran dan administrasi kompetisi Olimpiade Sains tingkat SD, SMP, dan SMA di Fakultas Sains dan Teknologi, Universitas Pattimura Ambon.

### Tujuan Sistem
- Memudahkan peserta mendaftar secara online
- Mengelola data peserta secara terpusat
- Mempercepat proses verifikasi dan approval
- Menyediakan dashboard untuk admin dan panitia
- Menampilkan daftar peserta terkonfirmasi secara real-time

---

## 💻 Teknologi yang Digunakan

### Frontend
- **HTML5** - Struktur halaman web
- **CSS3 Murni** - Styling tanpa framework (no Tailwind, no Bootstrap)
- **JavaScript Vanilla** - Interaktivitas tanpa library eksternal
- **Chart.js** - Visualisasi data statistik
- **Responsive Design** - Mobile-friendly

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MySQL** - Database relational
- **Sequelize ORM** - Object-Relational Mapping
- **bcrypt** - Password hashing
- **JWT (jsonwebtoken)** - Authentication token
- **Multer** - File upload handling
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variables

### Tools & Utilities
- **Git** - Version control
- **npm** - Package manager
- **Nodemon** - Auto-restart development server

---

## 📁 Struktur Proyek

```
olimpiade-sains-fst-unpatti/
│
├── backend/                      # Backend Node.js + Express
│   ├── config/
│   │   └── database.js          # Konfigurasi database
│   ├── controllers/
│   │   ├── adminController.js   # Logic admin
│   │   ├── authController.js    # Logic authentication
│   │   └── pesertaController.js # Logic peserta
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication
│   │   └── upload.js            # Multer file upload
│   ├── routes/
│   │   ├── adminRoutes.js       # Routes admin
│   │   ├── authRoutes.js        # Routes auth
│   │   └── pesertaRoutes.js     # Routes peserta
│   ├── scripts/
│   │   ├── fix-passwords.js     # Script fix password
│   │   └── seed.js              # Seeding data
│   ├── uploads/                 # Folder upload file
│   ├── .env                     # Environment variables
│   ├── .env.example             # Template .env
│   ├── package.json             # Dependencies backend
│   └── server.js                # Entry point backend
│
├── database/                     # SQL Scripts
│   ├── schema.sql               # Database schema
│   └── seed.sql                 # Data awal
│
├── frontend/                     # Frontend HTML/CSS/JS
│   ├── css/
│   │   └── styles.css           # CSS murni custom
│   ├── imageHero/               # Gambar hero & logo
│   │   ├── hero1.jpg
│   │   ├── hero2.jpg
│   │   ├── hero3.jpg
│   │   ├── logounpatti.png
│   │   ├── logofst.png
│   │   └── logogmaps.png
│   ├── js/
│   │   ├── admin-dashboard.js   # Logic dashboard admin
│   │   ├── chart.min.js         # Chart.js library
│   │   ├── config.js            # API config
│   │   ├── landing.js           # Logic landing page
│   │   ├── login.js             # Logic login
│   │   └── panitia-dashboard.js # Logic dashboard panitia
│   ├── admin-dashboard.html     # Dashboard admin
│   ├── index.html               # Landing page
│   ├── login.html               # Halaman login
│   └── panitia-dashboard.html   # Dashboard panitia
│
├── package.json                  # Dependencies root
├── start-backend.bat             # Script start backend (Windows)
├── RANGKUMAN.md                  # Dokumentasi lengkap (file ini)
└── README.md                     # Ringkasan proyek

```

---

## ✨ Fitur Utama

### 1. Landing Page (Public)
- **Hero Section** dengan slideshow gambar HD otomatis
- **Form Pendaftaran** dengan validasi
- **Upload Kartu Pelajar** (JPG, PNG, PDF max 5MB)
- **Daftar Peserta Terkonfirmasi** dengan search
- **Integrasi Google Maps** untuk lokasi event
- **Responsive Design** untuk semua device

### 2. Halaman Login
- **Modern Split Design** dengan gradient orange
- **Icon People** sebagai branding
- **Password Toggle** (show/hide)
- **Error Handling** yang user-friendly
- **Auto-redirect** berdasarkan role (admin/panitia)

### 3. Dashboard Admin
- **Statistik Real-time**: Total peserta, approved, pending, rejected
- **Chart Visualisasi**: Peserta per tingkat & bidang lomba
- **Manajemen Peserta**: View, approve, reject, delete
- **Manajemen Panitia**: CRUD panitia & admin
- **Edit Konten Halaman**: Update teks landing page
- **Export Excel**: Download data peserta approved
- **Filter & Search**: Cari peserta berdasarkan status/nama

### 4. Dashboard Panitia
- **Statistik Pending/Approved/Rejected**
- **Verifikasi Peserta**: Approve/reject pendaftaran
- **View Detail Peserta**: Lihat berkas kartu pelajar
- **Filter & Search**: Kelola peserta efisien

---

## 🏗️ Arsitektur Sistem

### Client-Server Architecture

```
┌─────────────────┐
│   Frontend      │
│  (HTML/CSS/JS)  │
└────────┬────────┘
         │ HTTP/HTTPS
         │ REST API
         ▼
┌─────────────────┐
│   Backend       │
│  (Node.js +     │
│   Express.js)   │
└────────┬────────┘
         │ SQL Queries
         │ (Sequelize ORM)
         ▼
┌─────────────────┐
│   Database      │
│    (MySQL)      │
└─────────────────┘
```

### Request Flow

1. **User** mengakses frontend (HTML)
2. **JavaScript** mengirim request ke backend API
3. **Backend** memproses request:
   - Validasi input
   - Autentikasi JWT (jika perlu)
   - Query database via Sequelize
4. **Database** mengembalikan data
5. **Backend** mengirim response JSON
6. **Frontend** render data ke UI

---

## 🗄️ Database Schema

### Tabel: `peserta`
Menyimpan data peserta olimpiade

| Field | Type | Description |
|-------|------|-------------|
| id | INT (PK, AI) | ID unik peserta |
| nama | VARCHAR(255) | Nama lengkap |
| asal_sekolah | VARCHAR(255) | Nama sekolah |
| email | VARCHAR(255) | Email peserta |
| no_wa | VARCHAR(20) | Nomor WhatsApp |
| tingkat | ENUM | SD, SMP, SMA |
| bidang_lomba | VARCHAR(100) | Bidang lomba |
| berkas | VARCHAR(255) | Path file kartu pelajar |
| status | ENUM | pending, approved, rejected |
| alasan_reject | TEXT | Alasan jika ditolak |
| createdAt | DATETIME | Waktu daftar |
| updatedAt | DATETIME | Waktu update |

### Tabel: `users`
Menyimpan data admin dan panitia

| Field | Type | Description |
|-------|------|-------------|
| id | INT (PK, AI) | ID unik user |
| username | VARCHAR(50) | Username login |
| password | VARCHAR(255) | Password (hashed) |
| nama_lengkap | VARCHAR(255) | Nama lengkap |
| email | VARCHAR(255) | Email user |
| role | ENUM | admin, panitia |
| createdAt | DATETIME | Waktu dibuat |
| updatedAt | DATETIME | Waktu update |

### Tabel: `konten`
Menyimpan konten dinamis landing page

| Field | Type | Description |
|-------|------|-------------|
| id | INT (PK, AI) | ID unik konten |
| key | VARCHAR(100) | Key identifier |
| value | TEXT | Nilai konten |
| createdAt | DATETIME | Waktu dibuat |
| updatedAt | DATETIME | Waktu update |

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login          # Login admin/panitia
POST   /api/auth/logout         # Logout
GET    /api/auth/me             # Get user info (JWT required)
```

### Peserta (Public)
```
POST   /api/peserta             # Daftar peserta baru
GET    /api/peserta/approved    # Get peserta approved (public)
```

### Peserta (Protected - Admin/Panitia)
```
GET    /api/peserta             # Get all peserta
GET    /api/peserta/:id         # Get detail peserta
PUT    /api/peserta/:id/approve # Approve peserta
PUT    /api/peserta/:id/reject  # Reject peserta
DELETE /api/peserta/:id         # Delete peserta
```

### Admin Only
```
GET    /api/admin/stats         # Get statistik dashboard
GET    /api/admin/panitia       # Get all panitia
POST   /api/admin/panitia       # Tambah panitia
PUT    /api/admin/panitia/:id   # Update panitia
DELETE /api/admin/panitia/:id   # Delete panitia
GET    /api/admin/konten        # Get konten landing page
PUT    /api/admin/konten        # Update konten
GET    /api/admin/export        # Export Excel peserta
```

### Response Format
**Success:**
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🚀 Panduan Instalasi

### Prerequisites
- Node.js v14+ dan npm
- MySQL 5.7+ atau MariaDB
- Git (optional)

### Langkah Instalasi

#### 1. Clone/Download Project
```bash
git clone <repository-url>
cd olimpiade-sains-fst-unpatti
```

#### 2. Setup Database
```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE olimpiade_sains;

# Import schema
mysql -u root -p olimpiade_sains < database/schema.sql

# Import data awal (optional)
mysql -u root -p olimpiade_sains < database/seed.sql
```

#### 3. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Copy .env.example ke .env
copy .env.example .env

# Edit .env sesuai konfigurasi
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=olimpiade_sains
# JWT_SECRET=your_secret_key
# PORT=5000
```

#### 4. Jalankan Backend
```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

Backend akan berjalan di `http://localhost:5000`

#### 5. Setup Frontend
```bash
# Buka folder frontend
cd ../frontend

# Edit js/config.js jika perlu
# const API_URL = 'http://localhost:5000/api';
```

#### 6. Jalankan Frontend
- Buka `frontend/index.html` di browser
- Atau gunakan Live Server (VS Code extension)
- Atau gunakan http-server: `npx http-server frontend -p 3000`

Frontend akan berjalan di `http://localhost:3000` (atau port lain)

---

## 📖 Panduan Penggunaan

### Untuk Peserta

1. **Buka Landing Page** (`index.html`)
2. **Isi Form Pendaftaran**:
   - Nama lengkap
   - Asal sekolah
   - Email
   - Nomor WhatsApp
   - Tingkat (SD/SMP/SMA)
   - Bidang lomba (sesuai tingkat)
   - Upload kartu pelajar
3. **Klik "Daftar Sekarang"**
4. **Tunggu Verifikasi** dari panitia
5. **Cek Status** di tabel "Peserta Terkonfirmasi"

### Untuk Panitia

1. **Login** di `/login.html`
   - Username: `panitia1`
   - Password: `panitia123` (default)
2. **Dashboard Panitia**:
   - Lihat statistik pending/approved/rejected
   - Filter peserta berdasarkan status
   - Klik "Lihat Detail" untuk verifikasi
   - Approve atau Reject peserta
3. **Logout** setelah selesai

### Untuk Admin

1. **Login** di `/login.html`
   - Username: `admin`
   - Password: `admin123` (default)
2. **Dashboard Admin**:
   - **Tab Dashboard**: Lihat statistik & chart
   - **Tab Manajemen Peserta**: Kelola semua peserta
   - **Tab Manajemen Panitia**: CRUD panitia/admin
   - **Tab Konten Halaman**: Edit teks landing page
3. **Export Data**: Klik "Export ke Excel" untuk download
4. **Logout** setelah selesai

---

## 🔒 Keamanan

### Implementasi Keamanan

1. **Password Hashing**
   - Menggunakan bcrypt dengan salt rounds 10
   - Password tidak disimpan plain text

2. **JWT Authentication**
   - Token expire dalam 24 jam
   - Token disimpan di localStorage
   - Middleware auth untuk protected routes

3. **Input Validation**
   - Validasi di frontend (HTML5 + JS)
   - Validasi di backend (Express validator)
   - Sanitasi input untuk mencegah SQL injection

4. **File Upload Security**
   - Validasi tipe file (image/pdf only)
   - Validasi ukuran file (max 5MB)
   - Rename file dengan timestamp
   - Folder upload di luar public access

5. **CORS Configuration**
   - Whitelist origin yang diizinkan
   - Credentials allowed untuk cookie/auth

6. **Environment Variables**
   - Sensitive data di .env
   - .env tidak di-commit ke Git

### Best Practices

- **Ganti Password Default** setelah instalasi
- **Gunakan HTTPS** di production
- **Backup Database** secara berkala
- **Update Dependencies** untuk security patches
- **Limit Login Attempts** (implementasi rate limiting)
- **Log Activity** untuk audit trail

---

## 📊 Bidang Lomba per Tingkat

### SD (Sekolah Dasar)
- Matematika
- IPA (Ilmu Pengetahuan Alam)

### SMP (Sekolah Menengah Pertama)
- Matematika
- Fisika
- Biologi
- Kimia

### SMA (Sekolah Menengah Atas)
- Matematika
- Fisika
- Kimia
- Biologi
- Komputer
- Astronomi
- Ekonomi
- Geografi

---

## 🎨 Design System

### Color Palette
- **Primary Orange**: `#FF6B00`
- **Primary Dark**: `#FF8C00`
- **Dark**: `#1A1A1A`
- **White**: `#FFFFFF`
- **Gray Scale**: `#F9FAFB` - `#1F2937`
- **Success Green**: `#10B981`
- **Warning Yellow**: `#F59E0B`
- **Danger Red**: `#EF4444`
- **Info Blue**: `#3B82F6`

### Typography
- **Font Family**: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto
- **Font Weights**: 400 (regular), 600 (semi-bold), 700 (bold), 800 (extra-bold)

### Components
- **Buttons**: Rounded 0.5rem, gradient background, shadow on hover
- **Cards**: Rounded 1rem, shadow, hover lift effect
- **Inputs**: Rounded 0.5rem, border focus effect
- **Badges**: Rounded full, color-coded by status
- **Modal**: Overlay with backdrop blur

---

## 🐛 Troubleshooting

### Backend tidak bisa start
- Cek apakah MySQL sudah running
- Cek kredensial database di `.env`
- Cek port 5000 tidak digunakan aplikasi lain
- Jalankan `npm install` ulang

### Frontend tidak bisa fetch data
- Cek backend sudah running
- Cek `API_URL` di `js/config.js`
- Cek CORS configuration di backend
- Buka browser console untuk error detail

### Login gagal
- Cek username/password benar
- Cek database tabel `users` ada data
- Jalankan `node scripts/seed.js` untuk reset data
- Cek JWT_SECRET di `.env`

### Upload file gagal
- Cek folder `backend/uploads` ada dan writable
- Cek ukuran file < 5MB
- Cek format file (jpg, png, pdf)
- Cek permission folder uploads

---

## 📝 Changelog

### Version 1.0.0 (2026)
- ✅ Landing page dengan hero slideshow
- ✅ Form pendaftaran peserta
- ✅ Upload kartu pelajar
- ✅ Dashboard admin lengkap
- ✅ Dashboard panitia
- ✅ Manajemen peserta (CRUD)
- ✅ Manajemen panitia (CRUD)
- ✅ Edit konten dinamis
- ✅ Export Excel
- ✅ Chart statistik
- ✅ Authentication JWT
- ✅ Responsive design
- ✅ Modern login page
- ✅ Google Maps integration

---

## 👥 Tim Pengembang

**Fakultas Sains dan Teknologi**  
**Universitas Pattimura Ambon**

---

## 📞 Kontak

**Email**: info@olimpiade.com  
**WhatsApp**: +62 812-3456-7890  
**Lokasi**: Jl. Ir. M. Putuhena, Poka, Kec. Tlk. Ambon, Kota Ambon, Maluku

---

## 📄 Lisensi

© 2026 Olimpiade Sains FST Unpatti. All rights reserved.

---

**Terakhir diupdate**: 2026
