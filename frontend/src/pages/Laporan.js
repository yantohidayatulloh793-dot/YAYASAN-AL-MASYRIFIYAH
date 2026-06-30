import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Laporan() {
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

  useEffect(() => {
    fetchLaporan();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-6">Laporan Absensi</h1>

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
    </div>
  );
}

export default Laporan;
