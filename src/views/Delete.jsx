import React, { useState } from 'react';
import BannerDelete from '../assets/bannerDelete.png';
import '../App.css';
import api from '../api';

const Delete = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validar que el campo no esté vacío
    if (!clientIdentifier) {
      setError('Por favor, ingresa un ID del cliente.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.delete(`/clientes/${clientIdentifier}`);
      if (response.status === 200) {
        setSuccess(true);
        setClientIdentifier(''); // Limpiar el campo
      }
    } catch (error) {
      setError('Error al eliminar el cliente. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerDelete} alt="Banner Borrar Cliente" className="bannersCRUD" />
      </div>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente eliminado exitosamente</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">
            ID del Cliente</p>
          <input
            id="clientIdentifier"
            type="text"
            value={clientIdentifier}
            onChange={(e) => setClientIdentifier(e.target.value)}
            placeholder="ID del cliente"
            className="w-full p-2 border border-gray-300 rounded-lg mt-2"
            required
          />
        </div>
        <div className="mb-4">
        <button type="submit" disabled={loading} className="read-button">
          {loading ? (
            <>
            <div className="loader"></div>
            </>
            ) : (
              'Eliminar Cliente'
              )}
</button>

        </div>
      </form>
    </div>
  );
};

export default Delete;
