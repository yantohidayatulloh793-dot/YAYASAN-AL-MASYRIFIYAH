const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Kelas = require('../models/Kelas');
const { auth, authorizeRole } = require('../middleware/auth');

// Get semua user
router.get('/', auth, authorizeRole('admin'), async (req, res) => {
  try {
    const users = await User.find().populate('kelas', 'nama');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil data user', error: error.message });
  }
});

// Get user by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('kelas', 'nama');
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil data user', error: error.message });
  }
});

// Update user
router.put('/:id', auth, async (req, res) => {
  try {
    // User hanya bisa update data diri sendiri atau admin bisa update siapa saja
    if (req.user.userId !== req.params.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Anda tidak memiliki akses' });
    }

    const { nama, noHp, alamat, kelas } = req.body;
    const updateData = {};
    
    if (nama) updateData.nama = nama;
    if (noHp) updateData.noHp = noHp;
    if (alamat) updateData.alamat = alamat;
    if (kelas && req.user.role === 'admin') updateData.kelas = kelas;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ message: 'User berhasil diupdate', user });
  } catch (error) {
    res.status(500).json({ message: 'Error update user', error: error.message });
  }
});

// Delete user (admin only)
router.delete('/:id', auth, authorizeRole('admin'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Error delete user', error: error.message });
  }
});

module.exports = router;
