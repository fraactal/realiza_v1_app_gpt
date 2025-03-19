// src/components/cargadeinformacion/progressBar.js
import React from 'react';
import { MdChevronRight } from "react-icons/md";


const ProgressBar = ({ currentStep, hasError }) => {

  const step1Classes = `
    px-2 py-1 rounded
    ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'text-gray-600'}
  `;

  // Paso 2

  const step2Classes = `
    px-2 py-1 rounded
    ${
      currentStep >= 2
        ? hasError
          ? 'bg-red-500 text-white'
          : 'bg-blue-500 text-white'
        : 'text-gray-600'
    }
  `;

  // Paso 3
  const step3Classes = `
    px-2 py-1 rounded
    ${currentStep >= 3 ? 'bg-blue-500 text-white' : 'text-gray-600'}
  `;

  return (
    <div className="inline-flex items-center mb-4 rounded-full border-2 border-gray-300 px-4 py-2">
      {/* Paso 1 */}
      <span className={step1Classes}>Carga de Datos</span>
      <div className="text-3xl text-gray-600 mx-2">
        <MdChevronRight />
      </div>

      {/* Paso 2 */}
      <span className={step2Classes}>Chequea la Previsualización</span>
      <div className="text-3xl text-gray-600 mx-2">
        <MdChevronRight />
      </div>

      {/* Paso 3 */}
      <span className={step3Classes}>Carga Completa</span>
    </div>
  );
};

export default ProgressBar;
