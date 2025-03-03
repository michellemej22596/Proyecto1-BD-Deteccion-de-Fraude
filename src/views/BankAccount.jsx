import React from 'react';
import { useParams, useLocation } from 'react-router-dom';


const BankAccount = () => {
  const { clientId } = useParams();
  const location = useLocation(); 
  const { searchResults } = location.state || {}; 

  return (
    <div className="bank-account">
      <h2>Resultados de la Búsqueda de Cuentas Bancarias para Cliente ID: {clientId}</h2>

      {searchResults ? (
        <div>
          {searchResults.map((cuenta, index) => (
            <div key={index}>
              <p><strong>Tipo:</strong> {cuenta.cu.Tipo}</p>
              <p><strong>Fecha de Apertura:</strong> {new Date(cuenta.cu.Fecha_Apertura._Date__year, cuenta.cu.Fecha_Apertura._Date__month - 1, cuenta.cu.Fecha_Apertura._Date__day).toLocaleDateString()}</p>
              <p><strong>Saldo:</strong> {cuenta.cu.Saldo}</p>
              <p><strong>Estado:</strong> {cuenta.cu.Estado}</p>
              <p><strong>Cuenta ID:</strong> {cuenta.cu.Cuenta_ID}</p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default BankAccount;
