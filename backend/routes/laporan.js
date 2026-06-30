const express = require('express');
const router = express.Router();
const Absensi = require('../models/Absensi');
const Laporan = require('../models/Laporan');
const User = require('../models/User');
const Kelas = require('../models/Kelas');
const { auth, authorizeRole } = require('../middleware/auth');

// Generate laporan bulanan
router.post('/generate', auth, authorizeRole('admin', 'guru'), async (req, res) => {
  try {
    const { kelasId, tanggalMulai, tanggalAkhir } = req.body;

    // Get semua absensi dalam range
    const absensi = await Absensi.find({
      kelas: kelasId,
      tanggal: {
        $gte: new Date(tanggalMulai),
        $lte: new Date(tanggalAkhir),
      },
    }).populate('user');

    // Group by siswa
    const groupedData = {};
    absensi.forEach((item) => {
      if (!groupedData[item.user._id]) {
        groupedData[item.user._id] = {
          siswa: item.user._id,
          hadir: 0,
          sakit: 0,
          izin: 0,
          alpa: 0,
        };
      }
      groupedData[item.user._id][item.status]++;
    });

    const laporan = new Laporan({
      kelas: kelasId,
      tanggalMulai,
      tanggalAkhir,
      generatedBy: req.user.userId,
      data: Object.values(groupedData),
      bulanTahun: new Date(tanggalMulai).toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      }),
    });

    await laporan.save();
    res.status(201).json({ message: 'Laporan berhasil dibuat', laporan });
  } catch (error) {
    res.status(500).json({ message: 'Error membuat laporan', error: error.message });
  }
});

// Get semua laporan
router.get('/', auth, async (req, res) => {
  try {
    const laporans = await Laporan.find()
      .populate('kelas', 'nama')
      .populate('generatedBy', 'nama')
      .populate('data.siswa', 'nama nisn')
      .sort({ createdAt: -1 });
    res.json(laporans);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil laporan', error: error.message });
  }
});

// Get laporan by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const laporan = await Laporan.findById(req.params.id)
      .populate('kelas', 'nama')
      .populate('generatedBy', 'nama')
      .populate('data.siswa', 'nama nisn email');

    if (!laporan) {
      return res.status(404).json({ message: 'Laporan tidak ditemukan' });
    }
    res.json(laporan);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil laporan', error: error.message });
  }
});

// Get laporan by kelas
router.get('/kelas/:kelasId', auth, async (req, res) => {
  try {
    const laporans = await Laporan.find({ kelas: req.params.kelasId })
      .populate('kelas', 'nama')
      .populate('data.siswa', 'nama nisn')
      .sort({ createdAt: -1 });
    res.json(laporans);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil laporan', error: error.message });
  }
});

module.exports = router;
