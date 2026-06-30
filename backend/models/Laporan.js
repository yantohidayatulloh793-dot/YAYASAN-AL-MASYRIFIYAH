const mongoose = require('mongoose');

const laporanSchema = new mongoose.Schema(
  {
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas',
      required: true,
    },
    tanggalMulai: {
      type: Date,
      required: true,
    },
    tanggalAkhir: {
      type: Date,
      required: true,
    },
    bulanTahun: String,
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    data: [{
      siswa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      hadir: Number,
      sakit: Number,
      izin: Number,
      alpa: Number,
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Laporan', laporanSchema);
