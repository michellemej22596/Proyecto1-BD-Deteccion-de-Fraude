// src/components/Clientes/Clientes.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get("/clientes");
        setClientes(response.data);
      } catch (error) {
        console.error("Error al cargar los clientes", error);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
