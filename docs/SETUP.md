# Setup Guide - Aplikasi Absensi

## Prerequisites
- Node.js v14+
- MongoDB
- npm atau yarn

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yantohidayatulloh793-dot/YAYASAN-AL-MASYRIFIYAH.git
cd YAYASAN-AL-MASYRIFIYAH
```

### 2. Setup Backend
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env dengan konfigurasi Anda
```

### 3. Setup Frontend
```bash
cd frontend
npm install
```

### 4. Setup Database
```bash
# Pastikan MongoDB berjalan di mesin Anda
# Default: mongodb://localhost:27017
```

## Running Application

### Development Mode

#### Terminal 1 - Backend
```bash
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm start
```

### Production Build
```bash
# Build frontend
npm run build

# Run backend
npm start
```

## Default Access
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API**: http://localhost:5000/api

## Troubleshooting

### MongoDB Connection Error
- Pastikan MongoDB service berjalan
- Check MONGODB_URI di .env

### Port Already in Use
- Change PORT di .env (default: 5000)
- Change port di frontend package.json
