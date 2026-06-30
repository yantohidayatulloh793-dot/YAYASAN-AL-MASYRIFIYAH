const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yayasan-absensi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB berhasil terhubung');
  } catch (error) {
    console.error('Error koneksi MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
