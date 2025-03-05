import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Configura la base de la API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL_PRY, // Utiliza la URL de tu .env
});

const DetectFraud = () => {
  const [fraudData, setFraudData] = useState(null); // Para almacenar la respuesta de la API
  const [loading, setLoading] = useState(true); // Para saber si la llamada está en proceso
  const [error, setError] = useState(null); // Para manejar errores

  // Hacer la llamada a la API cuando el componente se monta
  useEffect(() => {
    const fetchFraudData = async () => {
      try {
        // Llamada al endpoint /fraude/detectar
        const response = await api.get('/fraude/detectar');
        setFraudData(response.data); // Guarda la respuesta en el estado
      } catch (err) {
        setError('Error al detectar fraude'); // Manejo de errores
      } finally {
        setLoading(false); // Cambiar el estado de carga a false
      }
    };

    fetchFraudData(); // Ejecuta la función para obtener los datos
  }, []);

  // Muestra el estado de carga o error si existe
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Muestra la información si los datos fueron cargados
  return (
    
    <div>
      <h1>Detectar Fraude</h1>
      <p>{fraudData}</p> 
    </div>
  );
};

export default DetectFraud;
