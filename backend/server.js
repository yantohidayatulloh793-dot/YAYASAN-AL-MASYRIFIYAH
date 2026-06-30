require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi Database
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/absensi', require('./routes/absensi'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server berjalan dengan baik' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
