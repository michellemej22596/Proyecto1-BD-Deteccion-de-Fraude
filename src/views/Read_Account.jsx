import React, { useState } from 'react';
import ReadABanner from './../assets/ReadABanner.png';
import '../App.css';
import api from '../api'; // Importa la instancia de api

const ReadAccount = () => {
  const [cuentaId, setCuentaId] = useState(''); // Estado para el ID de la cuenta
  const [accountData, setAccountData] = useState(null); // Estado para los datos de la cuenta
  const [loading, setLoading] = useState(false); // Estado para el cargado
  const [error, setError] = useState(null); // Estado para el error

  // Función para manejar el envío del formulario y hacer la llamada a la API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    setLoading(true); // Habilitar el estado de carga
    setError(null); // Limpiar cualquier error previo
    setAccountData(null); // Limpiar los datos previos

    try {
      // Realizar la solicitud a la API usando el ID de la cuenta
      const response = await api.get(`/cuentas/${cuentaId}`);
      
      // Verifica el estado de la respuesta
      if (response.status === 200) {
        console.log('Datos de la cuenta recibidos:', response.data); // Depuración: log de la respuesta
        setAccountData(response.data); // Establecer los datos de la cuenta si la respuesta es exitosa
      } else {
        setError('No se pudo obtener la cuenta.');
      }
    } catch (err) {
      setError('No se encontró la cuenta con ese ID.'); // Mostrar error si no se encuentra la cuenta
      console.error('Error al obtener la cuenta:', err); // Depuración: log del error
    } finally {
      setLoading(false); // Deshabilitar el estado de carga
    }
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
        <button type="submit" disabled={loading} className="read-button">
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
                  <th>Tipo</th>
                  <td>{accountData.Tipo}</td>
                </tr>
                <tr>
                  <th>Saldo</th>
                  <td>${accountData.Saldo ? accountData.Saldo.toFixed(2) : 'N/A'}</td>
                </tr>
                <tr>
                  <th>Estado</th>
                  <td>{accountData.Estado}</td>
                </tr>
                <tr>
                  <th>Cuenta ID</th>
                  <td>{accountData.Cuenta_ID}</td>
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
