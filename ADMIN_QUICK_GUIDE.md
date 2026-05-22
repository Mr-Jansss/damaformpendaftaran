# 🚀 Admin Dashboard - Quick Guide

## 🔐 Login Admin

**URL:** `http://localhost:3000/login.html`

**Credentials:**
- Username: `admin`
- Password: `admin123`

## 📱 Menu Utama

### 1. 📊 Dashboard
**Fungsi:**
- Lihat statistik peserta (Total, Approved, Pending, Rejected)
- Lihat chart peserta per tingkat
- Lihat chart peserta per bidang lomba
- Export data peserta approved ke Excel

**Cara Pakai:**
- Klik menu "Dashboard" di sidebar
- Data akan auto-load
- Klik tombol "Export Peserta Approved ke Excel" untuk download

---

### 2. 👥 Manajemen Peserta
**Fungsi:**
- Lihat semua peserta yang mendaftar
- Filter peserta by status
- Search peserta by nama/sekolah/email
- Approve/Reject/Delete peserta

**Cara Pakai:**

**Lihat Detail Peserta:**
1. Klik icon mata (👁️) pada peserta
2. Modal akan muncul dengan data lengkap
3. Lihat berkas kartu pelajar
4. Klik tombol "Setujui" atau "Tolak" jika status pending

**Approve Peserta:**
1. Klik icon mata (👁️)
2. Klik tombol "Setujui"
3. Status berubah menjadi "Approved"

**Reject Peserta:**
1. Klik icon mata (👁️)
2. Klik tombol "Tolak"
3. Input alasan penolakan
4. Status berubah menjadi "Rejected"

**Delete Peserta:**
1. Klik icon trash (🗑️)
2. Konfirmasi delete
3. Peserta terhapus dari database

**Filter & Search:**
- Pilih status di dropdown (Pending/Approved/Rejected)
- Ketik nama/sekolah/email di search box
- Tabel akan auto-filter

---

### 3. 👔 Manajemen Panitia
**Fungsi:**
- Lihat semua user (admin & panitia)
- Tambah panitia baru
- Edit data panitia
- Delete panitia

**Cara Pakai:**

**Tambah Panitia:**
1. Klik tombol "Tambah Panitia"
2. Isi form:
   - Username (wajib, unique)
   - Password (wajib)
   - Nama Lengkap (wajib)
   - Email (opsional)
   - Role (Panitia/Admin)
3. Klik "Simpan"

**Edit Panitia:**
1. Klik icon edit (✏️) pada panitia
2. Form akan muncul dengan data terisi
3. Edit data yang diinginkan
4. Password kosongkan jika tidak ingin ubah
5. Klik "Simpan"

**Delete Panitia:**
1. Klik icon trash (🗑️) pada panitia
2. Konfirmasi delete
3. Panitia terhapus (tidak bisa hapus diri sendiri)

---

### 4. ✏️ Konten Halaman
**Fungsi:**
- Edit konten landing page
- Update informasi olimpiade

**Cara Pakai:**
1. Klik menu "Konten Halaman"
2. Form akan muncul dengan konten saat ini
3. Edit field yang diinginkan:
   - Judul Utama
   - Deskripsi Singkat
   - Tanggal Pelaksanaan
   - Lokasi
   - Kontak Info
   - Pengumuman
   - Syarat & Ketentuan
4. Klik "Simpan Perubahan"
5. Konten akan update di landing page

---

## 🎨 UI Elements

### Status Badge Colors:
- 🟡 **Pending** - Kuning (menunggu verifikasi)
- 🟢 **Approved** - Hijau (sudah disetujui)
- 🔴 **Rejected** - Merah (ditolak)

### Role Badge Colors:
- 🟣 **Admin** - Ungu
- 🔵 **Panitia** - Biru

### Action Icons:
- 👁️ **View** - Lihat detail
- ✏️ **Edit** - Edit data
- 🗑️ **Delete** - Hapus data

---

## ⚡ Keyboard Shortcuts

- `Esc` - Tutup modal
- `Ctrl + F` - Focus ke search box (browser default)

---

## 🔔 Notifikasi

Setiap aksi akan menampilkan notifikasi:
- 🟢 **Hijau** - Aksi berhasil
- 🔴 **Merah** - Aksi gagal/error

Notifikasi akan hilang otomatis setelah 3 detik.

---

## 🐛 Troubleshooting

### Data tidak muncul?
1. Cek koneksi internet
2. Pastikan backend running
3. Refresh halaman (F5)
4. Clear cache (Ctrl + Shift + R)

### Modal tidak muncul?
1. Refresh halaman
2. Cek console browser (F12)
3. Pastikan tidak ada error JavaScript

### Tidak bisa login?
1. Cek username dan password
2. Pastikan backend running
3. Cek database connection

### Chart tidak muncul?
1. Pastikan ada data peserta
2. Refresh halaman
3. Cek console untuk error

---

## 📞 Support

Jika ada masalah:
1. Buka Console Browser (F12)
2. Screenshot error yang muncul
3. Cek file log backend
4. Hubungi developer

---

## 🎯 Tips & Tricks

1. **Gunakan Filter** untuk cari peserta lebih cepat
2. **Export Excel** untuk backup data
3. **Approve batch** peserta yang sudah diverifikasi
4. **Update konten** secara berkala
5. **Backup database** secara rutin

---

## ⚠️ Penting!

- ❌ **Jangan hapus admin utama**
- ❌ **Jangan share password admin**
- ✅ **Backup data sebelum delete**
- ✅ **Verifikasi berkas sebelum approve**
- ✅ **Berikan alasan jelas saat reject**

---

**Happy Managing! 🎉**
