import React, { useState, useEffect } from 'react';
import UpdateABanner from './../assets/UpdateABanner.png';
import '../App.css';
import api from '../api'; // Importa la instancia de la API

const UpdateAccount = () => {
  const [cuentaId, setCuentaId] = useState(''); // Estado para el ID de la cuenta
  const [tipo, setTipo] = useState(''); // Estado para el tipo de cuenta
  const [estado, setEstado] = useState(''); // Estado para el estado de la cuenta
  const [loading, setLoading] = useState(false); // Estado para el cargado
  const [error, setError] = useState(null); // Estado para el error
  const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

  // Función para manejar el envío del formulario y hacer la llamada a la API
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que se recargue la página al enviar el formulario
    setLoading(true); // Habilitar el estado de carga
    setError(null); // Limpiar cualquier error previo
    setSuccessMessage(''); // Limpiar el mensaje de éxito

    try {
      // Realizar la solicitud a la API para actualizar la cuenta
      const response = await api.put(`/cuentas/${cuentaId}`, {
        tipo,  // Enviar el tipo de cuenta
        estado, // Enviar el estado de la cuenta
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 200) {
        setSuccessMessage('La cuenta ha sido actualizada con éxito.');
      } else {
        setError('No se pudo actualizar la cuenta.');
      }
    } catch (err) {
      setError('Error al actualizar la cuenta. Verifique el ID y los datos proporcionados.');
      console.error('Error al actualizar la cuenta:', err);
    } finally {
      setLoading(false); // Deshabilitar el estado de carga
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={UpdateABanner} alt="Banner Actualizar Cuenta" className="bannersCRUD" />
      </div>

      {/* Mostrar mensaje de éxito */}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

      {/* Mostrar mensaje de error */}
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}

      {/* Formulario para editar los datos de la cuenta */}
      <form onSubmit={handleSubmit}>
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

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Tipo de Cuenta</p>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)} // Actualizar el estado con el valor del input
            placeholder="Tipo de cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Estado de la Cuenta</p>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)} // Actualizar el estado con el valor del input
            placeholder="Estado de cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button type="submit" disabled={loading} className="read-button">
          {loading ? <div className="loader"></div> : 'Actualizar Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default UpdateAccount;
