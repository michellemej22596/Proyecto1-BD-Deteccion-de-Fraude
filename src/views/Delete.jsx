import React, { useState } from 'react';
import axios from 'axios';

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
      setError('Por favor, ingresa un ID o correo del cliente.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/clientes/${clientIdentifier}`);
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
      <h2 className="text-2xl font-semibold text-center mb-6">Eliminar Cliente</h2>
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente eliminado exitosamente</div>}
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
              loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Eliminando...' : 'Eliminar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Delete;
