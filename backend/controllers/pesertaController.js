const db = require('../config/database');
const path = require('path');
const fs = require('fs');

// Daftar peserta baru (Public)
exports.daftarPeserta = async (req, res) => {
  try {
    const { nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba } = req.body;

    // Validasi input
    if (!nama || !asal_sekolah || !email || !no_wa || !tingkat || !bidang_lomba) {
      return res.status(400).json({ 
        success: false, 
        message: 'Semua field harus diisi.' 
      });
    }

    // Validasi tingkat dan bidang lomba
    const validBidangLomba = {
      'SD': ['Matematika', 'IPA'],
      'SMP': ['Matematika', 'Biologi'],
      'SMA': ['Matematika', 'Biologi', 'Fisika', 'Astronomi', 'Kimia', 'Ilmu Komputer', 'Statistika']
    };

    if (!validBidangLomba[tingkat] || !validBidangLomba[tingkat].includes(bidang_lomba)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Bidang lomba tidak valid untuk tingkat yang dipilih.' 
      });
    }

    // Cek apakah ada file upload
    const berkas_url = req.file ? req.file.filename : null;

    // Insert ke database
    const [result] = await db.query(
      `INSERT INTO peserta (nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba, berkas_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba, berkas_url]
    );

    res.status(201).json({
      success: true,
      message: 'Pendaftaran berhasil! Silakan tunggu konfirmasi dari panitia.',
      data: {
        id: result.insertId
      }
    });

  } catch (error) {
    console.error('Daftar peserta error:', error);
    
    // Hapus file jika ada error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get peserta yang sudah approved (Public)
exports.getPesertaApproved = async (req, res) => {
  try {
    const { search } = req.query;

    let query = `
      SELECT id, nama, asal_sekolah, tingkat, bidang_lomba, created_at 
      FROM peserta 
      WHERE status = 'approved'
    `;
    const params = [];

    if (search) {
      query += ` AND (nama LIKE ? OR asal_sekolah LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY created_at DESC`;

    const [peserta] = await db.query(query, params);

    res.json({
      success: true,
      data: peserta
    });

  } catch (error) {
    console.error('Get peserta approved error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get semua peserta (Admin & Panitia)
exports.getAllPeserta = async (req, res) => {
  try {
    const { status, tingkat, bidang_lomba, search } = req.query;

    let query = `
      SELECT p.*, u.nama_lengkap as diproses_oleh_nama
      FROM peserta p
      LEFT JOIN users u ON p.diproses_oleh = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      query += ` AND p.status = ?`;
      params.push(status);
    }

    if (tingkat) {
      query += ` AND p.tingkat = ?`;
      params.push(tingkat);
    }

    if (bidang_lomba) {
      query += ` AND p.bidang_lomba = ?`;
      params.push(bidang_lomba);
    }

    if (search) {
      query += ` AND (p.nama LIKE ? OR p.asal_sekolah LIKE ? OR p.email LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY p.created_at DESC`;

    const [peserta] = await db.query(query, params);

    res.json({
      success: true,
      data: peserta
    });

  } catch (error) {
    console.error('Get all peserta error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get peserta by ID
exports.getPesertaById = async (req, res) => {
  try {
    const { id } = req.params;

    const [peserta] = await db.query(
      `SELECT p.*, u.nama_lengkap as diproses_oleh_nama
       FROM peserta p
       LEFT JOIN users u ON p.diproses_oleh = u.id
       WHERE p.id = ?`,
      [id]
    );

    if (peserta.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Peserta tidak ditemukan.' 
      });
    }

    res.json({
      success: true,
      data: peserta[0]
    });

  } catch (error) {
    console.error('Get peserta by ID error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Update status peserta (Admin & Panitia)
exports.updateStatusPeserta = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, alasan_penolakan } = req.body;

    // Validasi status
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Status tidak valid.' 
      });
    }

    // Jika rejected, alasan harus diisi
    if (status === 'rejected' && !alasan_penolakan) {
      return res.status(400).json({ 
        success: false, 
        message: 'Alasan penolakan harus diisi.' 
      });
    }

    // Update status
    await db.query(
      `UPDATE peserta 
       SET status = ?, alasan_penolakan = ?, diproses_oleh = ?, updated_at = NOW()
       WHERE id = ?`,
      [status, alasan_penolakan || null, req.user.id, id]
    );

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'UPDATE_STATUS_PESERTA', `Mengubah status peserta ID ${id} menjadi ${status}`, req.ip]
    );

    res.json({
      success: true,
      message: `Status peserta berhasil diubah menjadi ${status}.`
    });

  } catch (error) {
    console.error('Update status peserta error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Delete peserta (Admin only)
exports.deletePeserta = async (req, res) => {
  try {
    const { id } = req.params;

    // Get berkas_url untuk hapus file
    const [peserta] = await db.query('SELECT berkas_url FROM peserta WHERE id = ?', [id]);

    if (peserta.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Peserta tidak ditemukan.' 
      });
    }

    // Hapus file jika ada
    if (peserta[0].berkas_url) {
      const filePath = path.join(process.env.UPLOAD_DIR || 'uploads', peserta[0].berkas_url);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete dari database
    await db.query('DELETE FROM peserta WHERE id = ?', [id]);

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'DELETE_PESERTA', `Menghapus peserta ID ${id}`, req.ip]
    );

    res.json({
      success: true,
      message: 'Peserta berhasil dihapus.'
    });

  } catch (error) {
    console.error('Delete peserta error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get statistik (Admin only)
exports.getStatistik = async (req, res) => {
  try {
    // Total peserta per status
    const [statusStats] = await db.query(`
      SELECT status, COUNT(*) as jumlah 
      FROM peserta 
      GROUP BY status
    `);

    // Total peserta per tingkat
    const [tingkatStats] = await db.query(`
      SELECT tingkat, COUNT(*) as jumlah 
      FROM peserta 
      WHERE status = 'approved'
      GROUP BY tingkat
    `);

    // Total peserta per bidang lomba
    const [bidangStats] = await db.query(`
      SELECT bidang_lomba, COUNT(*) as jumlah 
      FROM peserta 
      WHERE status = 'approved'
      GROUP BY bidang_lomba
      ORDER BY jumlah DESC
    `);

    // Total peserta per tingkat dan bidang
    const [tingkatBidangStats] = await db.query(`
      SELECT tingkat, bidang_lomba, COUNT(*) as jumlah 
      FROM peserta 
      WHERE status = 'approved'
      GROUP BY tingkat, bidang_lomba
      ORDER BY tingkat, bidang_lomba
    `);

    res.json({
      success: true,
      data: {
        status: statusStats,
        tingkat: tingkatStats,
        bidang_lomba: bidangStats,
        tingkat_bidang: tingkatBidangStats
      }
    });

  } catch (error) {
    console.error('Get statistik error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};
