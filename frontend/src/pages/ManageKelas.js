import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ManageKelas() {
  const [kelas, setKelas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    tingkat: '',
    tahunAjaran: '',
    semester: '',
    waliKelas: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchKelas();
  }, []);

  const fetchKelas = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/kelas`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKelas(response.data);
    } catch (err) {
      setError('Error mengambil data kelas');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      if (user.role !== 'admin') {
        setError('Hanya admin yang dapat membuat/edit kelas');
        return;
      }

      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/kelas/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Kelas berhasil diupdate');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/kelas`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Kelas berhasil dibuat');
      }

      setFormData({
        nama: '',
        tingkat: '',
        tahunAjaran: '',
        semester: '',
        waliKelas: '',
      });
      setEditingId(null);
      setShowForm(false);
      fetchKelas();
    } catch (err) {
      setError(err.response?.data?.message || 'Error menyimpan kelas');
    }
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${process.env.REACT_APP_API_URL}/kelas/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSuccess('Kelas berhasil dihapus');
        fetchKelas();
      } catch (err) {
        setError('Error menghapus kelas');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Manajemen Kelas</h1>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
                setFormData({
                  nama: '',
                  tingkat: '',
                  tahunAjaran: '',
                  semester: '',
                  waliKelas: '',
                });
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              {showForm ? 'Batal' : 'Tambah Kelas'}
            </button>
          </div>
        </div>

        {/* Messages */}
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

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nama Kelas</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tingkat</label>
                  <select
                    name="tingkat"
                    value={formData.tingkat}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Pilih Tingkat</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Tahun Ajaran</label>
                  <input
                    type="text"
                    name="tahunAjaran"
                    value={formData.tahunAjaran}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="2024/2025"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Semester</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Pilih Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200"
              >
                {editingId ? 'Update Kelas' : 'Buat Kelas'}
              </button>
            </form>
          </div>
        )}

        {/* Kelas List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-6 text-center">Loading...</div>
          ) : kelas.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Tidak ada data kelas</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Nama Kelas</th>
                    <th className="px-6 py-3 text-left font-semibold">Tingkat</th>
                    <th className="px-6 py-3 text-left font-semibold">Tahun Ajaran</th>
                    <th className="px-6 py-3 text-left font-semibold">Semester</th>
                    <th className="px-6 py-3 text-left font-semibold">Jumlah Siswa</th>
                    <th className="px-6 py-3 text-left font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {kelas.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{item.nama}</td>
                      <td className="px-6 py-3">{item.tingkat}</td>
                      <td className="px-6 py-3">{item.tahunAjaran || '-'}</td>
                      <td className="px-6 py-3">{item.semester || '-'}</td>
                      <td className="px-6 py-3">{item.siswa?.length || 0}</td>
                      <td className="px-6 py-3 space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageKelas;
