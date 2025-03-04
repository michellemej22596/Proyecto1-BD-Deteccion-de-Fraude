import React, { useState } from 'react';
import DeleteCardBanner from '../assets/DeleteCardBanner.png';
import api from '../api';

const DeleteCard = () => {
  const [tarjetaId, setTarjetaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    if (!tarjetaId) {
      setErrorMessage('Por favor, ingresa el ID de la tarjeta.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.delete(`/tarjetas/${tarjetaId}`);
      if (response.status === 200) {
        setSuccessMessage('La tarjeta ha sido eliminada exitosamente.');
      }
    } catch (error) {
      setErrorMessage('No se pudo eliminar la tarjeta. Asegúrate de que el ID sea correcto.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={DeleteCardBanner} alt="Banner Crear Tarjeta" className="bannersCRUD" />
      </div>
      
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Eliminar Tarjeta</h2>
      </div>

      {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

      <form onSubmit={handleDelete} className="mb-6">
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID de la Tarjeta</p>
          <input
            type="text"
            value={tarjetaId}
            onChange={(e) => setTarjetaId(e.target.value)}
            placeholder="ID de la tarjeta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 text-white bg-red-600 hover:bg-red-700 rounded-lg"
        >
          {loading ? <div className="loader"></div> : 'Eliminar Tarjeta'}
        </button>
      </form>
    </div>
  );
};

export default DeleteCard;
