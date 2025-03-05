import React, { useState } from 'react';
import BannerCreateAccount from './../assets/CredateABanner.png';
import api from '../api'; // Asegúrate de tener configurada la instancia de axios u otra para la API
import '../App.css';

const CreateAccount = () => {
  // Definir estados para los campos del formulario y para el estado de la solicitud
  const [cuentaId, setCuentaId] = useState('');
  const [tipo, setTipo] = useState('');
  const [saldo, setSaldo] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaApertura, setFechaApertura] = useState('');
  const [clienteId, setClienteId] = useState('');

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Validación básica de los datos
    if (!cuentaId || !tipo || !saldo || !estado || !fechaApertura || !clienteId) {
      setErrorMessage('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    const newAccount = {
      cuenta_id: parseInt(cuentaId), // Asegúrate de que sea un número
      tipo: tipo,
      saldo: parseFloat(saldo), // Asegúrate de que sea un número con decimales
      estado: estado,
      fecha_apertura: fechaApertura,
      cliente_id: parseInt(clienteId),
    };

    try {
      const response = await api.post('/cuentas/', newAccount);
      if (response.status === 200) {
        setSuccessMessage('La cuenta ha sido creada exitosamente.');
        // Limpiar el formulario después de una respuesta exitosa
        setCuentaId('');
        setTipo('');
        setSaldo('');
        setEstado('');
        setFechaApertura('');
        setClienteId('');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrorMessage('Error de validación: ' + error.response.data.detail[0].msg);
      } else {
        setErrorMessage('No se pudo crear la cuenta. Verifica los datos.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerCreateAccount} alt="Banner Crear Cuenta" className="bannersCRUD" />
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold">Crear Cuenta</h2>
      </div>

      {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

      <form onSubmit={handleCreateAccount} className="mb-6">
        {/* ID de la Cuenta */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID de la Cuenta</p>
          <input
            type="number"
            value={cuentaId}
            onChange={(e) => setCuentaId(e.target.value)}
            placeholder="ID de la cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Tipo de Cuenta</p>
          <input
            type="text"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            placeholder="Tipo de cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Saldo */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Saldo Inicial</p>
          <input
            type="number"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            placeholder="Saldo inicial"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Estado */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Estado</p>
          <input
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            placeholder="Estado de la cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Fecha de apertura */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Fecha de Apertura</p>
          <input
            type="date"
            value={fechaApertura}
            onChange={(e) => setFechaApertura(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ID del cliente */}
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID del Cliente</p>
          <input
            type="number"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            placeholder="ID del cliente"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
        >
          {loading ? <div className="loader"></div> : 'Crear Cuenta'}
        </button>
      </form>
    </div>
  );
};

export default CreateAccount;
