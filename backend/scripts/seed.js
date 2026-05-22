const bcrypt = require('bcrypt');
const db = require('../config/database');

async function seed() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10);
    const panitiaPassword = await bcrypt.hash('panitia123', 10);

    // Insert users
    console.log('👤 Creating users...');
    await db.query(`
      INSERT INTO users (username, password, role, nama_lengkap, email) VALUES
      ('admin', ?, 'admin', 'Administrator', 'admin@olimpiade.com'),
      ('panitia1', ?, 'panitia', 'Panitia Satu', 'panitia1@olimpiade.com')
      ON DUPLICATE KEY UPDATE password = VALUES(password)
    `, [adminPassword, panitiaPassword]);
    console.log('✅ Users created\n');

    // Insert konten halaman
    console.log('📄 Creating page content...');
    await db.query(`
      INSERT INTO konten_halaman (kunci_konten, isi_konten) VALUES
      ('judul_utama', 'Olimpiade Sains Nasional 2026'),
      ('deskripsi_singkat', 'Bergabunglah dalam kompetisi sains terbesar untuk siswa SD, SMP, dan SMA se-Indonesia. Tunjukkan kemampuan terbaikmu!'),
      ('tanggal_pelaksanaan', '15 Juli - 20 Juli 2026'),
      ('lokasi', 'Jakarta Convention Center'),
      ('kontak_info', 'Email: info@olimpiade.com | WhatsApp: +62 812-3456-7890'),
      ('pengumuman', 'Pendaftaran dibuka hingga 30 Juni 2026. Segera daftarkan dirimu!'),
      ('syarat_ketentuan', '1. Peserta adalah siswa aktif SD/SMP/SMA\n2. Melampirkan kartu pelajar yang masih berlaku\n3. Satu peserta hanya boleh mendaftar satu bidang lomba\n4. Keputusan panitia tidak dapat diganggu gugat')
      ON DUPLICATE KEY UPDATE isi_konten = VALUES(isi_konten)
    `);
    console.log('✅ Page content created\n');

    // Insert sample peserta
    console.log('👨‍🎓 Creating sample participants...');
    await db.query(`
      INSERT INTO peserta (nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba, status) VALUES
      ('Budi Santoso', 'SDN 01 Jakarta', 'budi@email.com', '081234567890', 'SD', 'Matematika', 'approved'),
      ('Siti Nurhaliza', 'SMPN 5 Bandung', 'siti@email.com', '081234567891', 'SMP', 'Biologi', 'approved'),
      ('Ahmad Fauzi', 'SMAN 3 Surabaya', 'ahmad@email.com', '081234567892', 'SMA', 'Fisika', 'approved'),
      ('Dewi Lestari', 'SMAN 1 Yogyakarta', 'dewi@email.com', '081234567893', 'SMA', 'Kimia', 'pending'),
      ('Rudi Hartono', 'SMPN 2 Semarang', 'rudi@email.com', '081234567894', 'SMP', 'Matematika', 'pending')
    `);
    console.log('✅ Sample participants created\n');

    console.log('🎉 Seeding completed successfully!\n');
    console.log('📝 Default credentials:');
    console.log('   Admin    - username: admin     | password: admin123');
    console.log('   Panitia  - username: panitia1  | password: panitia123\n');

    process.exit(0);

  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
