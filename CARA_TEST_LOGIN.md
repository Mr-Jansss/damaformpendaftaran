# 🔐 Cara Test Login - Quick Guide

## ✅ Status

- ✅ Backend sudah berjalan di port 3000
- ✅ Config.js sudah diupdate
- ✅ Login.js sudah diperbaiki
- ✅ Siap untuk testing!

---

## 🚀 Langkah Testing

### 1. Buka Login Page

**Cara 1: Double-click**
```
frontend/login.html
```

**Cara 2: Live Server (Recommended)**
- Install extension "Live Server" di VS Code
- Right-click `login.html` → Open with Live Server
- Akan buka di `http://127.0.0.1:5500/frontend/login.html`

### 2. Buka Browser Console

- Tekan **F12** atau **Ctrl+Shift+I**
- Pilih tab **Console**
- Biarkan terbuka untuk melihat log

### 3. Login

**Credentials Admin:**
```
Username: admin
Password: admin123
```

**Credentials Panitia:**
```
Username: panitia1
Password: panitia123
```

### 4. Lihat Console

Setelah klik Login, Anda akan melihat:

```javascript
API Call: http://localhost:3000/api/auth/login {method: 'POST', ...}
API Response: {success: true, data: {token: "...", user: {...}}}
```

### 5. Redirect

- **Admin** → Redirect ke `admin-dashboard.html`
- **Panitia** → Redirect ke `panitia-dashboard.html`

---

## 🐛 Jika Masih Stuck

### Cek 1: Backend Running?

```bash
# Buka browser, akses:
http://localhost:3000

# Seharusnya muncul:
"Olimpiade Sains API"
```

### Cek 2: Console Error?

**Error: Failed to fetch**
```
❌ Backend tidak berjalan
✅ Solusi: Jalankan backend
   cd backend
   npm start
```

**Error: CORS**
```
❌ CORS tidak enable
✅ Solusi: Cek backend/server.js
   app.use(cors());
```

**Error: 401 Unauthorized**
```
❌ Username/password salah
✅ Solusi: Gunakan credentials yang benar
   admin / admin123
   panitia1 / panitia123
```

**Error: 404 Not Found**
```
❌ Endpoint tidak ditemukan
✅ Solusi: Cek API_BASE_URL di config.js
   const API_BASE_URL = 'http://localhost:3000/api';
```

### Cek 3: Network Tab

1. Buka **F12** → Tab **Network**
2. Klik **Login**
3. Lihat request ke `/api/auth/login`
4. Cek **Status Code**:
   - 200 = Success ✅
   - 401 = Wrong credentials ❌
   - 404 = Endpoint not found ❌
   - 500 = Server error ❌

### Cek 4: LocalStorage

Setelah login berhasil:

1. **F12** → Tab **Application** (Chrome) atau **Storage** (Firefox)
2. Pilih **Local Storage** → `http://127.0.0.1:5500`
3. Seharusnya ada:
   - `token`: JWT token
   - `user`: User data (JSON)

---

## 🎯 Expected Behavior

### Login Success (Admin)

1. ✅ Klik "Login"
2. ✅ Button berubah: "⏳ Memproses..."
3. ✅ Console log: API Call & Response
4. ✅ LocalStorage: token & user tersimpan
5. ✅ Redirect ke `admin-dashboard.html`
6. ✅ Dashboard tampil dengan nama admin

### Login Success (Panitia)

1. ✅ Klik "Login"
2. ✅ Button berubah: "⏳ Memproses..."
3. ✅ Console log: API Call & Response
4. ✅ LocalStorage: token & user tersimpan
5. ✅ Redirect ke `panitia-dashboard.html`
6. ✅ Dashboard tampil dengan nama panitia

### Login Failed

1. ❌ Klik "Login"
2. ❌ Button berubah: "⏳ Memproses..."
3. ❌ Console log: API Error
4. ❌ Error message tampil: "Login gagal..."
5. ❌ Tetap di halaman login
6. ❌ Button kembali normal

---

## 📸 Screenshot Expected

### 1. Login Page
```
┌─────────────────────────────────┐
│         🏆                      │
│   Olimpiade Sains               │
│   Login ke Dashboard            │
│                                 │
│  👤 Username                    │
│  [admin____________]            │
│                                 │
│  🔒 Password                    │
│  [••••••••••] 👁️               │
│                                 │
│  [🔐 Login]                     │
│                                 │
│  ⬅️ Kembali ke Halaman Utama   │
└─────────────────────────────────┘
```

### 2. Console (Success)
```
API Call: http://localhost:3000/api/auth/login
{method: 'POST', headers: {...}, body: '{"username":"admin","password":"admin123"}'}

API Response: 
{
  success: true,
  data: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: 1,
      username: "admin",
      nama_lengkap: "Administrator",
      role: "admin"
    }
  }
}
```

### 3. Admin Dashboard
```
┌─────────────────────────────────┐
│ 🏆 Admin Panel                  │
│    Administrator                │
│                                 │
│ 📊 Dashboard                    │
│ 👥 Manajemen Peserta            │
│ 👔 Manajemen Panitia            │
│ ✏️ Konten Halaman               │
│ 🏠 Lihat Website                │
│ 🚪 Logout                       │
└─────────────────────────────────┘
```

---

## 🔧 Quick Fix Commands

### Restart Backend
```bash
# Ctrl+C untuk stop backend
# Kemudian:
cd backend
npm start
```

### Clear LocalStorage
```javascript
// Di browser console:
localStorage.clear();
location.reload();
```

### Test API Manual
```bash
# Gunakan curl:
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

---

## ✅ Checklist

Sebelum test login, pastikan:

- [ ] Backend running (port 3000)
- [ ] Database connected
- [ ] User admin & panitia sudah ada di database
- [ ] Browser console terbuka (F12)
- [ ] Network tab terbuka (untuk debug)
- [ ] File config.js sudah update (port 3000)
- [ ] File login.js sudah update (emoji icons)

---

## 🎉 Setelah Login Berhasil

### Admin Dashboard
- ✅ Lihat stats (Total Peserta, Approved, Pending, Rejected)
- ✅ Lihat charts (Peserta per Tingkat, per Bidang)
- ✅ Manage peserta (Approve/Reject)
- ✅ Manage panitia (CRUD)
- ✅ Edit konten halaman
- ✅ Export data

### Panitia Dashboard
- ✅ Lihat stats (Pending, Approved, Rejected)
- ✅ Manage peserta (Approve/Reject)
- ✅ Lihat detail peserta
- ✅ Filter & search peserta

---

## 📝 Notes

1. **Port Backend:** 3000 (bukan 5000!)
2. **CORS:** Sudah enable di backend
3. **JWT:** Token disimpan di localStorage
4. **Session:** Persistent (sampai logout)
5. **Auto-redirect:** Jika sudah login, langsung ke dashboard

---

**Updated:** 22 Mei 2026  
**Status:** ✅ READY TO TEST  
**Backend:** Running on port 3000  
**Frontend:** Updated & Fixed
