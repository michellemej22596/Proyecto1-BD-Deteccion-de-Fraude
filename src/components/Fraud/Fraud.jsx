// src/components/AlertasFraude/AlertasFraude.jsx
import React, { useEffect, useState } from "react";
import api from "../../api";

const AlertasFraude = () => {
  const [alertas, setAlertas] = useState([]);

  useEffect(() => {
    const fetchAlertas = async () => {
      try {
        const response = await api.get("/fraude");
        setAlertas(response.data);
      } catch (error) {
        console.error("Error al cargar las alertas de fraude", error);
      }
    };
    fetchAlertas();
  }, []);

  return (
    <div>
      <h1>Alertas de Fraude</h1>
      <ul>
        {alertas.map(alerta => (
          <li key={alerta.id}>{alerta.descripcion}</li>
        ))}
      </ul>
    </div>
  );
};

export default AlertasFraude;
