import React, { useState } from 'react';
import ReadCardBanner from '../assets/ReadCardBanner.png';
import '../App.css';
import api from '../api';

const ReadCard = () => {
  const [tarjetaId, setTarjetaId] = useState('');
  const [tarjetaData, setTarjetaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTarjetaData(null);

    if (!tarjetaId) {
      setError('Por favor, ingresa un ID de tarjeta.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/tarjetas/${tarjetaId}`);
      if (response.status === 200) {
        setTarjetaData(response.data.t);
      }
    } catch (error) {
      setError('No se encontró la tarjeta con ese ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={ReadCardBanner} alt="Leer Tarjeta" className="bannersCRUD" />
      </div>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">
            ID de la Tarjeta
          </p>
          <input
            type="number"
            value={tarjetaId}
            onChange={(e) => setTarjetaId(e.target.value)}
            placeholder="Ingrese el ID de la tarjeta..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="read-button">
          {loading ? <div className="loader"></div> : 'Buscar Tarjeta'}
        </button>
      </form>

      {tarjetaData && (
        <div className="mt-6 bg-black-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Detalles de la Tarjeta</h3>
          <div className="table-container">
            <table className="client-table">
              <tbody>
                <tr>
                  <th>ID</th>
                  <td>{tarjetaData.Tarjeta_ID}</td>
                </tr>
                <tr>
                  <th>Tipo</th>
                  <td>{tarjetaData.Tipo}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{tarjetaData.EstaActivo}</td>
                </tr>
                <tr>
                  <th>Banco Emisor</th>
                  <td>{tarjetaData.Banco_Emisor}</td>
                </tr>
                <tr>
                  <th>Límite de Crédito</th>
                  <td>${tarjetaData["Límite_Crédito"].toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadCard;
