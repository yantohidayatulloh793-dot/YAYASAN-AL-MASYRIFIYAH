const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../middleware/upload');
const { auth } = require('../middleware/auth');

// Upload foto profil
router.post('/foto-profil', auth, upload.single('foto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File tidak ditemukan' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { foto: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json({ message: 'Foto berhasil diupload', user });
  } catch (error) {
    res.status(500).json({ message: 'Error upload foto', error: error.message });
  }
});

// Upload foto absensi
router.post('/foto-absensi/:absensiId', auth, upload.single('foto'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File tidak ditemukan' });
    }

    const Absensi = require('../models/Absensi');
    const absensi = await Absensi.findByIdAndUpdate(
      req.params.absensiId,
      { foto: `/uploads/${req.file.filename}` },
      { new: true }
    );

    res.json({ message: 'Foto absensi berhasil diupload', absensi });
  } catch (error) {
    res.status(500).json({ message: 'Error upload foto', error: error.message });
  }
});

module.exports = router;
