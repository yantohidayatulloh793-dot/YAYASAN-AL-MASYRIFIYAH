# API Documentation - Aplikasi Absensi

## Base URL
`http://localhost:5000/api`

## Authentication
Semua endpoint yang memerlukan autentikasi menggunakan JWT token di header:
```
Authorization: Bearer <token>
```

## Endpoints

### 1. Authentication

#### Register
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "nama": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "siswa"
  }
  ```

#### Login
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### 2. Absensi

#### Catat Absensi
- **POST** `/absensi`
- **Auth**: Required
- **Body**:
  ```json
  {
    "kelas": "kelas_id",
    "tanggal": "2026-06-30",
    "status": "hadir",
    "keterangan": ""
  }
  ```

#### Ambil Data Absensi
- **GET** `/absensi`
- **Auth**: Required
- **Query Parameters**:
  - `kelas` (optional)
  - `startDate` (optional)
  - `endDate` (optional)

#### Ambil Laporan Absensi
- **GET** `/absensi/laporan/:kelasId`
- **Auth**: Required
- **Query Parameters**:
  - `startDate` (required)
  - `endDate` (required)

## Status Code
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `500` - Internal Server Error
