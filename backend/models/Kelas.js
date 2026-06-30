const mongoose = require('mongoose');

const kelasSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    tingkat: {
      type: String,
      required: true,
      enum: ['1', '2', '3', '4', '5', '6'],
    },
    waliKelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    siswa: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    tahunAjaran: String,
    semester: {
      type: String,
      enum: ['1', '2'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Kelas', kelasSchema);
