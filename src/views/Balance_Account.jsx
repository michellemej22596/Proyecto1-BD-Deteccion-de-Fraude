import React, { useState } from 'react';
import BalanceABanner from './../assets/BalanceABanner.png';
import api from '../api'; // Asegúrate de tener configurada la instancia de `api` para las llamadas a tu backend

const BalanceAccount = () => {
  const [accountId, setAccountId] = useState('');
  const [saldo, setSaldo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await api.patch(`/cuentas/${accountId}/saldo`, { saldo: parseFloat(saldo) });
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setError('Hubo un error al actualizar el saldo de la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={BalanceABanner} alt="Banner Actualizar Saldo" className="bannersCRUD" />
      </div>

      {error && <div className="bg-red-500 text-white p-2 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-500 text-white p-2 rounded mb-4">Saldo actualizado con éxito!</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">ID de la Cuenta</p>
          <input
            type="text"
            value={accountId}
            onChange={(e) => setAccountId(e.target.value)}
            placeholder="ID de la cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <p className="custom-input-label text-lg font-semibold text-gray-700 mb-1">Nuevo Saldo</p>
          <input
            type="number"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            placeholder="Nuevo saldo de la cuenta"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`read-button w-full p-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Cargando...' : 'Actualizar Saldo'}
        </button>
      </form>
    </div>
  );
};

export default BalanceAccount;
