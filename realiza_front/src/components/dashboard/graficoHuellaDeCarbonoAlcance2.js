import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { data2, options3 } from '../../data/data'; // Importa los datos

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Modifica las opciones para mejorar la legibilidad
const customOptions3 = {
  ...options3,
  responsive: true,
  maintainAspectRatio: false, // Permite ajustar el alto del gráfico
  scales: {
    x: {
      ticks: {
        font: {
          size: 12, // Ajusta el tamaño de la fuente en el eje X
        },
      },
    },
    y: {
      ticks: {
        font: {
          size: 12, // Ajusta el tamaño de la fuente en el eje Y
        },
      },
    },
  },
};

const GraficoAlcance2 = () => {
  return (
    <div className="w-full h-96 flex items-center justify-center"> {/* Aumenta el alto */}
      <div className="w-full max-w-[600px] h-full"> {/* Ajusta el ancho máximo */}
        <h1 className="text-lg text-gray-800 mb-4 text-center mt-2">
          Huella de Carbono por fuente de emisión <strong>Alcance 2</strong>
        </h1>
        <div className="w-full h-full">
          <Bar data={data2} options={customOptions3} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default GraficoAlcance2;
