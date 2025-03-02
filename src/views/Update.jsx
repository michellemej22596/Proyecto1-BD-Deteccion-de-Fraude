import React, { useState, useEffect } from 'react';
import BannerUpdate from '../assets/BannerUpdate.png';
import api from '../api';

const Update = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [clientData, setClientData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    nombre: '',
    edad: '',
    pais: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchClientData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.get(`/clientes/${clientIdentifier}`);
      if (response.status === 200) {
        setClientData(response.data);
        setUpdatedData({
          nombre: response.data.nombre,
          edad: response.data.edad,
          pais: response.data.pais,
        });
      }
    } catch (error) {
      setError('No se encontró el cliente con ese ID.');
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
      const response = await api.put(`/clientes/${clientIdentifier}`, updatedData);
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError('Hubo un error al actualizar los datos del cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerUpdate} alt="Banner Leer Cliente" className="bannersCRUD" />
      </div>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente actualizado con éxito!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">
            ID del Cliente
          </p>
          <input
            id="clientIdentifier"
            type="text"
            value={clientIdentifier}
            onChange={(e) => setClientIdentifier(e.target.value)}
            placeholder="ID del cliente"
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-bg-stone-900"
            required
          />
        </div>


        <div className="mb-4">
          <button
            type="button"
            onClick={fetchClientData}
            disabled={loading}
            className={`w-full p-2 rounded-lg text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}           
          >
            {loading ? 'Cargando...' : 'Buscar Cliente'}
          </button>
        </div>

        {clientData && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Nombre</p>
              <label className="block text-sm font-medium text-gray-700" htmlFor="nombre"></label>
              <input
                id="nombre"
                type="text"
                value={updatedData.nombre}
                onChange={(e) => setUpdatedData({ ...updatedData, nombre: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Nombre del cliente"
                required
              />
            </div>

            <div className="mb-4">
              <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Edad</p>
              <label className="block text-sm font-medium text-gray-700" htmlFor="edad"></label>
              <input
                id="edad"
                type="number"
                value={updatedData.edad}
                onChange={(e) => setUpdatedData({ ...updatedData, edad: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Edad del cliente"
                required
              />
            </div>

            <div className="mb-4">
              <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">País</p>
              <label className="block text-sm font-medium text-gray-700" htmlFor="pais"></label>
              <input
                id="pais"
                type="text"
                value={updatedData.pais}
                onChange={(e) => setUpdatedData({ ...updatedData, pais: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="País del cliente"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 rounded-lg text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                
              >
                {loading ? 'Cargando...' : 'Actualizar Cliente'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Update;