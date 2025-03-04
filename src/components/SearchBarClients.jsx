import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import api from '../api'; 
import "../App.css";

const SearchBarClients = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 


  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm) return; 

    try {
      const response = await api.get(`/cuentas/search?cliente_id=${searchTerm}`);
      const data = response.data;

      // Redirigir a la página de cuentas bancarias, pasando el cliente_id en la URL
      navigate(`/bankaccount/${searchTerm}`, { state: { searchResults: data } });

    } catch (error) {
      console.error('Error al buscar cuentas:', error); // Manejo de errores
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Buscar por ID de Cliente"
        value={searchTerm}
        onChange={handleSearchChange} 
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBarClients;
