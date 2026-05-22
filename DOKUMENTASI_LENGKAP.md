# 📚 DOKUMENTASI SISTEM INFORMASI PENDAFTARAN OLIMPIADE SAINS

## 🎯 Deskripsi Sistem

Sistem Informasi Pendaftaran Olimpiade Sains adalah aplikasi web full-stack untuk mengelola pendaftaran peserta olimpiade sains tingkat SD, SMP, dan SMA. Sistem ini dilengkapi dengan:

- ✅ Form pendaftaran publik dengan upload berkas
- ✅ Dashboard Admin dengan grafik statistik (Chart.js)
- ✅ Dashboard Panitia untuk validasi peserta
- ✅ Manajemen user (Admin & Panitia)
- ✅ Export data ke Excel
- ✅ Autentikasi JWT & Session
- ✅ UI/UX Premium dengan Tailwind CSS

---

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** v16+ dengan **Express.js**
- **MySQL 8** (Database)
- **mysql2** (MySQL Driver)
- **bcrypt** (Password Hashing)
- **jsonwebtoken** (JWT Authentication)
- **express-session** (Session Management)
- **multer** (File Upload)
- **exceljs** (Export Excel)
- **helmet** (Security)
- **cors** (Cross-Origin Resource Sharing)

### Frontend
- **HTML5**
- **Tailwind CSS** (via CDN)
- **Vanilla JavaScript**
- **Chart.js** (Grafik Statistik)
- **Font Awesome** (Icons)

---

## 📁 Struktur Folder

```
olimpiade-sains/
├── backend/
│   ├── config/
│   │   └── database.js          # Konfigurasi koneksi MySQL
│   ├── controllers/
│   │   ├── authController.js    # Controller autentikasi
│   │   ├── pesertaController.js # Controller peserta
│   │   └── adminController.js   # Controller admin
│   ├── middleware/
│   │   ├── auth.js              # Middleware autentikasi JWT
│   │   └── upload.js            # Middleware upload file
│   ├── routes/
│   │   ├── authRoutes.js        # Routes autentikasi
│   │   ├── pesertaRoutes.js     # Routes peserta
│   │   └── adminRoutes.js       # Routes admin
│   ├── scripts/
│   │   └── seed.js              # Script seeding database
│   ├── uploads/                 # Folder upload berkas (auto-created)
│   ├── .env                     # Environment variables
│   ├── .env.example             # Template environment variables
│   ├── package.json             # Dependencies backend
│   └── server.js                # Entry point backend
├── database/
│   ├── schema.sql               # DDL skema database
│   └── seed.sql                 # Data awal (seeding)
├── frontend/
│   ├── js/
│   │   ├── config.js            # Konfigurasi API & helper functions
│   │   ├── landing.js           # JavaScript landing page
│   │   ├── login.js             # JavaScript login page
│   │   ├── admin-dashboard.js   # JavaScript dashboard admin
│   │   └── panitia-dashboard.js # JavaScript dashboard panitia
│   ├── index.html               # Landing page (public)
│   ├── login.html               # Halaman login
│   ├── admin-dashboard.html     # Dashboard admin
│   └── panitia-dashboard.html   # Dashboard panitia
└── DOKUMENTASI_LENGKAP.md       # File ini
```

---

## 🚀 Cara Instalasi & Menjalankan

### 1️⃣ Persiapan Database

#### A. Install MySQL 8
Pastikan MySQL 8 sudah terinstall di komputer Anda.

#### B. Buat Database
```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE olimpiade_sains CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### C. Import Skema Database
```bash
# Dari terminal/command prompt
mysql -u root -p olimpiade_sains < database/schema.sql

# Atau dari MySQL CLI
USE olimpiade_sains;
SOURCE database/schema.sql;
```

---

### 2️⃣ Setup Backend

#### A. Install Dependencies
```bash
cd backend
npm install
```

#### B. Konfigurasi Environment Variables
File `.env` sudah dibuat. Sesuaikan dengan konfigurasi MySQL Anda:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=olimpiade_sains
DB_PORT=3306

PORT=3000
NODE_ENV=development

JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key

UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880

CORS_ORIGIN=http://localhost:5173
```

#### C. Seeding Data Awal (User Admin & Panitia)
```bash
npm run seed
```

**Kredensial Default:**
- **Admin**: `admin` / `admin123`
- **Panitia**: `panitia1` / `panitia123`

#### D. Jalankan Server Backend
```bash
# Development mode (dengan nodemon)
npm run dev

# Production mode
npm start
```

