import React, { useState } from 'react';
import DatosHistoricos from '../components/analisis/datoshistoricos';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importar íconos

const Analisis = () => {
  const [isDatosHistoricosOpen, setIsDatosHistoricosOpen] = useState(false); // Controla si se muestra "Datos Históricos"

  return (
    <div className="container mx-auto p-6">
      {/* Título Principal */}
      <h1 className="text-4xl font-bold text-center mb-8">Análisis de Información</h1>

      {/* Sección: ¿Quiénes Somos? */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Sobre esta página</h2>
        <p className="text-lg text-gray-700">
        Información histórica sobre los principales indicadores y tendencias de los datos.
        </p>
      </section>

      {/* Sección: Datos Históricos */}
      <div>
        <h2
          className="text-2xl font-semibold flex items-center cursor-pointer"
          onClick={() => setIsDatosHistoricosOpen(!isDatosHistoricosOpen)} // Alterna la visibilidad de la sección
        >
          <FaChevronUp className="text-green-500 mr-2" /> {/* Icono */}
          <span>Datos históricos</span>
          {isDatosHistoricosOpen ? (
            <FaChevronUp className="ml-2 text-gray-600" />
          ) : (
            <FaChevronDown className="ml-2 text-gray-600" />
          )} {/* Icono para expandir/contraer */}
        </h2>

        {isDatosHistoricosOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <DatosHistoricos /> {/* Componente de datos históricos */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analisis;
