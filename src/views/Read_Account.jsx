import React, { useState } from 'react';
import ReadABanner from './../assets/ReadABanner.png';
import '../App.css';
import api from '../api';

const ReadAccount = () => {
  const [cuentaId, setCuentaId] = useState('');
  const [accountData, setAccountData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setLoading(true); 
    setError(null); 
    setAccountData(null); 

    try {
      const response = await api.get(`/cuentas/${cuentaId}`);
      
      if (response.status === 200) {
        console.log('Datos de la cuenta recibidos:', response.data); 
        setAccountData(response.data.cu); // Accedemos a los datos correctamente
      } else {
        setError('No se pudo obtener la cuenta.');
      }
    } catch (err) {
      setError('No se encontró la cuenta con ese ID.'); 
      console.error('Error al obtener la cuenta:', err); 
    } finally {
      setLoading(false); 
    }
  };

  // Función para formatear la fecha
  const formatDate = (date) => {
    const { _Date__year, _Date__month, _Date__day } = date;
    return `${_Date__day}-${_Date__month}-${_Date__year}`;
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={ReadABanner} alt="Banner Leer Cuenta" className="bannersCRUD" />
      </div>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

      {/* Formulario para ingresar el ID de la cuenta */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID de la Cuenta</p>
          <input
            type="text"
            value={cuentaId}
            onChange={(e) => setCuentaId(e.target.value)} // Actualizar el estado con el valor del input
            placeholder="ID de la cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button type="submit" disabled={loading} className="read-button w-full py-2 px-4 rounded-lg bg-blue-500 text-white">
          {loading ? <div className="loader"></div> : 'Buscar Cuenta'}
        </button>
      </form>

      {/* Solo mostramos los datos si se recibieron correctamente */}
      {accountData && (
        <div className="mt-6 bg-black-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Datos de la Cuenta</h3>

          {/* Mostrar los datos de la cuenta en una tabla */}
          <div className="table-container">
            <table className="client-table">
              <tbody>
                <tr>
                  <th>Cuenta ID</th>
                  <td>{accountData.Cuenta_ID || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Tipo</th>
                  <td>{accountData.Tipo || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{accountData.Estado || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Fecha de Apertura</th>
                  <td>{accountData.Fecha_Apertura ? formatDate(accountData.Fecha_Apertura) : 'N/A'}</td>
                </tr>
                <tr>
                  <th>Saldo</th>
                  <td>${accountData.Saldo ? accountData.Saldo.toFixed(2) : 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadAccount;
