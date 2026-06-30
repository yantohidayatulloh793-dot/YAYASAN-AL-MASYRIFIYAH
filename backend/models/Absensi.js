const mongoose = require('mongoose');

const absensiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas',
      required: true,
    },
    tanggal: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['hadir', 'sakit', 'izin', 'alpa'],
      required: true,
    },
    keterangan: String,
    jamMasuk: Date,
    jamKeluar: Date,
    latitude: Number,
    longitude: Number,
    foto: String,
  },
  { timestamps: true }
);

// Index untuk query yang efisien
absensiSchema.index({ user: 1, tanggal: 1 });
absensiSchema.index({ kelas: 1, tanggal: 1 });

module.exports = mongoose.model('Absensi', absensiSchema);
