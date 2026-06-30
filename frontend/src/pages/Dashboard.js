import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalAbsensi: 0,
    hadir: 0,
    sakit: 0,
    izin: 0,
    alpa: 0,
  });
  const [activeNav, setActiveNav] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(userData);
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/absensi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const absensiData = response.data;

      let hadir = 0,
        sakit = 0,
        izin = 0,
        alpa = 0;
      absensiData.forEach((item) => {
        if (item.status === 'hadir') hadir++;
        else if (item.status === 'sakit') sakit++;
        else if (item.status === 'izin') izin++;
        else if (item.status === 'alpa') alpa++;
      });

      setStats({
        totalAbsensi: absensiData.length,
        hadir,
        sakit,
        izin,
        alpa,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Aplikasi Absensi</h1>
            <p className="text-blue-100 text-sm">YAYASAN AL MASYRIFIYAH</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Selamat datang, {user?.nama}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-4 overflow-x-auto">
          <Link
            to="#"
            onClick={() => setActiveNav('dashboard')}
            className={`px-4 py-2 rounded font-semibold ${
              activeNav === 'dashboard'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="#"
            onClick={() => setActiveNav('absensi')}
            className={`px-4 py-2 rounded font-semibold ${
              activeNav === 'absensi' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Catat Absensi
          </Link>
          <Link
            to="#"
            onClick={() => setActiveNav('laporan')}
            className={`px-4 py-2 rounded font-semibold ${
              activeNav === 'laporan' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Laporan
          </Link>
          {isAdmin && (
            <>
              <Link
                to="#"
                onClick={() => setActiveNav('kelas')}
                className={`px-4 py-2 rounded font-semibold ${
                  activeNav === 'kelas' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Manajemen Kelas
              </Link>
              <Link
                to="#"
                onClick={() => setActiveNav('users')}
                className={`px-4 py-2 rounded font-semibold ${
                  activeNav === 'users' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Manajemen User
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeNav === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Absensi</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.totalAbsensi}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Hadir</h3>
                <p className="text-3xl font-bold text-green-600">{stats.hadir}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Sakit</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats.sakit}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Izin</h3>
                <p className="text-3xl font-bold text-orange-600">{stats.izin}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Alpa</h3>
                <p className="text-3xl font-bold text-red-600">{stats.alpa}</p>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
              <p className="text-gray-600">
                Anda login sebagai <span className="font-semibold">{user?.role}</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">Gunakan menu navigasi untuk mengakses fitur aplikasi</p>
            </div>
          </div>
        )}

        {activeNav === 'absensi' && <AbsensiPage />}
        {activeNav === 'laporan' && <LaporanPage />}
        {activeNav === 'kelas' && <ManageKelas />}
        {activeNav === 'users' && <ManageUsers />}
      </main>
    </div>
  );
}

// Component Absensi
function AbsensiPage() {
  const [formData, setFormData] = useState({
    kelas: '',
    tanggal: new Date().toISOString().split('T')[0],
    status: 'hadir',
    keterangan: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/absensi`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Absensi berhasil dicatat!');
      setFormData({
        kelas: '',
        tanggal: new Date().toISOString().split('T')[0],
        status: 'hadir',
        keterangan: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Catat Absensi</h2>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Kelas</label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="hadir">Hadir</option>
            <option value="sakit">Sakit</option>
            <option value="izin">Izin</option>
            <option value="alpa">Alpa</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Keterangan</label>
          <textarea
            name="keterangan"
            value={formData.keterangan}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            rows="4"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          {loading ? 'Menyimpan...' : 'Simpan Absensi'}
        </button>
      </form>
    </div>
  );
}

// Component Laporan
function LaporanPage() {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    kelas: '',
    startDate: '',
    endDate: '',
  });

  const fetchLaporan = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/absensi`, {
        params: filters,
        headers: { Authorization: `Bearer ${token}` },
      });
      setLaporan(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6">Laporan Absensi</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Kelas"
          value={filters.kelas}
          onChange={(e) => setFilters({ ...filters, kelas: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          value={filters.startDate}
          onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <input
          type="date"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <button
        onClick={fetchLaporan}
        disabled={loading}
        className="mb-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold"
      >
        {loading ? 'Loading...' : 'Tampilkan Laporan'}
      </button>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2 text-left">Nama</th>
              <th className="border px-4 py-2 text-left">Kelas</th>
              <th className="border px-4 py-2 text-left">Tanggal</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {laporan.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{item.user?.nama}</td>
                <td className="border px-4 py-2">{item.kelas?.nama}</td>
                <td className="border px-4 py-2">{new Date(item.tanggal).toLocaleDateString('id-ID')}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      item.status === 'hadir'
                        ? 'bg-green-500'
                        : item.status === 'sakit'
                        ? 'bg-yellow-500'
                        : item.status === 'izin'
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="border px-4 py-2">{item.keterangan || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import ManageKelas from './ManageKelas';
import ManageUsers from './ManageUsers';

export default Dashboard;
