import React, { useState } from 'react';
import '../app.css';

const CreateTransacc = () => {
  const [transaccion, setTransaccion] = useState({
    transaccion_id: '',
    monto: '',
    cuenta_origen_id: '',
    cuenta_destino_id: '',
    tipo: '',
    canal: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaccion({ ...transaccion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/transacciones/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaccion)
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Transacción exitosa:', data);
    } else {
      const error = await response.json();
      console.error('Error de validación:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Transacción</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Transacción ID</p>
        <input
            type="text"
            name="transaccion_id"
            value={transaccion.transaccion_id}
            onChange={handleInputChange}
            placeholder="Escriba el ID de la transacción..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Monto</p>
        <input
            type="number"
            name="monto"
            value={transaccion.monto}
            onChange={handleInputChange}
            placeholder="Escriba el monto..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cuenta Origen ID</p>
        <input
            type="text"
            name="cuenta_origen_id"
            value={transaccion.cuenta_origen_id}
            onChange={handleInputChange}
            placeholder="Escriba el ID de cuenta origen..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Cuenta Destino ID</p>
        <input
            type="text"
            name="cuenta_destino_id"
            value={transaccion.cuenta_destino_id}
            onChange={handleInputChange}
            placeholder="Escriba el ID de cuenta destino..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Tipo</p>
        <input
            type="text"
            name="tipo"
            value={transaccion.tipo}
            onChange={handleInputChange}
            placeholder="Escriba el tipo de transacción..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 mb-2">Canal</p>
        <input
            type="text"
            name="canal"
            value={transaccion.canal}
            onChange={handleInputChange}
            placeholder="Escriba el canal de transacción..."
            className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
        />
        </div>

        <button
        type="submit"
        className="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
        Enviar Transacción
        </button>

      </form>
    </div>
  );
};

export default CreateTransacc;
