import React, { useState } from 'react';
import SearchCardBanner from '../assets/SearchCardBanner.png';
import api from '../api';

const SearchCard = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCardData(null);

    if (!clientIdentifier) {
      setError('Por favor, ingresa el ID del cliente.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/tarjetas/search?cliente_id=${clientIdentifier}`);
      if (response.status === 200) {
        setCardData(response.data);
      }
    } catch (error) {
      setError('No se encontraron tarjetas para ese ID de cliente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={SearchCardBanner} alt="Banner Buscar Tarjetas" className="bannersCRUD" />
      </div>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">
            ID del Cliente
          </p>
          <input
            type="text"
            value={clientIdentifier}
            onChange={(e) => setClientIdentifier(e.target.value)}
            placeholder="ID del cliente"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="w-full p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
          {loading ? <div className="loader"></div> : 'Buscar Tarjetas'}
        </button>
      </form>

      {cardData && (
        <div className="mt-6 bg-black-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Tarjetas Encontradas</h3>

          {/* Contenedor centrado para la tabla */}
          <div className="table-container">
            <table className="client-table">
              <thead>
                <tr>
                  <th>Tarjeta ID</th>
                  <th>Tipo</th>
                  <th>Banco Emisor</th>
                  <th>Límite de Crédito</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {cardData.map((tarjeta, index) => (
                  <tr key={index}>
                    <td>{tarjeta.tarjeta_id}</td>
                    <td>{tarjeta.tipo}</td>
                    <td>{tarjeta.banco_emisor}</td>
                    <td>${tarjeta.limite_credito.toFixed(2)}</td>
                    <td>{tarjeta.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCard;
