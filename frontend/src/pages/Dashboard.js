import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/absensi`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Process stats here
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Selamat datang, {user?.nama}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-semibold">Total Kehadiran</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-semibold">Sakit</h3>
            <p className="text-3xl font-bold text-yellow-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-semibold">Izin</h3>
            <p className="text-3xl font-bold text-orange-600">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-700 text-sm font-semibold">Alpa</h3>
            <p className="text-3xl font-bold text-red-600">0</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/absensi')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold"
          >
            Catat Absensi
          </button>
          <button
            onClick={() => navigate('/laporan')}
            className="bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-semibold"
          >
            Lihat Laporan
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-semibold"
          >
            Manajemen Kelas
          </button>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
