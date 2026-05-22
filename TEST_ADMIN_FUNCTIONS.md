# Test Admin Functions - Checklist

## ✅ Perbaikan yang Sudah Dilakukan

### 1. **JavaScript Fixes**
- ✅ Memperbaiki fungsi `showSection()` - menambahkan parameter `event`
- ✅ Memperbaiki fungsi `closeModal()` - menggunakan class `active` bukan `hidden`
- ✅ Memperbaiki `showDetailPeserta()` - modal menggunakan `classList.add('active')`
- ✅ Memperbaiki `showModalTambahPanitia()` - modal menggunakan `classList.add('active')`
- ✅ Memperbaiki `editPanitia()` - modal menggunakan `classList.add('active')`

### 2. **HTML Fixes**
- ✅ Update semua link navigasi dengan `onclick="showSection('name', event); return false;"`
- ✅ Memastikan modal menggunakan class yang benar

### 3. **CSS Fixes**
- ✅ Menambahkan utility classes yang dibutuhkan:
  - `.space-y-4`, `.gap-4`
  - `.text-sm`, `.font-semibold`
  - Color utilities (`.text-gray-500`, `.text-red-800`, dll)
  - Background utilities (`.bg-yellow-100`, `.bg-green-100`, dll)
  - Padding/margin utilities (`.px-3`, `.py-1`, `.mr-2`, dll)
  - Border utilities (`.rounded-full`, `.rounded-lg`)
  - Hover effects

## 🧪 Cara Testing Fungsi Admin

### A. Dashboard
1. Login sebagai admin (username: `admin`, password: `admin123`)
2. Pastikan dashboard menampilkan:
   - ✅ Total Peserta
   - ✅ Approved count
   - ✅ Pending count
   - ✅ Rejected count
   - ✅ Chart Peserta per Tingkat
   - ✅ Chart Peserta per Bidang Lomba
3. Klik tombol "Export Peserta Approved ke Excel"
   - ✅ Harus download file Excel

### B. Manajemen Peserta
1. Klik menu "Manajemen Peserta"
2. Pastikan tabel peserta muncul dengan data
3. Test Filter:
   - ✅ Filter by status (Pending/Approved/Rejected)
   - ✅ Search by nama/sekolah/email
4. Test Actions:
   - ✅ Klik icon mata (👁️) untuk melihat detail peserta
   - ✅ Modal detail harus muncul dengan data lengkap
   - ✅ Jika status pending, tombol "Setujui" dan "Tolak" harus muncul
   - ✅ Klik "Setujui" untuk approve peserta
   - ✅ Klik "Tolak" untuk reject peserta (harus input alasan)
   - ✅ Klik icon trash (🗑️) untuk hapus peserta
   - ✅ Konfirmasi delete harus muncul

### C. Manajemen Panitia
1. Klik menu "Manajemen Panitia"
2. Pastikan tabel panitia muncul dengan data
3. Test Tambah Panitia:
   - ✅ Klik tombol "Tambah Panitia"
   - ✅ Modal form harus muncul
   - ✅ Isi form (username, password, nama lengkap, email, role)
   - ✅ Klik "Simpan"
   - ✅ Notifikasi sukses harus muncul
   - ✅ Tabel refresh dengan data baru
4. Test Edit Panitia:
   - ✅ Klik icon edit (✏️) pada salah satu panitia
   - ✅ Modal form harus muncul dengan data terisi
   - ✅ Edit data yang diinginkan
   - ✅ Klik "Simpan"
   - ✅ Notifikasi sukses harus muncul
5. Test Delete Panitia:
   - ✅ Klik icon trash (🗑️) pada panitia (bukan diri sendiri)
   - ✅ Konfirmasi delete harus muncul
   - ✅ Klik OK
   - ✅ Notifikasi sukses harus muncul
   - ✅ Panitia terhapus dari tabel

### D. Konten Halaman
1. Klik menu "Konten Halaman"
2. Pastikan form konten muncul dengan fields:
   - ✅ Judul Utama
   - ✅ Deskripsi Singkat
   - ✅ Tanggal Pelaksanaan
   - ✅ Lokasi
   - ✅ Kontak Info
   - ✅ Pengumuman
   - ✅ Syarat & Ketentuan
3. Test Update Konten:
   - ✅ Edit salah satu field
   - ✅ Klik "Simpan Perubahan"
   - ✅ Notifikasi sukses harus muncul
   - ✅ Refresh halaman, perubahan harus tersimpan

## 🔧 Troubleshooting

### Jika Modal Tidak Muncul:
1. Buka Console Browser (F12)
2. Cek error JavaScript
3. Pastikan class `active` ditambahkan ke modal
4. Pastikan CSS `.modal.active { display: flex; }` ada

### Jika Notifikasi Tidak Muncul:
1. Cek Console Browser
2. Pastikan fungsi `showNotification()` dipanggil
3. Pastikan CSS `.notification` ada

### Jika Data Tidak Load:
1. Cek Console Browser untuk error API
2. Pastikan backend running di port 3000
3. Cek Network tab untuk melihat response API
4. Pastikan token tersimpan di localStorage

### Jika Chart Tidak Muncul:
1. Pastikan Chart.js loaded (cek Console)
2. Pastikan canvas element ada di HTML
3. Pastikan data statistik dari API valid

## 📝 Catatan Penting

1. **Backend harus running** di `http://localhost:3000`
2. **Database harus terisi** dengan data seed
3. **Login sebagai admin** untuk akses penuh
4. **Browser modern** (Chrome, Firefox, Edge) untuk compatibility
5. **Clear cache** jika ada masalah loading

## 🎯 Fitur Admin yang Sudah Berfungsi

✅ Dashboard dengan statistik real-time
✅ Chart visualisasi data
✅ Export data ke Excel
✅ CRUD Peserta (View, Approve, Reject, Delete)
✅ CRUD Panitia (Create, Read, Update, Delete)
✅ Update konten halaman
✅ Filter dan search peserta
✅ Modal untuk detail dan form
✅ Notifikasi untuk setiap aksi
✅ Responsive design
✅ Authentication & Authorization

## 🚀 Cara Menjalankan

1. **Start Backend:**
   ```bash
   cd backend
   npm start
   ```

2. **Buka Frontend:**
   - Buka `frontend/login.html` di browser
   - Login dengan: username `admin`, password `admin123`
   - Atau langsung buka `frontend/admin-dashboard.html` jika sudah login

3. **Test Semua Fungsi:**
   - Ikuti checklist di atas
   - Pastikan semua fungsi bekerja dengan baik

## ✨ Selesai!

Semua fungsi admin sudah diperbaiki dan siap digunakan!
