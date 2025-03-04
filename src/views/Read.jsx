import React, { useState } from 'react';
import BannerRead from '../assets/BannerRead.png';
import '../App.css';
import api from '../api';

const Read = () => {
  const [clientIdentifier, setClientIdentifier] = useState('');
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setClientData(null);

    if (!clientIdentifier) {
      setError('Por favor, ingresa un ID del cliente.');
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/clientes/${clientIdentifier}`);
      if (response.status === 200) {
        setClientData(response.data);
      }
    } catch (error) {
      setError('No se encontró el cliente con ese ID.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerRead} alt="Banner Leer Cliente" className="bannersCRUD" />
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
        <button type="submit" disabled={loading} className="read-button">
          {loading ? <div className="loader"></div> : 'Buscar Cliente'}
        </button>
      </form>

      {clientData && (
        <div className="mt-6 bg-black-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Datos del Cliente</h3>

          {/* Contenedor centrado para la tabla */}
          <div className="table-container">
            <table className="client-table">
              <tbody>
                <tr>
                  <th>Nombre</th>
                  <td>{clientData.cliente.Nombre}</td>
                </tr>
                <tr>
                  <th>Edad</th>
                  <td>{clientData.cliente.Edad}</td>
                </tr>
                <tr>
                  <th>País</th>
                  <td>{clientData.cliente.País}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{clientData.cliente.Estado}</td>
                </tr>
                <tr>
                  <th>Cliente ID</th>
                  <td>{clientData.cliente.Cliente_ID}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {clientData.cuentas.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Cuentas Asociadas</h3>
              <div className="table-container">
                <table className="client-table">
                  <thead>
                    <tr>
                      <th>Tipo</th>
                      <th>Saldo</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientData.cuentas.map((cuenta, index) => (
                      <tr key={index}>
                        <td>{cuenta.Tipo}</td>
                        <td>${cuenta.Saldo.toFixed(2)}</td>
                        <td>{cuenta.Estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Read;
