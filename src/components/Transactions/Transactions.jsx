// src/components/Transacciones/Transacciones.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";

const Transacciones = ({ cuentaId }) => {
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const fetchTransacciones = async () => {
      try {
        const response = await api.get(`/transacciones/${cuentaId}`);
        setTransacciones(response.data);
      } catch (error) {
        console.error("Error al cargar las transacciones", error);
      }
    };
    if (cuentaId) fetchTransacciones();
  }, [cuentaId]);

  return (
    <div>
      <h2>Transacciones</h2>
      <ul>
        {transacciones.map(transaccion => (
          <li key={transaccion.id}>
            {transaccion.monto} - {transaccion.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transacciones;
