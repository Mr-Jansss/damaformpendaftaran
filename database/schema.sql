-- ============================================
-- SKEMA DATABASE SISTEM PENDAFTARAN OLIMPIADE
-- ============================================

-- Buat database
CREATE DATABASE IF NOT EXISTS olimpiade_sains CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE olimpiade_sains;

-- Tabel Users (Admin & Panitia)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'panitia') NOT NULL DEFAULT 'panitia',
    nama_lengkap VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Peserta
CREATE TABLE IF NOT EXISTS peserta (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    asal_sekolah VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    no_wa VARCHAR(20) NOT NULL,
    tingkat ENUM('SD', 'SMP', 'SMA') NOT NULL,
    bidang_lomba VARCHAR(50) NOT NULL,
    berkas_url VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    alasan_penolakan TEXT,
    diproses_oleh INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_tingkat (tingkat),
    INDEX idx_bidang_lomba (bidang_lomba),
    INDEX idx_nama (nama),
    INDEX idx_asal_sekolah (asal_sekolah),
    FOREIGN KEY (diproses_oleh) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Konten Halaman
CREATE TABLE IF NOT EXISTS konten_halaman (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kunci_konten VARCHAR(50) UNIQUE NOT NULL,
    isi_konten TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_kunci (kunci_konten)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabel Log Aktivitas (Opsional untuk audit trail)
CREATE TABLE IF NOT EXISTS log_aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    aksi VARCHAR(100) NOT NULL,
    detail TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
