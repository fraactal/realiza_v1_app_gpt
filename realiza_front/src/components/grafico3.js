import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getConsumosPorSede } from '../api/consumos';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Grafico3 = ({ selectedSede }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Emisiones de GEI [tCO2e]',
        backgroundColor: '#2F74BA',
        borderColor: '#DDEAF3',
        borderWidth: 0,
        hoverBackgroundColor: '#DDEAF3',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [],
      },
    ],
  });

  const options3 = {
    indexAxis: 'y', 
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  useEffect(() => {
    if (selectedSede) {
      const fetchData = async () => {
        try {
          const data = await getConsumosPorSede(selectedSede);
          const labels = data.map(item => item.fuente_emision); // valores del eje Y (fuentes de emisión)
          const dataValues = data.map(item => item.cantidad_fuente); // valores del eje X (cantidades de emisión)

          setChartData({
            labels,
            datasets: [
              {
                label: 'Emisiones de GEI [tCO2e]',
                backgroundColor: '#2F74BA',
                borderColor: '#DDEAF3',
                borderWidth: 0,
                hoverBackgroundColor: '#DDEAF3',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: dataValues,
              },
            ],
          });
        } catch (error) {
          console.error('Error al obtener consumos por sede:', error);
        }
      };

      fetchData();
    }
  }, [selectedSede]);

  return (
    <div className="w-full h-[500px] flex items-center justify-center">
      <div className="w-full h-full">
        <h1 className="text-l text-gray-800 mb-4 text-center mt-2">
          Huella de Carbono por fuente de emisión resumen por sede
    </h1>
        <div className="w-full h-full">
          <Bar data={chartData} options={options3} className="w-full h-full" />
        </div>
      </div>
    </div>

  );
};

export default Grafico3;
