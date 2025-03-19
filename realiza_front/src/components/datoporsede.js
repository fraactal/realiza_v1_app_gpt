import React, { useEffect, useState } from 'react';
import { getConsumosPorSede } from '../api/consumos';

const DatoporSede = ({ selectedSede }) => {
  const [totalEmisiones, setTotalEmisiones] = useState(0);

  useEffect(() => {
    if (selectedSede) {
      getConsumosPorSede(selectedSede)
        .then((data) => {
          // sumar todas las emisiones
          const sumaEmisiones = data.reduce((acc, item) => acc + item.emision, 0);
          setTotalEmisiones(sumaEmisiones);
        })
        .catch((error) => {
          console.error('Error al obtener consumos:', error);
        });
    }
  }, [selectedSede]);

  const formatNumber = (num) => {
    return num.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="w-full h-80 flex items-center justify-center">
      <div className="w-full max-w-[400px] h-full text-center">
        <h1 className="text-xl text-gray-800 mb-4 mt-2">
          Huella de Carbono total por sede
        </h1>
        <div className="text-5xl font-bold text-blue-700">
          {formatNumber(totalEmisiones)} tCO2e
        </div>
      </div>
    </div>
  );
};

export default DatoporSede;
