import React, { useState } from 'react';
import axios from 'axios';
import BannerCreate from '../assets/BannerCreate.png';
import '../App.css';

const Create = () => {
  // Estado para almacenar los datos del cliente
  const [clientData, setClientData] = useState({
    cliente_id: '',
    nombre: '',
    edad: '',
    pais: '',
    estado: '',
  });

  // Estados para controlar la carga, el error y el éxito
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Función para manejar la validación del formulario
  const validateForm = () => {
    for (let key in clientData) {
      if (!clientData[key]) {
        return `Por favor, completa el campo ${key}.`;
      }
    }
    return null;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Establecer el estado de carga y limpiar los errores y el éxito
    setLoading(true);
    setError(null);
    setSuccess(false);

    // Validar que todos los campos estén completos
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      setLoading(false);
      return;
    }

    try {
      // Realizar la solicitud POST para crear el cliente
      const response = await axios.post('https://proyecto1-bd-deteccion-de-fraude.onrender.com/api-fraude/clientes', clientData);

      if (response.status === 201) {
        setSuccess(true);
        // Limpiar el formulario después de la creación
        setClientData({ cliente_id: '', nombre: '', edad: '', pais: '', estado: '' });
      }
    } catch (error) {
      console.error('Error details:', error);
      // Manejo de errores con un mensaje adecuado
      if (error.response) {
        setError(`Error: ${error.response.data.message || 'Error desconocido'}`);
      } else if (error.request) {
        setError('No se recibió respuesta del servidor. Verifica que la API esté corriendo.');
      } else {
        setError('Error al crear el cliente. Inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="custom-container max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BannerCreate} alt="Banner Crear Cliente" className="bannersCRUD" />
      </div>

      {/* Mostrar errores o éxito */}
      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Cliente creado exitosamente</div>}

      {/* Formulario de creación de cliente */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID del Cliente</p>
          <input
            type="text"
            value={clientData.cliente_id}
            onChange={(e) => setClientData({ ...clientData, cliente_id: e.target.value })}
            placeholder="Escriba el ID del cliente"
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-white"
          />
        </div>

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Nombre del Cliente</p>
          <input
            type="text"
            value={clientData.nombre}
            onChange={(e) => setClientData({ ...clientData, nombre: e.target.value })}
            placeholder="Escriba su nombre..."
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-white"
          />
        </div>

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Edad</p>
          <input
            type="number"
            value={clientData.edad}
            onChange={(e) => setClientData({ ...clientData, edad: e.target.value })}
            placeholder="Escriba la edad..."
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-white"
          />
        </div>

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">País</p>
          <input
            type="text"
            value={clientData.pais}
            onChange={(e) => setClientData({ ...clientData, pais: e.target.value })}
            placeholder="Escriba su país..."
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-white"
          />
        </div>

        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Estado</p>
          <input
            type="text"
            value={clientData.estado}
            onChange={(e) => setClientData({ ...clientData, estado: e.target.value })}
            placeholder="Escriba el estado..."
            className="w-full my-3 rounded-lg bg-stone-900 p-4 border-2 border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-xl text-white"
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            style={{ borderRadius: '7px' }}
          >
            {loading ? 'Creando...' : 'Crear Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
