import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/clientes'); // Ruta de la API
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
          <li key={cliente.id}>{cliente.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clientes;
