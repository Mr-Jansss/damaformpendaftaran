const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/authRoutes');
const pesertaRoutes = require('./routes/pesertaRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 100, // limit 100 requests per windowMs
  message: 'Terlalu banyak request dari IP ini, silakan coba lagi nanti.'
});

app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 jam
  }
}));

// Static files untuk uploads
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_DIR || 'uploads')));

// Static files untuk frontend (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/peserta', pesertaRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint tidak ditemukan.' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  // Multer error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      success: false, 
      message: 'Ukuran file terlalu besar. Maksimal 5MB.' 
    });
  }

  if (err.message && err.message.includes('file')) {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }

  res.status(500).json({ 
    success: false, 
    message: 'Terjadi kesalahan pada server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Server Olimpiade Sains Running                  ║
║                                                       ║
║   📍 Port: ${PORT}                                    ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}              ║
║   📅 Started at: ${new Date().toLocaleString('id-ID')}   ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
