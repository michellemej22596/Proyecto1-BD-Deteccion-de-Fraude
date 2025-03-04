import React from 'react';
import StatusABanner from './../assets/StatusABanner.png';
import '../App.css';

const CreateAccount = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <img src={StatusABanner} alt="Banner Crear Cuenta" className="bannersCRUD" />
      </div>
    </div>
  );
};

export default CreateAccount;
