const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log('🔐 Login attempt:', { username, password: '***' });

    // Validasi input
    if (!username || !password) {
      console.log('❌ Validation failed: Missing username or password');
      return res.status(400).json({ 
        success: false, 
        message: 'Username dan password harus diisi.' 
      });
    }

    // Cari user berdasarkan username
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (users.length === 0) {
      console.log('❌ User not found:', username);
      return res.status(401).json({ 
        success: false, 
        message: 'Username atau password salah.' 
      });
    }

    const user = users[0];
    console.log('✅ User found:', { id: user.id, username: user.username, role: user.role });

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('🔑 Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Invalid password for user:', username);
      return res.status(401).json({ 
        success: false, 
        message: 'Username atau password salah.' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role,
        nama_lengkap: user.nama_lengkap
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Simpan token di session (opsional)
    req.session.token = token;
    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role,
      nama_lengkap: user.nama_lengkap
    };

    // Log aktivitas
    await db.query(
      'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
      [user.id, 'LOGIN', `User ${username} berhasil login`, req.ip]
    );

    console.log('✅ Login successful for user:', username);

    res.json({
      success: true,
      message: 'Login berhasil.',
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          nama_lengkap: user.nama_lengkap,
          email: user.email
        }
      }
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    // Log aktivitas
    if (req.user) {
      await db.query(
        'INSERT INTO log_aktivitas (user_id, aksi, detail, ip_address) VALUES (?, ?, ?, ?)',
        [req.user.id, 'LOGOUT', `User ${req.user.username} logout`, req.ip]
      );
    }

    // Hapus session
    req.session.destroy();

    res.json({
      success: true,
      message: 'Logout berhasil.'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, username, role, nama_lengkap, email, created_at FROM users WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User tidak ditemukan.' 
      });
    }

    res.json({
      success: true,
      data: users[0]
    });

  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Terjadi kesalahan pada server.' 
    });
  }
};
