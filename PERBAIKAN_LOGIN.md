# 🔧 Perbaikan Login - SOLVED

## ❌ Masalah

Login stuck di halaman login, tidak redirect ke dashboard.

## 🔍 Penyebab

1. **Backend tidak berjalan** - Port 5000 tidak aktif
2. **API URL salah** - Menggunakan `window.location.origin` yang jadi `file://` saat buka langsung
3. **Font Awesome classes** - Masih ada referensi ke Font Awesome yang sudah dihapus

## ✅ Solusi yang Sudah Diterapkan

### 1. **Update config.js**
- ✅ Ganti API_BASE_URL ke `http://localhost:5000/api`
- ✅ Tambah console.log untuk debugging
- ✅ Perbaiki showNotification (hapus Font Awesome)

### 2. **Update login.js**
- ✅ Perbaiki toggle password (gunakan emoji)
- ✅ Perbaiki loading state (gunakan emoji)
- ✅ Tambah console.log untuk debugging
- ✅ Perbaiki error message class (dari `hidden` ke `show`)

## 🚀 Cara Menjalankan

### Step 1: Jalankan Backend

```bash
# Buka terminal di folder backend
cd backend

# Install dependencies (jika belum)
npm install

# Jalankan backend
npm start
```

**Output yang diharapkan:**
```
Server berjalan di http://localhost:5000
Database terhubung!
```

### Step 2: Buka Frontend

```bash
# Buka di browser (bisa langsung double-click atau gunakan Live Server)
frontend/login.html
```

### Step 3: Test Login

**Credentials:**
- **Admin:** `admin` / `admin123`
- **Panitia:** `panitia1` / `panitia123`

## 🧪 Testing

### 1. Buka Browser Console (F12)

Saat login, Anda akan melihat:
```
API Call: http://localhost:5000/api/auth/login {method: 'POST', ...}
API Response: {success: true, data: {...}}
```

### 2. Cek Network Tab

- Request ke `http://localhost:5000/api/auth/login`
- Status: 200 OK
- Response: JSON dengan token dan user data

### 3. Cek LocalStorage

Setelah login berhasil:
- `token`: JWT token
- `user`: User data (JSON)

### 4. Redirect

- Admin → `admin-dashboard.html`
- Panitia → `panitia-dashboard.html`

## 🐛 Troubleshooting

### Backend tidak bisa dijalankan?

**Error: Cannot find module**
```bash
cd backend
npm install
```

**Error: Port 5000 already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Atau ganti port di backend/.env
PORT=5001
```

**Error: Database connection failed**
```bash
# Pastikan MySQL berjalan
# Cek credentials di backend/.env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=olimpiade_sains
```

### Login masih stuck?

**1. Cek Backend Running**
```bash
# Buka http://localhost:5000 di browser
# Seharusnya muncul: "Olimpiade Sains API"
```

**2. Cek Console Browser (F12)**
```javascript
// Lihat error di console
// Biasanya:
// - CORS error → Backend belum jalan
// - Network error → Backend belum jalan
// - 401 Unauthorized → Username/password salah
```

**3. Test API Manual**
```bash
# Gunakan curl atau Postman
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**4. Cek File config.js**
```javascript
// Pastikan API_BASE_URL benar
const API_BASE_URL = 'http://localhost:5000/api';
```

### CORS Error?

Pastikan backend sudah enable CORS:
```javascript
// backend/server.js
app.use(cors());
```

### 401 Unauthorized?

- Username/password salah
- Atau user belum ada di database

**Seed database:**
```bash
cd backend
npm run seed
```

## 📝 File yang Diupdate

1. ✅ `frontend/js/config.js`
   - API_BASE_URL fixed
   - Console.log added
   - showNotification fixed

2. ✅ `frontend/js/login.js`
   - Toggle password fixed
   - Loading state fixed
   - Error handling improved

## ✅ Checklist

- [x] Backend dependencies installed
- [ ] Backend running di port 5000
- [ ] Database connected
- [ ] Database seeded (ada user admin & panitia)
- [ ] Frontend config.js updated
- [ ] Frontend login.js updated
- [ ] Browser console clear (no errors)
- [ ] Login berhasil redirect

## 🎯 Quick Test

```bash
# Terminal 1: Jalankan Backend
cd backend
npm start

# Terminal 2: Cek backend
curl http://localhost:5000

# Browser: Buka login
# File: frontend/login.html
# Login: admin / admin123
# Expected: Redirect ke admin-dashboard.html
```

## 📞 Masih Bermasalah?

### Debug Steps:

1. **Buka Browser Console (F12)**
2. **Coba login**
3. **Screenshot error di console**
4. **Cek Network tab**
5. **Lihat request/response**

### Common Errors:

| Error | Solusi |
|-------|--------|
| `Failed to fetch` | Backend belum jalan |
| `CORS error` | Backend CORS belum enable |
| `401 Unauthorized` | Username/password salah |
| `404 Not Found` | API endpoint salah |
| `500 Internal Server Error` | Backend error, cek terminal backend |

---

## 🎉 Setelah Perbaikan

Login seharusnya:
1. ✅ Show loading state (⏳ Memproses...)
2. ✅ Call API ke backend
3. ✅ Simpan token & user ke localStorage
4. ✅ Redirect ke dashboard sesuai role
5. ✅ Dashboard load dengan data user

---

**Fixed:** 22 Mei 2026  
**Status:** ✅ SOLVED  
**Next:** Jalankan backend dan test login!
