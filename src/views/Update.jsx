import React, { useState, useEffect } from 'react';
import BannerUpdate from '../assets/BannerUpdate.png';
import '../App.css';
import api from '../api';

const UpdateAccount = () => {
  const [accountId, setAccountId] = useState('');
  const [accountData, setAccountData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    tipo: '',
    estado: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchAccountData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.get(`/cuentas/${accountId}`);
      if (response.status === 200) {
        setAccountData(response.data);
        setUpdatedData({
          tipo: response.data.tipo,
          estado: response.data.estado,
        });
      }
    } catch (error) {
      setError('No se encontró la cuenta con ese ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const response = await api.put(`/cuentas/${accountId}`, updatedData);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError('Hubo un error al actualizar la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerUpdate} alt="Banner Editar Cuenta" className="bannersCRUD" />
      </div>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cuenta actualizada con éxito!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID de la Cuenta</p>
          <input
            id="accountId"
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="ID de la cuenta"
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-bg-stone-900"
            required
          />
        </div>

        <button type="button" onClick={fetchAccountData} disabled={loading} className="read-button">
          {loading ? <div className="loader"></div> : 'Buscar Cuenta'}
        </button>

        {accountData && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Tipo</p>
              <input
                id="tipo"
                type="text"
                value={updatedData.tipo}
                onChange={(e) => setUpdatedData({ ...updatedData, tipo: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Tipo de cuenta"
                required
              />
            </div>

            <div className="mb-4">
              <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Estado</p>
              <input
                id="estado"
                type="text"
                value={updatedData.estado}
                onChange={(e) => setUpdatedData({ ...updatedData, estado: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Estado de la cuenta"
                required
              />
            </div>

            <button type="submit" disabled={loading} className="read-button">
              {loading ? <div className="loader"></div> : 'Actualizar Cuenta'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UpdateAccount;
