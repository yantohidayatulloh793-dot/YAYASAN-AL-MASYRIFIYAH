const express = require('express');
const router = express.Router();
const Kelas = require('../models/Kelas');
const User = require('../models/User');
const { auth, authorizeRole } = require('../middleware/auth');

// Get semua kelas
router.get('/', auth, async (req, res) => {
  try {
    const kelas = await Kelas.find()
      .populate('waliKelas', 'nama')
      .populate('siswa', 'nama nisn');
    res.json(kelas);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil data kelas', error: error.message });
  }
});

// Get kelas by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const kelas = await Kelas.findById(req.params.id)
      .populate('waliKelas', 'nama')
      .populate('siswa', 'nama nisn');
    if (!kelas) {
      return res.status(404).json({ message: 'Kelas tidak ditemukan' });
    }
    res.json(kelas);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil data kelas', error: error.message });
  }
});

// Create kelas (admin only)
router.post('/', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const { nama, tingkat, waliKelas, tahunAjaran, semester } = req.body;

    const kelas = new Kelas({
      nama,
      tingkat,
      waliKelas,
      tahunAjaran,
      semester,
    });

    await kelas.save();
    res.status(201).json({ message: 'Kelas berhasil dibuat', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Error membuat kelas', error: error.message });
  }
});

// Update kelas (admin only)
router.put('/:id', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const kelas = await Kelas.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: 'Kelas berhasil diupdate', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Error update kelas', error: error.message });
  }
});

// Delete kelas (admin only)
router.delete('/:id', auth, authorizeRole('admin'), async (req, res) => {
  try {
    await Kelas.findByIdAndDelete(req.params.id);
    res.json({ message: 'Kelas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Error delete kelas', error: error.message });
  }
});

// Add siswa ke kelas
router.post('/:id/add-siswa', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const { siswaId } = req.body;
    const kelas = await Kelas.findById(req.params.id);

    if (!kelas.siswa.includes(siswaId)) {
      kelas.siswa.push(siswaId);
      await kelas.save();
    }

    // Update user kelas
    await User.findByIdAndUpdate(siswaId, { kelas: req.params.id });

    res.json({ message: 'Siswa berhasil ditambahkan ke kelas', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Error menambah siswa', error: error.message });
  }
});

// Remove siswa dari kelas
router.post('/:id/remove-siswa', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const { siswaId } = req.body;
    const kelas = await Kelas.findById(req.params.id);

    kelas.siswa = kelas.siswa.filter(id => id.toString() !== siswaId);
    await kelas.save();

    // Update user kelas
    await User.findByIdAndUpdate(siswaId, { kelas: null });

    res.json({ message: 'Siswa berhasil dihapus dari kelas', kelas });
  } catch (error) {
    res.status(500).json({ message: 'Error menghapus siswa', error: error.message });
  }
});

module.exports = router;
