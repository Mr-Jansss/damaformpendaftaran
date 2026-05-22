const bcrypt = require('bcrypt');
const db = require('../config/database');
const ExcelJS = require('exceljs');

// Get semua user (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, username, role, nama_lengkap, email, created_at FROM users ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      data: users
    });

  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Create user panitia (Admin only)
exports.createUser = async (req, res) => {
  try {
    const { username, password, nama_lengkap, email, role } = req.body;

    // Validasi input
    if (!username || !password || !nama_lengkap) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username, password, dan nama lengkap harus diisi.' 
      });
    }

    // Validasi role
    if (role && !['admin', 'panitia'].includes(role)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Role tidak valid.' 
      });
    }

    // Cek apakah username sudah ada
    const [existingUser] = await db.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Username sudah digunakan.' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user baru
    const [result] = await db.query(
      'INSERT INTO users (username, password, role, nama_lengkap, email) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, role || 'panitia', nama_lengkap, email]
    );

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'CREATE_USER', `Membuat user baru: ${username}`, req.ip]
    );

    res.status(201).json({
      success: true,
      message: 'User berhasil dibuat.',
      data: {
        id: result.insertId,
        username,
        role: role || 'panitia',
        nama_lengkap
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Update user (Admin only)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, nama_lengkap, email, role } = req.body;

    // Cek apakah user ada
    const [users] = await db.query('SELECT id FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User tidak ditemukan.' 
      });
    }

    // Build update query
    let updateFields = [];
    let params = [];

    if (username) {
      // Cek apakah username sudah digunakan user lain
      const [existingUser] = await db.query(
        'SELECT id FROM users WHERE username = ? AND id != ?',
        [username, id]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Username sudah digunakan.' 
        });
      }

      updateFields.push('username = ?');
      params.push(username);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push('password = ?');
      params.push(hashedPassword);
    }

    if (nama_lengkap) {
      updateFields.push('nama_lengkap = ?');
      params.push(nama_lengkap);
    }

    if (email !== undefined) {
      updateFields.push('email = ?');
      params.push(email);
    }

    if (role && ['admin', 'panitia'].includes(role)) {
      updateFields.push('role = ?');
      params.push(role);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tidak ada data yang diupdate.' 
      });
    }

    params.push(id);

    await db.query(
      `UPDATE users SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      params
    );

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'UPDATE_USER', `Mengupdate user ID ${id}`, req.ip]
    );

    res.json({
      success: true,
      message: 'User berhasil diupdate.'
    });

  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Tidak boleh hapus diri sendiri
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tidak dapat menghapus akun sendiri.' 
      });
    }

    // Cek apakah user ada
    const [users] = await db.query('SELECT username FROM users WHERE id = ?', [id]);

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User tidak ditemukan.' 
      });
    }

    // Delete user
    await db.query('DELETE FROM users WHERE id = ?', [id]);

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'DELETE_USER', `Menghapus user: ${users[0].username}`, req.ip]
    );

    res.json({
      success: true,
      message: 'User berhasil dihapus.'
    });

  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get konten halaman
exports.getKontenHalaman = async (req, res) => {
  try {
    const [konten] = await db.query('SELECT * FROM konten_halaman ORDER BY kunci_konten');

    // Convert array to object
    const kontenObj = {};
    konten.forEach(item => {
      kontenObj[item.kunci_konten] = item.isi_konten;
    });

    res.json({
      success: true,
      data: kontenObj
    });

  } catch (error) {
    console.error('Get konten halaman error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Update konten halaman (Admin only)
exports.updateKontenHalaman = async (req, res) => {
  try {
    const { kunci_konten, isi_konten } = req.body;

    if (!kunci_konten || !isi_konten) {
      return res.status(400).json({ 
        success: false, 
        message: 'Kunci konten dan isi konten harus diisi.' 
      });
    }

    // Update atau insert
    await db.query(
      `INSERT INTO konten_halaman (kunci_konten, isi_konten) 
       VALUES (?, ?) 
       ON DUPLICATE KEY UPDATE isi_konten = ?, updated_at = NOW()`,
      [kunci_konten, isi_konten, isi_konten]
    );

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'UPDATE_KONTEN', `Mengupdate konten: ${kunci_konten}`, req.ip]
    );

    res.json({
      success: true,
      message: 'Konten halaman berhasil diupdate.'
    });

  } catch (error) {
    console.error('Update konten halaman error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Export peserta approved ke Excel (Admin only)
exports.exportPesertaExcel = async (req, res) => {
  try {
    // Get data peserta approved
    const [peserta] = await db.query(`
      SELECT 
        id, nama, asal_sekolah, email, no_wa, tingkat, bidang_lomba, created_at
      FROM peserta 
      WHERE status = 'approved'
      ORDER BY tingkat, bidang_lomba, nama
    `);

    // Create workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Peserta Olimpiade');

    // Define columns
    worksheet.columns = [
      { header: 'No', key: 'no', width: 5 },
      { header: 'Nama Lengkap', key: 'nama', width: 30 },
      { header: 'Asal Sekolah', key: 'asal_sekolah', width: 35 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'No. WhatsApp', key: 'no_wa', width: 18 },
      { header: 'Tingkat', key: 'tingkat', width: 10 },
      { header: 'Bidang Lomba', key: 'bidang_lomba', width: 20 },
      { header: 'Tanggal Daftar', key: 'created_at', width: 20 }
    ];

    // Style header
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF6B00' }
    };
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    // Add data
    peserta.forEach((p, index) => {
      worksheet.addRow({
        no: index + 1,
        nama: p.nama,
        asal_sekolah: p.asal_sekolah,
        email: p.email,
        no_wa: p.no_wa,
        tingkat: p.tingkat,
        bidang_lomba: p.bidang_lomba,
        created_at: new Date(p.created_at).toLocaleString('id-ID')
      });
    });

    // Set response headers
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=peserta-olimpiade-${Date.now()}.xlsx`
    );

    // Write to response
    await workbook.xlsx.write(res);

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [req.user.id, 'EXPORT_PESERTA', `Export ${peserta.length} peserta ke Excel`, req.ip]
    );

    res.end();

  } catch (error) {
    console.error('Export peserta error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};
