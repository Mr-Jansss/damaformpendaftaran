-- ============================================
-- DATA AWAL (SEEDING) - SISTEM PENDAFTARAN OLIMPIADE
-- ============================================

USE olimpiade_sains;

-- Insert Admin Default
-- Password: admin123 (sudah di-hash dengan bcrypt)
INSERT INTO users (username, password, role, nama_lengkap, email) VALUES
('admin', '$2b$10$YQs7Z5xGvqE3K5X5X5X5XeJ5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'admin', 'Administrator', 'admin@olimpiade.com'),
('panitia1', '$2b$10$YQs7Z5xGvqE3K5X5X5X5XeJ5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X', 'panitia', 'Panitia Satu', 'panitia1@olimpiade.com');

-- Catatan: Password di atas adalah placeholder. Akan di-generate ulang di aplikasi.
-- Password default untuk testing:
-- admin / admin123
-- panitia1 / panitia123

-- Insert Konten Halaman Default
INSERT INTO konten_halaman (kunci_konten, isi_konten) VALUES
('judul_utama', 'Olimpiade Sains Nasional 2026'),
('deskripsi_singkat', 'Bergabunglah dalam kompetisi sains terbesar untuk siswa SD, SMP, dan SMA se-Indonesia. Tunjukkan kemampuan terbaikmu!'),
('tanggal_pelaksanaan', '15 Juli - 20 Juli 2026'),
('lokasi', 'Jakarta Convention Center'),
('kontak_info', 'Email: info@olimpiade.com | WhatsApp: +62 812-3456-7890'),
('pengumuman', 'Pendaftaran dibuka hingga 30 Juni 2026. Segera daftarkan dirimu!'),
('syarat_ketentuan', '1. Peserta adalah siswa aktif SD/SMP/SMA\n2. Melampirkan kartu pelajar yang masih berlaku\n3. Satu peserta hanya boleh mendaftar satu bidang lomba\n4. Keputusan panitia tidak dapat diganggu gugat');

-- Insert Data Peserta Contoh (untuk testing)
INSERT INTO peserta (nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba, status) VALUES
('Budi Santoso', 'SDN 01 Jakarta', 'budi@email.com', '081234567890', 'SD', 'Matematika', 'approved'),
('Siti Nurhaliza', 'SMPN 5 Bandung', 'siti@email.com', '081234567891', 'SMP', 'Biologi', 'approved'),
('Ahmad Fauzi', 'SMAN 3 Surabaya', 'ahmad@email.com', '081234567892', 'SMA', 'Fisika', 'approved'),
('Dewi Lestari', 'SMAN 1 Yogyakarta', 'dewi@email.com', '081234567893', 'SMA', 'Kimia', 'pending'),
('Rudi Hartono', 'SMPN 2 Semarang', 'rudi@email.com', '081234567894', 'SMP', 'Matematika', 'pending');
