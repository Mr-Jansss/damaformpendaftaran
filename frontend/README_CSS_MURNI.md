# 🎨 Frontend - CSS Murni (Tanpa Tailwind)

## 📦 Struktur File

```
frontend/
├── css/
│   └── styles.css              # ⭐ CSS utama (semua styling di sini)
├── js/
│   ├── config.js               # Konfigurasi API
│   ├── landing.js              # Logic landing page
│   ├── login.js                # Logic login
│   ├── admin-dashboard.js      # Logic admin dashboard
│   └── panitia-dashboard.js    # Logic panitia dashboard
├── index.html                  # 🏠 Landing page
├── login.html                  # 🔐 Halaman login
├── admin-dashboard.html        # 👨‍💼 Dashboard admin
└── panitia-dashboard.html      # 👔 Dashboard panitia
```

## 🚀 Quick Start

### 1. Buka di Browser
```bash
# Langsung buka file HTML di browser
index.html          # Landing page
login.html          # Login page
```

### 2. Login Credentials
```
Admin:
  Username: admin
  Password: admin123

Panitia:
  Username: panitia1
  Password: panitia123
```

## 🎨 CSS Classes Tersedia

### Buttons
```html
<button class="btn btn-primary">Primary Button</button>
<button class="btn btn-success">Success Button</button>
<button class="btn btn-danger">Danger Button</button>
<button class="btn btn-secondary">Secondary Button</button>
```

### Forms
```html
<div class="form-group">
    <label class="form-label">Label</label>
    <input type="text" class="form-input">
</div>

<select class="form-select">
    <option>Option 1</option>
</select>
```

### Cards
```html
<div class="card">
    <h3>Card Title</h3>
    <p>Card content...</p>
</div>
```

### Tables
```html
<table class="table">
    <thead>
        <tr>
            <th scope="col">Header 1</th>
            <th scope="col">Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
</table>
```

### Badges
```html
<span class="badge badge-pending">Pending</span>
<span class="badge badge-approved">Approved</span>
<span class="badge badge-rejected">Rejected</span>
```

### Grid Layout
```html
<div class="grid grid-cols-2">
    <div>Column 1</div>
    <div>Column 2</div>
</div>

<div class="grid grid-cols-3">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
</div>
```

### Stats Card
```html
<div class="stat-card">
    <div>
        <p class="stat-label">Total Peserta</p>
        <h3 class="stat-value">150</h3>
    </div>
    <div class="stat-icon" style="background: #DBEAFE; color: #3B82F6;">
        👥
    </div>
</div>
```

### Modal
```html
<div id="myModal" class="modal">
    <div class="modal-content">
        <h3>Modal Title</h3>
        <p>Modal content...</p>
    </div>
</div>

<script>
// Show modal
document.getElementById('myModal').classList.add('active');

// Hide modal
document.getElementById('myModal').classList.remove('active');
</script>
```

## 🎯 Icon dengan Emoji

Gunakan class icon untuk menambahkan emoji:

```html
<button class="icon-home">Home</button>
<button class="icon-user">User</button>
<button class="icon-logout">Logout</button>
```

Available icons:
- `icon-trophy` 🏆
- `icon-calendar` 📅
- `icon-location` 📍
- `icon-megaphone` 📢
- `icon-send` 📤
- `icon-user` 👤
- `icon-lock` 🔒
- `icon-login` 🔐
- `icon-home` 🏠
- `icon-logout` 🚪
- `icon-users` 👥
- `icon-check` ✅
- `icon-times` ❌
- `icon-eye` 👁️
- `icon-edit` ✏️
- `icon-trash` 🗑️
- `icon-plus` ➕
- `icon-save` 💾

## 🎨 Color Variables

Edit di `css/styles.css`:

```css
:root {
    --primary: #FF6B00;
    --primary-dark: #FF8C00;
    --dark: #1A1A1A;
    --gray-50: #F9FAFB;
    --gray-100: #F3F4F6;
    --gray-200: #E5E7EB;
    --gray-300: #D1D5DB;
    --gray-400: #9CA3AF;
    --gray-500: #6B7280;
    --gray-600: #4B5563;
    --gray-700: #374151;
    --gray-800: #1F2937;
    --white: #FFFFFF;
    --green: #10B981;
    --yellow: #F59E0B;
    --red: #EF4444;
    --blue: #3B82F6;
}
```

## 📱 Responsive Design

Semua component sudah responsive. Breakpoint utama:

```css
@media (max-width: 768px) {
    /* Mobile styles */
}
```

## ✅ Keuntungan CSS Murni

- ✅ **Tidak perlu koneksi internet** (kecuali Chart.js)
- ✅ **Lebih cepat** (tidak ada framework besar)
- ✅ **Lebih mudah di-customize**
- ✅ **File size lebih kecil**
- ✅ **Lebih mudah di-maintain**

## 🔧 Customization

### Mengubah Warna Tema
```css
/* Di css/styles.css */
:root {
    --primary: #YOUR_COLOR;
}
```

### Menambah Component Baru
```css
/* Di css/styles.css */
.my-component {
    /* Your styles */
}
```

### Menambah Icon Baru
```css
/* Di css/styles.css atau di <style> tag */
.icon-myicon::before {
    content: "🎉";
    margin-right: 0.5rem;
}
```

## 📝 Tips

1. **Gunakan CSS Variables** untuk konsistensi warna
2. **Gunakan class yang sudah ada** sebelum membuat baru
3. **Test di mobile** untuk memastikan responsive
4. **Gunakan emoji** untuk icon sederhana
5. **Tambahkan aria-label** untuk accessibility

## 🐛 Troubleshooting

### Styling tidak muncul?
- Pastikan `<link rel="stylesheet" href="css/styles.css">` ada di `<head>`
- Check path file CSS sudah benar
- Clear browser cache

### Icon tidak muncul?
- Pastikan class icon sudah benar (contoh: `icon-home`)
- Check di CSS apakah icon sudah didefinisikan

### Modal tidak muncul?
- Pastikan JavaScript untuk toggle modal sudah benar
- Check class `active` sudah ditambahkan ke modal

## 📚 Dokumentasi Lengkap

Lihat file `PERUBAHAN_CSS_MURNI.md` di root folder untuk dokumentasi lengkap.

---

**Happy Coding! 🚀**
