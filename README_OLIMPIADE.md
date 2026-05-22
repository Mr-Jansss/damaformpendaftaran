# 🏆 Sistem Informasi Pendaftaran Olimpiade Sains

Sistem pendaftaran olimpiade sains tingkat SD, SMP, dan SMA dengan fitur lengkap untuk admin dan panitia.

## 🚀 Quick Start

### 1. Setup Database
```bash
mysql -u root -p
CREATE DATABASE olimpiade_sains;
USE olimpiade_sains;
SOURCE database/schema.sql;
```

### 2. Setup Backend
```bash
cd backend
npm install
npm run seed
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
# Buka index.html dengan Live Server atau:
python -m http.server 5173
```

## 🔐 Login Default

| Role    | Username | Password   |
|---------|----------|------------|
| Admin   | admin    | admin123   |
| Panitia | panitia1 | panitia123 |

## 📚 Dokumentasi Lengkap

Lihat file **DOKUMENTASI_LENGKAP.md** untuk:
- Instalasi detail
- API Endpoints
- Troubleshooting
- Security features
- Dan lainnya

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js, MySQL 8
- **Frontend**: HTML5, Tailwind CSS, Vanilla JS
- **Auth**: JWT + bcrypt
- **Charts**: Chart.js
- **Export**: ExcelJS

## ✨ Fitur Utama

- ✅ Form pendaftaran publik dengan upload berkas
- ✅ Dashboard Admin dengan grafik statistik
- ✅ Dashboard Panitia untuk validasi peserta
- ✅ Manajemen user & konten
- ✅ Export data ke Excel
- ✅ UI/UX Premium & Responsive

## 📁 Struktur Folder

```
├── backend/          # Node.js Express API
├── database/         # SQL schema & seeding
├── frontend/         # HTML, CSS, JS
└── DOKUMENTASI_LENGKAP.md
```

## 🎨 Preview

- **Landing Page**: Form pendaftaran + Tabel peserta approved
- **Admin Dashboard**: Statistik, grafik, manajemen lengkap
- **Panitia Dashboard**: Validasi peserta (approve/reject)

---

**Made with ❤️ for Olimpiade Sains Nasional 2026**
