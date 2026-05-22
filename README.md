# 🏆 Sistem Olimpiade Sains FST Unpatti 2026

<div align="center">

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)
![MySQL](https://img.shields.io/badge/mysql-%3E%3D5.7-blue.svg)

**Sistem Manajemen Pendaftaran Olimpiade Sains**  
*Fakultas Sains dan Teknologi - Universitas Pattimura Ambon*

[Demo](#) • [Dokumentasi](RANGKUMAN.md) • [Report Bug](#) • [Request Feature](#)

</div>

---

## 📖 Tentang Proyek

Aplikasi web full-stack untuk mengelola pendaftaran dan administrasi kompetisi **Olimpiade Sains** tingkat SD, SMP, dan SMA di Fakultas Sains dan Teknologi, Universitas Pattimura Ambon.

### ✨ Fitur Utama

- 🎯 **Pendaftaran Online** - Form pendaftaran dengan upload kartu pelajar
- 📊 **Dashboard Admin** - Statistik, chart, dan manajemen lengkap
- ✅ **Verifikasi Peserta** - Approve/reject pendaftaran oleh panitia
- 📈 **Export Excel** - Download data peserta approved
- 🎨 **Modern UI** - Responsive design dengan gradient orange
- 🗺️ **Google Maps** - Integrasi lokasi event
- 🔒 **Secure** - JWT authentication & password hashing

---

## 🚀 Quick Start

### Prerequisites

- Node.js v14+
- MySQL 5.7+
- npm atau yarn

### Instalasi

```bash
# 1. Clone repository
git clone <repository-url>
cd olimpiade-sains-fst-unpatti

# 2. Setup database
mysql -u root -p
CREATE DATABASE olimpiade_sains;
mysql -u root -p olimpiade_sains < database/schema.sql
mysql -u root -p olimpiade_sains < database/seed.sql

# 3. Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env sesuai konfigurasi database Anda

# 4. Jalankan backend
npm run dev
# Backend running di http://localhost:5000

# 5. Buka frontend
# Buka frontend/index.html di browser
# Atau gunakan Live Server
```

### Login Default

**Admin:**
- Username: `admin`
- Password: `admin123`

**Panitia:**
- Username: `panitia1`
- Password: `panitia123`

> ⚠️ **Penting**: Ganti password default setelah instalasi!

---

## 💻 Tech Stack

### Frontend
- HTML5, CSS3 (Pure CSS, no framework)
- JavaScript (Vanilla, no library)
- Chart.js untuk visualisasi

### Backend
- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT Authentication
- Multer (file upload)
- bcrypt (password hashing)

---

## 📁 Struktur Proyek

```
olimpiade-sains-fst-unpatti/
├── backend/              # Backend API (Node.js + Express)
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth & upload middleware
│   ├── routes/          # API routes
│   ├── scripts/         # Utility scripts
│   └── server.js        # Entry point
├── database/            # SQL schema & seed
├── frontend/            # Frontend (HTML/CSS/JS)
│   ├── css/            # Styles
│   ├── js/             # Scripts
│   ├── imageHero/      # Images & logos
│   └── *.html          # Pages
├── RANGKUMAN.md        # Dokumentasi lengkap
└── README.md           # File ini
```

---

## 🎯 Fitur Detail

### Landing Page
- Hero section dengan slideshow otomatis
- Form pendaftaran dengan validasi
- Upload kartu pelajar (JPG, PNG, PDF)
- Daftar peserta terkonfirmasi
- Responsive untuk semua device

### Dashboard Admin
- Statistik real-time (total, approved, pending, rejected)
- Chart peserta per tingkat & bidang lomba
- Manajemen peserta (view, approve, reject, delete)
- Manajemen panitia (CRUD)
- Edit konten landing page
- Export data ke Excel

### Dashboard Panitia
- Statistik pending/approved/rejected
- Verifikasi peserta dengan detail berkas
- Filter & search peserta
- Approve/reject dengan alasan

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login          # Login
POST   /api/auth/logout         # Logout
GET    /api/auth/me             # Get user info
```

### Peserta
```
POST   /api/peserta             # Daftar peserta (public)
GET    /api/peserta/approved    # Get peserta approved (public)
GET    /api/peserta             # Get all peserta (protected)
PUT    /api/peserta/:id/approve # Approve peserta
PUT    /api/peserta/:id/reject  # Reject peserta
DELETE /api/peserta/:id         # Delete peserta
```

### Admin
```
GET    /api/admin/stats         # Statistik dashboard
GET    /api/admin/panitia       # Get all panitia
POST   /api/admin/panitia       # Tambah panitia
PUT    /api/admin/panitia/:id   # Update panitia
DELETE /api/admin/panitia/:id   # Delete panitia
GET    /api/admin/konten        # Get konten
PUT    /api/admin/konten        # Update konten
GET    /api/admin/export        # Export Excel
```

Dokumentasi lengkap API ada di [RANGKUMAN.md](RANGKUMAN.md)

---

## 🎨 Screenshots

### Landing Page
![Landing Page](https://via.placeholder.com/800x400?text=Landing+Page+Screenshot)

### Dashboard Admin
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Dashboard+Screenshot)

### Login Page
![Login](https://via.placeholder.com/800x400?text=Login+Page+Screenshot)

---

## 🔒 Keamanan

- ✅ Password hashing dengan bcrypt
- ✅ JWT authentication
- ✅ Input validation & sanitization
- ✅ File upload validation
- ✅ CORS configuration
- ✅ Environment variables untuk sensitive data

---

## 📚 Dokumentasi

Dokumentasi lengkap tersedia di [RANGKUMAN.md](RANGKUMAN.md) yang mencakup:
- Arsitektur sistem
- Database schema
- API endpoints detail
- Panduan instalasi lengkap
- Panduan penggunaan
- Troubleshooting
- Best practices

---

## 🐛 Troubleshooting

### Backend tidak bisa start
```bash
# Cek MySQL running
# Cek .env configuration
# Install ulang dependencies
npm install
```

### Frontend tidak bisa fetch data
```bash
# Cek backend sudah running
# Cek API_URL di js/config.js
# Cek browser console untuk error
```

### Login gagal
```bash
# Reset data dengan seed
cd backend
node scripts/seed.js
```

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan:

1. Fork repository
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

---

## 📝 Changelog

### v1.0.0 (2026)
- Initial release
- Landing page dengan hero slideshow
- Dashboard admin & panitia
- Authentication system
- CRUD peserta & panitia
- Export Excel
- Chart statistik

---

## 👥 Tim Pengembang

**Fakultas Sains dan Teknologi**  
**Universitas Pattimura Ambon**

---

## 📞 Kontak

- **Email**: info@olimpiade.com
- **WhatsApp**: +62 812-3456-7890
- **Website**: [https://unpatti.ac.id](https://unpatti.ac.id)
- **Lokasi**: Jl. Ir. M. Putuhena, Poka, Ambon, Maluku

---

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🙏 Acknowledgments

- [Chart.js](https://www.chartjs.org/) - Visualisasi data
- [Express.js](https://expressjs.com/) - Web framework
- [Sequelize](https://sequelize.org/) - ORM
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing
- [Multer](https://github.com/expressjs/multer) - File upload

---

<div align="center">

**⭐ Star repository ini jika bermanfaat!**

Made with ❤️ by FST Unpatti

</div>