Server akan berjalan di: **http://localhost:3000**

---

### 3️⃣ Setup Frontend

#### A. Jalankan Frontend dengan Live Server

**Opsi 1: Menggunakan VS Code Live Server**
1. Install extension "Live Server" di VS Code
2. Buka file `frontend/index.html`
3. Klik kanan → "Open with Live Server"

**Opsi 2: Menggunakan Python HTTP Server**
```bash
cd frontend
python -m http.server 5173
```

**Opsi 3: Menggunakan Node.js HTTP Server**
```bash
# Install http-server globally
npm install -g http-server

# Jalankan di folder frontend
cd frontend
http-server -p 5173
```

Frontend akan berjalan di: **http://localhost:5173**

---

## 🔐 Akun Default

Setelah seeding, Anda dapat login dengan akun berikut:

| Role    | Username  | Password    | Akses                                    |
|---------|-----------|-------------|------------------------------------------|
| Admin   | admin     | admin123    | Full access (CRUD semua data + grafik)   |
| Panitia | panitia1  | panitia123  | Hanya manajemen peserta (validasi)       |

---

## 📋 Fitur-Fitur Sistem

### 🌐 Halaman Publik (Landing Page)
- ✅ Form pendaftaran peserta
- ✅ Upload kartu pelajar (JPG, PNG, PDF)
- ✅ Dropdown bidang lomba dinamis berdasarkan tingkat
- ✅ Tabel peserta terkonfirmasi (approved)
- ✅ Fitur search peserta

### 🔑 Autentikasi
- ✅ Login dengan JWT Token
- ✅ Session management
- ✅ Password hashing dengan bcrypt
- ✅ Role-based access control (Admin & Panitia)

### 👨‍💼 Dashboard Admin
- ✅ **Statistik Dashboard**
  - Total peserta (pending, approved, rejected)
  - Grafik peserta per tingkat (Bar Chart)
  - Grafik peserta per bidang lomba (Doughnut Chart)
- ✅ **Manajemen Peserta**
  - View semua peserta
  - Filter by status
  - Search peserta
  - Approve/Reject dengan alasan
  - Delete peserta
  - View detail & berkas upload
- ✅ **Manajemen Panitia**
  - Create user panitia/admin
  - Edit user
  - Delete user
  - Manage role
- ✅ **Manajemen Konten**
  - Edit konten halaman depan
  - Update pengumuman
  - Update info kontak
- ✅ **Export Data**
  - Export peserta approved ke Excel

### 👥 Dashboard Panitia
- ✅ View daftar peserta
- ✅ Filter by status
- ✅ Search peserta
- ✅ View detail peserta & berkas
- ✅ Approve peserta
- ✅ Reject peserta dengan alasan (WAJIB)

---

## 🎨 Desain UI/UX

### Palet Warna
- **Primary**: Orange `#FF6B00`
- **Background**: White `#FFFFFF`
- **Text**: Charcoal `#1A1A1A`
- **Success**: Green `#10B981`
- **Warning**: Yellow `#F59E0B`
- **Danger**: Red `#EF4444`

### Responsiveness
- ✅ Mobile-first design
- ✅ Tablet optimized
- ✅ Desktop optimized
- ✅ Smooth animations & transitions

---

## 🔒 Keamanan

### Implementasi Keamanan
- ✅ **SQL Injection Prevention**: Menggunakan prepared statements (mysql2)
- ✅ **Password Hashing**: bcrypt dengan salt rounds 10
- ✅ **JWT Authentication**: Token expires dalam 24 jam
- ✅ **CORS Protection**: Whitelist origin
- ✅ **Helmet.js**: Security headers
- ✅ **Rate Limiting**: Max 100 requests per 15 menit
- ✅ **File Upload Validation**: 
  - Hanya JPG, PNG, PDF
  - Max size 5MB
  - Unique filename dengan timestamp
