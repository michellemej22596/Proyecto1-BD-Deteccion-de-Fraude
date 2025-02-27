import React, { useState } from 'react';
import axios from 'axios';
import BannerCreate from '../assets/BannerCreate.png';
import '../App.css';

const Create = () => {
  const [clientData, setClientData] = useState({
    nombre: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validar que los campos no estén vacíos
    if (!clientData.nombre || !clientData.email) {
      setError('Por favor, completa todos los campos.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/clientes', clientData);
      if (response.status === 201) {
        setSuccess(true);
        setClientData({ nombre: '', email: '' }); // Limpiar los campos
      }
    } catch (error) {
      setError('Error al crear el cliente. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
      <img src={BannerCreate} alt="Banner Crear Cliente" className="banner-create" />
      </div>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente creado exitosamente</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="nombre">
            Nombre del Cliente
          </label>
          <input
            id="nombre"
            type="text"
            value={clientData.nombre}
            onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
            placeholder="Nombre completo"
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
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
            value={clientData.email}
            onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
            placeholder="Correo electrónico"
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
            {loading ? 'Creando...' : 'Crear Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
