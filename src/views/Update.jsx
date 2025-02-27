import React, { useState, useEffect } from 'react';
import BannerUpdate from '../assets/BannerUpdate.png';
import axios from 'axios';

const Update = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [clientData, setClientData] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    nombre: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const fetchClientData = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.get(`http://localhost:8000/clientes/${clientIdentifier}`);
      if (response.status === 200) {
        setClientData(response.data); // Set the fetched client data
        setUpdatedData({
          nombre: response.data.nombre,
          email: response.data.email,
        });
      }
    } catch (error) {
      setError('No se encontró el cliente con ese ID o correo.');
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
      const response = await axios.put(
        `http://localhost:8000/clientes/${clientIdentifier}`,
        updatedData
      );
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
        <img src={BannerUpdate} alt="Banner Leer Cliente" className="banner-create" />
      </div>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente actualizado con éxito!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="clientIdentifier">
            ID o Correo Electrónico del Cliente
          </label>
          <input
            id="clientIdentifier"
            type="text"
            value={clientIdentifier}
            onChange={(e) => setClientIdentifier(e.target.value)}
            placeholder="ID o correo del cliente"
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">
                Nombre
              </label>
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
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                value={updatedData.email}
                onChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg mt-2"
                placeholder="Correo electrónico del cliente"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 rounded-lg text-white ${
                  loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
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