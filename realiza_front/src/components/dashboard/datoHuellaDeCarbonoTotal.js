import React from 'react';
import { datoglobal } from '../../data/data'; // Importa los datos

const DatoGlobal = () => {
  const totalEmisiones = datoglobal.datasets[0].data[0];

  return (
    <div className="bg-blue-50 w-full flex items-center justify-center">
      <div className="w-full max-w-[400px] text-center">
        <h1 className="text-xl text-gray-800 mb-2">
          Huella de Carbono total Global
        </h1>
        <div className="text-4xl font-bold text-black-700">
          {totalEmisiones} tCO2e
        </div>
      </div>
    </div>
  );
};


export default DatoGlobal;
