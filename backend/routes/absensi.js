const express = require('express');
const router = express.Router();
const Absensi = require('../models/Absensi');
const { auth } = require('../middleware/auth');

// Catat absensi
router.post('/', auth, async (req, res) => {
  try {
    const { kelas, tanggal, status, keterangan } = req.body;
    const userId = req.user.userId;

    // Cek absensi sudah ada
    const absensiExists = await Absensi.findOne({
      user: userId,
      kelas,
      tanggal: new Date(tanggal),
    });

    if (absensiExists) {
      return res.status(400).json({ message: 'Absensi untuk hari ini sudah tercatat' });
    }

    const absensi = new Absensi({
      user: userId,
      kelas,
      tanggal: new Date(tanggal),
      status,
      keterangan,
      jamMasuk: new Date(),
    });

    await absensi.save();
    res.status(201).json({ message: 'Absensi berhasil dicatat', absensi });
  } catch (error) {
    res.status(500).json({ message: 'Error mencatat absensi', error: error.message });
  }
});

// Dapatkan data absensi
router.get('/', auth, async (req, res) => {
  try {
    const { kelas, startDate, endDate } = req.query;
    let filter = {};

    if (kelas) filter.kelas = kelas;
    if (startDate && endDate) {
      filter.tanggal = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const absensi = await Absensi.find(filter)
      .populate('user', 'nama email')
      .populate('kelas', 'nama')
      .sort({ tanggal: -1 });

    res.json(absensi);
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil data', error: error.message });
  }
});

// Dapatkan laporan absensi
router.get('/laporan/:kelasId', auth, async (req, res) => {
  try {
    const { kelasId } = req.params;
    const { startDate, endDate } = req.query;

    const absensi = await Absensi.find({
      kelas: kelasId,
      tanggal: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    })
      .populate('user', 'nama nisn')
      .sort({ user: 1, tanggal: 1 });

    // Group by user
    const laporan = {};
    absensi.forEach((item) => {
      if (!laporan[item.user._id]) {
        laporan[item.user._id] = {
          user: item.user,
          hadir: 0,
          sakit: 0,
          izin: 0,
          alpa: 0,
          total: 0,
        };
      }
      laporan[item.user._id][item.status]++;
      laporan[item.user._id].total++;
    });

    res.json(Object.values(laporan));
  } catch (error) {
    res.status(500).json({ message: 'Error mengambil laporan', error: error.message });
  }
});

module.exports = router;
