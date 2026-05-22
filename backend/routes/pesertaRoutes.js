const express = require('express');
const router = express.Router();
const pesertaController = require('../controllers/pesertaController');
const { verifyToken, isAdmin, isAdminOrPanitia } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.post('/daftar', upload.single('berkas'), pesertaController.daftarPeserta);
router.get('/approved', pesertaController.getPesertaApproved);

// Protected routes (Admin & Panitia)
router.get('/', verifyToken, isAdminOrPanitia, pesertaController.getAllPeserta);
router.get('/statistik', verifyToken, isAdmin, pesertaController.getStatistik);
router.get('/:id', verifyToken, isAdminOrPanitia, pesertaController.getPesertaById);
router.put('/:id/status', verifyToken, isAdminOrPanitia, pesertaController.updateStatusPeserta);
router.delete('/:id', verifyToken, isAdmin, pesertaController.deletePeserta);

module.exports = router;
