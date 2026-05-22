const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Semua routes di sini hanya untuk Admin
router.use(verifyToken, isAdmin);

// User management
router.get('/users', adminController.getAllUsers);
router.post('/users', adminController.createUser);
router.put('/users/:id', adminController.updateUser);
router.delete('/users/:id', adminController.deleteUser);

// Konten halaman
router.get('/konten', adminController.getKontenHalaman);
router.put('/konten', adminController.updateKontenHalaman);

// Export
router.get('/export/peserta', adminController.exportPesertaExcel);

module.exports = router;
