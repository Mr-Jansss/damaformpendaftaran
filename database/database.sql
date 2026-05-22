-- 1. CREATE DATABASE
CREATE DATABASE olimpiade_sains;
USE olimpiade_sains;

-- 2. TABLE: konten_halaman
CREATE TABLE konten_halaman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kunci_konten VARCHAR(100),
    isi_konten TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

INSERT INTO konten_halaman VALUES
(1, 'judul_utama', 'Olimpiade Sains Fakultas Sains Dan Teknologi 2026', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(2, 'deskripsi_singkat', 'Bergabunglah dalam kompetisi sains terbesar untuk siswa SD, SMP, dan SMA se-Maluku. Tunjukkan kemampuan terbaikmu!', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(3, 'tanggal_pelaksanaan', '15 Juli - 20 Juli 2026', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(4, 'lokasi', 'Universitas Pattimura Ambon', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(5, 'kontak_info', 'Email: info@olimpiade.com | WhatsApp: +62 812-3456-7890', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(6, 'pengumuman', 'Pendaftaran dibuka hingga 30 Juni 2026. Segera daftarkan dirimu!', '2026-05-22 02:07:35', '2026-05-22 23:40:43'),
(7, 'syarat_ketentuan', '1. Peserta adalah siswa aktif SD/SMP/SMA\n2. Melampirkan kartu pelajar yang masih berlaku\n3. Satu peserta hanya boleh mendaftar satu bidang lomba\n4. Keputusan panitia tidak dapat diganggu gugat', '2026-05-22 02:07:35', '2026-05-22 23:40:43');


-- 3. TABLE: users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(255),
    role VARCHAR(20),
    nama_lengkap VARCHAR(100),
    email VARCHAR(100),
    created_at DATETIME,
    updated_at DATETIME
);

INSERT INTO users VALUES
(1, 'admin', '$2b$10$jzHYTkqaIVWnBAUoT09Eh.SML70EtLaHxhKyjyxLG4f/eY/jaUEQu', 'admin', 'Administrator', 'admin@olimpiade.com', '2026-05-22 02:07:35', '2026-05-22 02:49:50'),
(2, 'panitia1', '$2b$10$9Em8SIHKHRV5As.57BPE3O33.X4jRWmmk71.EA0hBdEh7e38lhm9S', 'panitia', 'Panitia Satu', 'panitia1@olimpiade.com', '2026-05-22 02:07:35', '2026-05-22 22:28:41'),
(3, 'dama', '$2b$10$bjbtI2xX6HjkqcgmTvYOGucuFsY4j/tkg/EW8EY08saV4p5dN917u', 'panitia', 'dama', 'dama@gmail.com', '2026-05-22 23:23:29', '2026-05-22 23:23:29');


-- 4. TABLE: peserta
CREATE TABLE peserta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100),
    asal_sekolah VARCHAR(100),
    email VARCHAR(100),
    no_wa VARCHAR(20),
    tingkat VARCHAR(10),
    bidang_lomba VARCHAR(50),
    berkas_url TEXT,
    status VARCHAR(20),
    alasan_penolakan TEXT,
    diproses_oleh INT,
    created_at DATETIME,
    updated_at DATETIME
);

INSERT INTO peserta VALUES
(1, 'Budi Santoso', 'SDN 01 Jakarta', 'budi@email.com', '081234567890', 'SD', 'Matematika', NULL, 'approved', NULL, NULL, '2026-05-22 02:07:35', '2026-05-22 02:07:35'),
(2, 'Siti Nurhaliza', 'SMPN 5 Bandung', 'siti@email.com', '081234567891', 'SMP', 'Biologi', NULL, 'approved', NULL, NULL, '2026-05-22 02:07:35', '2026-05-22 02:07:35'),
(4, 'Dewi Lestari', 'SMAN 1 Yogyakarta', 'dewi@email.com', '081234567893', 'SMA', 'Kimia', NULL, 'approved', NULL, 3, '2026-05-22 02:07:35', '2026-05-22 23:29:52'),
(5, 'Rudi Hartono', 'SMPN 2 Semarang', 'rudi@email.com', '081234567894', 'SMP', 'Matematika', NULL, 'rejected', 'peserta tidak memasukan kartu pelajar', 3, '2026-05-22 02:07:35', '2026-05-22 23:30:26'),
(6, 'Dama', 'SMP 1 Namlea', 'dama@gmail.com', '0812212121221', 'SMP', 'Matematika', 'kartu-pelajar-1779384627375-877300515.png', 'approved', NULL, 1, '2026-05-22 02:30:27', '2026-05-22 22:12:17'),
(7, 'intan cantik', 'SMA N 11 Ambon', 'intan@gmail.com', '0812121212', 'SMA', 'Ilmu Komputer', 'kartu-pelajar-1779466593053-45711399.jpeg', 'rejected', 'telat mendaftar', 3, '2026-05-23 01:16:33', '2026-05-23 01:19:35');


-- 5. TABLE: log_aktivitas
CREATE TABLE log_aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    aksi VARCHAR(50),
    detail TEXT,
    ip_address VARCHAR(50),
    created_at DATETIME
);

-- NOTE: log banyak, gue masukin sebagian biar ga bikin hidup lo makin berat
INSERT INTO log_aktivitas VALUES
(1, 1, 'LOGIN', 'User admin berhasil login', '::1', '2026-05-22 02:51:21'),
(2, 1, 'LOGIN', 'User admin berhasil login', '::1', '2026-05-22 20:02:59'),
(3, 1, 'LOGIN', 'User admin berhasil login', '::1', '2026-05-22 20:48:55'),
(11, 1, 'UPDATE_KONTEN', 'Mengupdate konten: judul_utama', '::1', '2026-05-22 21:28:42'),
(26, 1, 'UPDATE_STATUS_PESERTA', 'Mengubah status peserta ID 6 menjadi approved', '::1', '2026-05-22 22:12:17'),
(27, 1, 'DELETE_PESERTA', 'Menghapus peserta ID 3', '::1', '2026-05-22 22:12:38'),
(42, 1, 'CREATE_USER', 'Membuat user baru: dama', '::1', '2026-05-22 23:23:29'),
(47, 1, 'EXPORT_PESERTA', 'Export 4 peserta ke Excel', '::1', '2026-05-22 23:31:29'),
(62, 1, 'LOGIN', 'User admin berhasil login', '::1', '2026-05-23 01:20:03');