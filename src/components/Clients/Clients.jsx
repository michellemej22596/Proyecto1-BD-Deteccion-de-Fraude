import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api-fraude/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Error al cargar los clientes', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.cliente_id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
