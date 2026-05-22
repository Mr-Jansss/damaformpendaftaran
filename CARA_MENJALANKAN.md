# 🚀 CARA MENJALANKAN SISTEM (1 PORT SAJA)

## ✅ Sistem Sudah Diupdate!

Sekarang **frontend dan backend berjalan di 1 port yang sama (port 3000)**.
Tidak perlu repot jalankan 2 server terpisah!

---

## 📋 Langkah-Langkah

### 1️⃣ Setup Database (Sekali Saja)

```bash
# Login ke MySQL
mysql -u root -p

# Buat database
CREATE DATABASE olimpiade_sains CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Keluar dari MySQL
exit;

# Import schema
mysql -u root -p olimpiade_sains < database/schema.sql
```

**Atau dari MySQL CLI:**
```sql
CREATE DATABASE olimpiade_sains CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE olimpiade_sains;
SOURCE database/schema.sql;
```

---

### 2️⃣ Setup Backend (Sekali Saja)

```bash
cd backend
npm install
```

---

### 3️⃣ Seeding Data Awal (Sekali Saja)

```bash
# Masih di folder backend
npm run seed
```

**Output yang diharapkan:**
```
🌱 Starting database seeding...
👤 Creating users...
✅ Users created
📄 Creating page content...
✅ Page content created
👨‍🎓 Creating sample participants...
✅ Sample participants created
🎉 Seeding completed successfully!

📝 Default credentials:
   Admin    - username: admin     | password: admin123
   Panitia  - username: panitia1  | password: panitia123
```

---

### 4️⃣ Jalankan Server (Setiap Kali Mau Pakai)

```bash
# Masih di folder backend
npm run dev
```

**Output yang diharapkan:**
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Server Olimpiade Sains Running                  ║
║                                                       ║
║   📍 Port: 3000                                       ║
║   🌍 Environment: development                         ║
║   📅 Started at: ...                                  ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝

✅ Database connected successfully
```

---

### 5️⃣ Akses Website di Browser

Buka browser dan akses:

**🏠 Landing Page (Halaman Utama):**
```
http://localhost:3000
```
atau
```
http://localhost:3000/index.html
```

**🔐 Login Page:**
```
http://localhost:3000/login.html
```

**👨‍💼 Dashboard Admin:**
```
http://localhost:3000/admin-dashboard.html
```
(Setelah login sebagai admin)

**👥 Dashboard Panitia:**
```
http://localhost:3000/panitia-dashboard.html
```
(Setelah login sebagai panitia)

---

## 🔐 Kredensial Login Default

| Role    | Username  | Password    |
|---------|-----------|-------------|
| Admin   | admin     | admin123    |
| Panitia | panitia1  | panitia123  |

---

## 🎯 Alur Penggunaan

### Untuk Peserta (Publik):
1. Buka http://localhost:3000
2. Isi form pendaftaran
3. Upload kartu pelajar
4. Submit
5. Tunggu konfirmasi dari panitia

### Untuk Panitia:
1. Buka http://localhost:3000/login.html
2. Login dengan `panitia1` / `panitia123`
3. Lihat daftar peserta pending
4. Klik icon mata untuk lihat detail
5. Approve atau Reject (wajib isi alasan jika reject)

### Untuk Admin:
1. Buka http://localhost:3000/login.html
2. Login dengan `admin` / `admin123`
3. Lihat dashboard dengan grafik statistik
4. Kelola peserta, panitia, dan konten
5. Export data ke Excel

---

## 🛑 Cara Menghentikan Server

Tekan `Ctrl + C` di terminal tempat server berjalan.

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
**Penyebab:** MySQL tidak berjalan atau kredensial salah

**Solusi:**
1. Pastikan MySQL service berjalan
2. Cek file `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=olimpiade_sains
   DB_PORT=3306
   ```
3. Restart server backend

---

### Error: "Port 3000 already in use"
**Penyebab:** Ada aplikasi lain yang menggunakan port 3000

**Solusi:**
1. Matikan aplikasi yang menggunakan port 3000
2. Atau ubah port di `backend/.env`:
   ```env
   PORT=3001
   ```
3. Restart server

---

### Error: "Cannot find module"
**Penyebab:** Dependencies belum terinstall

**Solusi:**
```bash
cd backend
npm install
```

---

### Halaman Tidak Muncul / Blank
**Penyebab:** Server belum berjalan atau URL salah

**Solusi:**
1. Pastikan server backend sudah berjalan (`npm run dev`)
2. Cek console browser (F12) untuk error
3. Pastikan URL benar: `http://localhost:3000`

---

## 📝 Catatan Penting

1. **Jangan tutup terminal** tempat server berjalan selama menggunakan sistem
2. **Database hanya perlu di-setup sekali** (create database + import schema)
3. **Seeding hanya perlu dijalankan sekali** (untuk data awal)
4. **Server perlu dijalankan setiap kali** mau menggunakan sistem
5. **Semua berjalan di port 3000** - tidak perlu port terpisah!

---

## ✅ Checklist Sebelum Mulai

- [ ] MySQL sudah terinstall dan berjalan
- [ ] Node.js sudah terinstall (v16+)
- [ ] Database `olimpiade_sains` sudah dibuat
- [ ] Schema sudah di-import
- [ ] Dependencies backend sudah di-install (`npm install`)
- [ ] Data sudah di-seeding (`npm run seed`)
- [ ] Server backend sudah berjalan (`npm run dev`)
- [ ] Browser sudah dibuka ke `http://localhost:3000`

---

## 🎉 Selamat Menggunakan!

Jika ada pertanyaan atau masalah, cek file **DOKUMENTASI_LENGKAP.md** untuk informasi lebih detail.

**Happy Coding! 🚀**
