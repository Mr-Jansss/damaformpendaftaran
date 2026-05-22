const jwt = require('jsonwebtoken');

// Middleware untuk verifikasi JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1] || req.session?.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token tidak ditemukan. Silakan login terlebih dahulu.' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token tidak valid atau sudah kadaluarsa.' 
    });
  }
};

// Middleware untuk verifikasi role Admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses ditolak. Hanya Admin yang dapat mengakses.' 
    });
  }
  next();
};

// Middleware untuk verifikasi role Admin atau Panitia
const isAdminOrPanitia = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'panitia') {
    return res.status(403).json({ 
      success: false, 
      message: 'Akses ditolak. Hanya Admin atau Panitia yang dapat mengakses.' 
    });
  }
  next();
};

module.exports = {
  verifyToken,
  isAdmin,
  isAdminOrPanitia
};