- ✅ **Input Validation**: Server-side validation
- ✅ **XSS Protection**: Sanitize input

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login          # Login
POST   /api/auth/logout         # Logout
GET    /api/auth/me             # Get current user
```

### Peserta (Public & Protected)
```
POST   /api/peserta/daftar      # Daftar peserta (public)
GET    /api/peserta/approved    # Get peserta approved (public)
GET    /api/peserta             # Get all peserta (protected)
GET    /api/peserta/:id         # Get peserta by ID (protected)
PUT    /api/peserta/:id/status  # Update status peserta (protected)
DELETE /api/peserta/:id         # Delete peserta (admin only)
GET    /api/peserta/statistik   # Get statistik (admin only)
```

### Admin (Admin Only)
```
GET    /api/admin/users         # Get all users
POST   /api/admin/users         # Create user
PUT    /api/admin/users/:id     # Update user
DELETE /api/admin/users/:id     # Delete user
GET    /api/admin/konten        # Get konten halaman
PUT    /api/admin/konten        # Update konten halaman
GET    /api/admin/export/peserta # Export peserta to Excel
```

---

## 🧪 Testing

### Test Manual

#### 1. Test Pendaftaran Peserta
1. Buka `http://localhost:5173`
2. Isi form pendaftaran
3. Upload kartu pelajar
4. Submit form
5. Cek notifikasi sukses

#### 2. Test Login Admin
1. Buka `http://localhost:5173/login.html`
2. Login dengan `admin` / `admin123`
3. Redirect ke dashboard admin
4. Cek grafik statistik muncul

#### 3. Test Validasi Peserta (Panitia)
1. Login dengan `panitia1` / `panitia123`
2. Klik peserta pending
3. View detail & berkas
4. Approve atau Reject
5. Cek status berubah

#### 4. Test Export Excel (Admin)
1. Login sebagai admin
2. Klik tombol "Export Peserta Approved"
3. File Excel akan terdownload

---

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
**Solusi:**
- Pastikan MySQL service berjalan
- Cek kredensial di file `.env`
- Cek port MySQL (default 3306)

### Error: "CORS policy blocked"
**Solusi:**
- Pastikan `CORS_ORIGIN` di `.env` sesuai dengan URL frontend
- Restart backend server

### Error: "File upload failed"
**Solusi:**
- Pastikan folder `uploads` ada di backend
- Cek permission folder (read/write)
- Cek ukuran file (max 5MB)

### Error: "Token expired"
**Solusi:**
- Logout dan login kembali
- Token JWT expires setelah 24 jam

---

## 📝 Catatan Penting

### Untuk Development
- Gunakan `npm run dev` untuk auto-restart server
- Buka browser console untuk debug JavaScript
- Cek network tab untuk debug API calls

### Untuk Production
1. **Ganti Secret Keys** di `.env`:
   - `JWT_SECRET`
   - `SESSION_SECRET`
2. **Set NODE_ENV** ke `production`
3. **Enable HTTPS**
4. **Setup Reverse Proxy** (Nginx/Apache)
5. **Enable Database Backup**
6. **Setup Monitoring** (PM2, New Relic, dll)

---

## 🎓 Aturan Bisnis

### Bidang Lomba per Tingkat
- **SD**: Matematika, IPA
- **SMP**: Matematika, Biologi
- **SMA**: Matematika, Biologi, Fisika, Astronomi, Kimia, Ilmu Komputer, Statistika

### Status Peserta
- **Pending**: Baru mendaftar, menunggu validasi
- **Approved**: Disetujui panitia/admin
- **Rejected**: Ditolak dengan alasan

### Role & Permission
| Fitur                    | Admin | Panitia |
|--------------------------|-------|---------|
| View Dashboard Statistik | ✅    | ❌      |
| Manage Peserta           | ✅    | ✅      |
| Approve/Reject Peserta   | ✅    | ✅      |
| Delete Peserta           | ✅    | ❌      |
| Manage User/Panitia      | ✅    | ❌      |
| Edit Konten Halaman      | ✅    | ❌      |
| Export Excel             | ✅    | ❌      |

---

## 📞 Support

Jika ada pertanyaan atau issue, silakan hubungi:
- Email: info@olimpiade.com
- WhatsApp: +62 812-3456-7890

---

## 📄 Lisensi

MIT License - Free to use for educational purposes.

---

## ✅ Checklist Implementasi

- [x] Database schema & seeding
- [x] Backend API (Express.js + MySQL)
- [x] Authentication (JWT + Session)
- [x] File upload (Multer)
- [x] Frontend Landing Page
- [x] Frontend Login Page
- [x] Frontend Admin Dashboard
- [x] Frontend Panitia Dashboard
- [x] Chart.js integration
- [x] Excel export
- [x] Security (bcrypt, helmet, rate limit)
- [x] Responsive design (Tailwind CSS)
- [x] CRUD operations
- [x] Role-based access control
- [x] Search & filter features
- [x] Dokumentasi lengkap

---

**🎉 Sistem Siap Digunakan!**

Selamat menggunakan Sistem Informasi Pendaftaran Olimpiade Sains. Semoga sukses! 🚀
