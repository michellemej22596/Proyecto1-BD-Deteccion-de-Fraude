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

  const [mensaje, setMensaje] = useState(null); // Estado para mostrar mensajes de éxito o error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransaccion({ ...transaccion, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/transacciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transaccion_id: Number(transaccion.transaccion_id),
          monto: Number(transaccion.monto),
          cuenta_origen_id: Number(transaccion.cuenta_origen_id),
          cuenta_destino_id: Number(transaccion.cuenta_destino_id),
          tipo: transaccion.tipo,
          canal: transaccion.canal
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje({ tipo: 'success', texto: `Transacción exitosa: ${JSON.stringify(data)}` });
      } else {
        const error = await response.json();
        setMensaje({ tipo: 'error', texto: `Error: ${error.detail || 'No se pudo realizar la transacción'}` });
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: `Error de red: ${error.message}` });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Agregar Transacción</h2>
      {mensaje && (
        <div className={`p-3 rounded-lg text-white ${mensaje.tipo === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {mensaje.texto}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Transacción ID', name: 'transaccion_id', type: 'number' },
          { label: 'Monto', name: 'monto', type: 'number' },
          { label: 'Cuenta Origen ID', name: 'cuenta_origen_id', type: 'number' },
          { label: 'Cuenta Destino ID', name: 'cuenta_destino_id', type: 'number' },
          { label: 'Tipo', name: 'tipo', type: 'text' },
          { label: 'Canal', name: 'canal', type: 'text' }
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <p className="text-lg font-semibold text-gray-700 mb-2">{label}</p>
            <input
              type={type}
              name={name}
              value={transaccion[name]}
              onChange={handleInputChange}
              placeholder={`Escriba ${label.toLowerCase()}...`}
              className="w-full p-4 border-2 border-orange-300 rounded-lg bg-stone-900 text-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>
        ))}

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
