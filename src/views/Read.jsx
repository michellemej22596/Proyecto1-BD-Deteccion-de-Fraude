import React, { useState } from 'react';
import axios from 'axios';

const Read = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setClientData(null); // Reset client data on each search

    // Validar que el campo no esté vacío
    if (!clientIdentifier) {
      setError('Por favor, ingresa un ID o correo del cliente.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/clientes/${clientIdentifier}`);
      if (response.status === 200) {
        setClientData(response.data); // Set the client data from response
      }
    } catch (error) {
      setError('No se encontró el cliente con ese ID o correo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Leer Cliente</h2>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

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
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded-lg text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Cargando...' : 'Buscar Cliente'}
          </button>
        </div>
      </form>

      {clientData && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Datos del Cliente</h3>
          <p><strong>Nombre:</strong> {clientData.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {clientData.email}</p>
          {/* Agregar otros campos si es necesario */}
        </div>
      )}
    </div>
  );
};

export default Read;