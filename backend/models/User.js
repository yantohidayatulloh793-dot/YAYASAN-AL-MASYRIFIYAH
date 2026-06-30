const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'guru', 'karyawan', 'siswa'],
      default: 'siswa',
    },
    nip: {
      type: String,
      unique: true,
      sparse: true,
    },
    nisn: {
      type: String,
      unique: true,
      sparse: true,
    },
    noHp: String,
    alamat: String,
    foto: String,
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas',
    },
    aktif: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password sebelum save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method untuk compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
