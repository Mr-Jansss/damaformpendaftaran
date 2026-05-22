# ✅ Testing Checklist - CSS Murni

## 🎯 Testing Guide

Gunakan checklist ini untuk memastikan semua fitur berfungsi dengan baik setelah update ke CSS murni.

---

## 📱 Browser Testing

### Desktop Browsers
- [ ] Chrome (Latest)
- [ ] Firefox (Latest)
- [ ] Edge (Latest)
- [ ] Safari (Latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet

### Screen Sizes
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## 🏠 Landing Page (index.html)

### Visual Testing
- [ ] Navbar tampil dengan benar
- [ ] Logo/icon trophy tampil
- [ ] Button "Login" tampil dan styled
- [ ] Hero section tampil dengan gradient background
- [ ] Judul dan deskripsi terbaca dengan jelas
- [ ] Icon kalender dan lokasi tampil
- [ ] Pengumuman banner tampil dengan background orange
- [ ] Form pendaftaran tampil dengan styling yang baik
- [ ] Semua input field styled dengan benar
- [ ] Button "Daftar Sekarang" tampil dengan gradient
- [ ] Tabel peserta terkonfirmasi tampil
- [ ] Footer tampil dengan background dark

### Functionality Testing
- [ ] Klik button "Login" redirect ke login.html
- [ ] Dropdown "Tingkat Sekolah" berfungsi
- [ ] Dropdown "Bidang Lomba" ter-enable setelah pilih tingkat
- [ ] Upload file berfungsi
- [ ] Submit form berfungsi (jika backend aktif)
- [ ] Search peserta berfungsi (jika ada data)
- [ ] Scroll smooth

### Responsive Testing
- [ ] Navbar responsive di mobile
- [ ] Hero section responsive
- [ ] Form grid menjadi 1 kolom di mobile
- [ ] Tabel scrollable horizontal di mobile
- [ ] Footer responsive

---

## 🔐 Login Page (login.html)

### Visual Testing
- [ ] Background gradient tampil (orange)
- [ ] Logo trophy dalam circle tampil
- [ ] Judul "Olimpiade Sains" tampil
- [ ] Login card tampil dengan shadow
- [ ] Icon user dan lock tampil
- [ ] Input fields styled dengan benar
- [ ] Password toggle button tampil
- [ ] Button "Login" tampil dengan gradient
- [ ] Link "Kembali ke Halaman Utama" tampil
- [ ] Credentials info box tampil

### Functionality Testing
- [ ] Input username berfungsi
- [ ] Input password berfungsi
- [ ] Password toggle berfungsi (show/hide)
- [ ] Submit form berfungsi
- [ ] Error message tampil jika login gagal
- [ ] Redirect ke dashboard jika login berhasil
- [ ] Link "Kembali" redirect ke index.html

### Responsive Testing
- [ ] Login card centered di semua ukuran layar
- [ ] Form responsive di mobile
- [ ] Credentials info responsive

---

## 👨‍💼 Admin Dashboard (admin-dashboard.html)

### Visual Testing
- [ ] Sidebar tampil dengan background dark
- [ ] Logo dan nama admin tampil di sidebar
- [ ] Menu navigasi tampil dengan icon
- [ ] Active menu highlighted
- [ ] Main content area tampil dengan margin kiri
- [ ] Page header tampil
- [ ] 4 Stats cards tampil dengan icon dan warna berbeda
- [ ] 2 Charts tampil (jika Chart.js loaded)
- [ ] Export button tampil
- [ ] Tabel peserta tampil dengan styling
- [ ] Tabel panitia tampil
- [ ] Form konten tampil

### Functionality Testing
- [ ] Klik menu navigasi switch section
- [ ] Stats cards menampilkan data yang benar
- [ ] Charts render dengan benar
- [ ] Filter status berfungsi
- [ ] Search peserta berfungsi
- [ ] Button "Lihat Detail" buka modal
- [ ] Modal detail peserta tampil
- [ ] Button "Approve" berfungsi
- [ ] Button "Reject" berfungsi
- [ ] Button "Tambah Panitia" buka modal
- [ ] Form tambah/edit panitia berfungsi
- [ ] Button "Export" download file
- [ ] Button "Logout" redirect ke login
- [ ] Link "Lihat Website" redirect ke index.html

### Responsive Testing
- [ ] Sidebar hidden di mobile
- [ ] Main content full width di mobile
- [ ] Stats cards stack vertically di mobile
- [ ] Charts responsive
- [ ] Tabel scrollable horizontal di mobile
- [ ] Modal responsive

---

## 👔 Panitia Dashboard (panitia-dashboard.html)

### Visual Testing
- [ ] Navbar tampil dengan background white
- [ ] Logo dan nama panitia tampil
- [ ] Button "Website" dan "Logout" tampil
- [ ] 3 Stats cards tampil (Pending, Approved, Rejected)
- [ ] Tabel peserta tampil dengan styling
- [ ] Filter dan search box tampil

### Functionality Testing
- [ ] Stats cards menampilkan data yang benar
- [ ] Filter status berfungsi
- [ ] Search peserta berfungsi
- [ ] Button "Lihat Detail" buka modal
- [ ] Modal detail peserta tampil
- [ ] Button "Approve" berfungsi
- [ ] Button "Reject" berfungsi
- [ ] Button "Logout" redirect ke login
- [ ] Link "Website" redirect ke index.html

### Responsive Testing
- [ ] Navbar responsive di mobile
- [ ] Stats cards stack vertically di mobile
- [ ] Tabel scrollable horizontal di mobile
- [ ] Modal responsive

---

## 🎨 CSS & Styling

### General Styling
- [ ] Semua warna konsisten dengan theme
- [ ] Font family konsisten (Inter atau fallback)
- [ ] Font sizes proporsional
- [ ] Line heights readable
- [ ] Spacing konsisten

### Components
- [ ] Buttons hover effect berfungsi
- [ ] Cards hover effect berfungsi (jika ada)
- [ ] Input focus effect berfungsi
- [ ] Links hover effect berfungsi
- [ ] Badges styled dengan benar

### Animations
- [ ] Login card slideUp animation berfungsi
- [ ] Loading spinner berfungsi
- [ ] Hover transitions smooth
- [ ] Modal fade in/out (jika ada)

### Icons
- [ ] Semua emoji icon tampil dengan benar
- [ ] Icon spacing konsisten
- [ ] Icon size proporsional

---

## 🔧 Technical Testing

### Performance
- [ ] Page load time < 2 seconds
- [ ] No console errors
- [ ] No 404 errors (missing files)
- [ ] CSS file loaded successfully
- [ ] JavaScript files loaded successfully

### Accessibility
- [ ] All forms have labels
- [ ] All buttons have text or aria-label
- [ ] All images have alt text (jika ada)
- [ ] Table headers have scope attribute
- [ ] Input fields have autocomplete attribute
- [ ] Color contrast sufficient (WCAG AA)
- [ ] Keyboard navigation berfungsi

### SEO
- [ ] All pages have title tag
- [ ] All pages have meta charset
- [ ] All pages have meta viewport

### Code Quality
- [ ] No inline styles (kecuali yang diperlukan)
- [ ] CSS classes semantic
- [ ] HTML semantic (header, nav, main, footer)
- [ ] No unused CSS
- [ ] No duplicate CSS

---

## 🌐 Offline Testing

### Without Internet
- [ ] Landing page tampil normal
- [ ] Login page tampil normal
- [ ] Admin dashboard tampil (kecuali charts)
- [ ] Panitia dashboard tampil normal
- [ ] All CSS loaded
- [ ] All icons (emoji) tampil
- [ ] Forms berfungsi (jika backend lokal)

### With Internet
- [ ] Charts di admin dashboard tampil
- [ ] All features berfungsi normal

---

## 🐛 Bug Testing

### Common Issues
- [ ] No layout shift saat page load
- [ ] No horizontal scroll (kecuali table)
- [ ] No overlapping elements
- [ ] No cut-off text
- [ ] No broken images
- [ ] No missing icons

### Edge Cases
- [ ] Long text di table tidak break layout
- [ ] Empty table tampil message yang sesuai
- [ ] Error message tampil dengan benar
- [ ] Modal close berfungsi dengan semua cara (button, overlay)
- [ ] Form validation berfungsi

---

## 📊 Test Results

### Summary
- **Total Tests:** 150+
- **Passed:** ___
- **Failed:** ___
- **Skipped:** ___

### Critical Issues
1. ___
2. ___
3. ___

### Minor Issues
1. ___
2. ___
3. ___

### Notes
___

---

## ✅ Sign Off

### Tested By
- **Name:** ___
- **Date:** ___
- **Browser:** ___
- **Device:** ___

### Approved By
- **Name:** ___
- **Date:** ___
- **Status:** [ ] Approved [ ] Needs Revision

---

## 📝 Testing Tips

1. **Clear Cache:** Selalu clear browser cache sebelum testing
2. **Incognito Mode:** Test di incognito untuk memastikan no cache
3. **Multiple Browsers:** Test di minimal 3 browser berbeda
4. **Mobile First:** Test di mobile dulu, baru desktop
5. **Real Device:** Test di real device, bukan hanya emulator
6. **Slow Connection:** Test dengan throttling network
7. **Accessibility:** Test dengan screen reader jika memungkinkan
8. **Print:** Test print preview (jika diperlukan)

---

**Happy Testing! 🧪**
