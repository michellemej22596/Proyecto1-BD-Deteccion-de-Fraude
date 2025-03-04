import React, { useState } from 'react';
import CreateCardBanner from '../assets/CreateCardBanner.png';
import api from '../api';

const CreateCard = () => {
  const [formData, setFormData] = useState({
    tarjeta_id: '',
    tipo: '',
    banco_emisor: '',
    limite_credito: '',
    estado: '',
    cliente_id: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post('/tarjetas/', formData);
      if (response.status === 200) {
        setSuccessMessage('Tarjeta creada con éxito.');
        setFormData({
          tarjeta_id: '',
          tipo: '',
          banco_emisor: '',
          limite_credito: '',
          estado: '',
          cliente_id: '',
        });
      }
    } catch (err) {
      setError('Error al crear la tarjeta. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={CreateCardBanner} alt="Banner Crear Tarjeta" className="bannersCRUD" />
      </div>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">ID de la Tarjeta</p>
          <input
            type="number"
            name="tarjeta_id"
            value={formData.tarjeta_id}
            onChange={handleChange}
            placeholder="Escriba el ID de la tarjeta..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Tipo de Tarjeta</p>
          <input
            type="text"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            placeholder="Escriba el tipo de tarjeta..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Banco Emisor</p>
          <input
            type="text"
            name="banco_emisor"
            value={formData.banco_emisor}
            onChange={handleChange}
            placeholder="Escriba el banco emisor..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Límite de Crédito</p>
          <input
            type="number"
            name="limite_credito"
            value={formData.limite_credito}
            onChange={handleChange}
            placeholder="Escriba el límite de crédito..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">Estado</p>
          <input
            type="text"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            placeholder="Escriba el estado de la tarjeta..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-700 mb-2">ID del Cliente</p>
          <input
            type="number"
            name="cliente_id"
            value={formData.cliente_id}
            onChange={handleChange}
            placeholder="Escriba el ID del cliente..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div className="mb-4">
          <button type="submit" disabled={loading} className="read-button">
            {loading ? (
              <>
              <div className="loader"></div>
              </>
              ) : (
                'Crear tarjeta'
                )}
        </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCard;
