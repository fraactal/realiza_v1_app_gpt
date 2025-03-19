import React from 'react';
import { Bar } from 'react-chartjs-2';
import { datoporsede } from '../../data/data';

const GraficoHuellaDeCarbonoPorEstablecimiento = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Permite que el gráfico ocupe todo el espacio disponible
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Huella de Carbono por Establecimiento (tCO2e)',
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Toneladas de CO2e',
        },
      },
    },
  };

  return (
    <div className="w-full h-full"> {/* Ajusta el contenedor para que ocupe todo el alto */}
      <Bar data={datoporsede} options={options} className="w-full h-full" /> {/* Asegura que el gráfico también ocupe todo el alto */}
    </div>
  );
};

export default GraficoHuellaDeCarbonoPorEstablecimiento;
