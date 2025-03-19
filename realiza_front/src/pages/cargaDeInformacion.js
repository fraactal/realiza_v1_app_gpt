// src/pages/cargaDeInformacion.js
import React, { useState } from 'react';
import NextSteps from '../components/cargadeinformacion/nextSteps';
import DataVisualization from '../components/cargadeinformacion/dataVisualization';

const CargaDeInformacion = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [hasError, setHasError] = useState(false);

  const handleFileParsed = (data, name, error) => {
    if (error) {
      // Error parseando
      setHasError(true);
      setCurrentStep(2); // O te quedas en 1, como prefieras
    } else {
      // Éxito
      setHasError(false);
      setCsvData(data);
      setFileName(name);
      setCurrentStep(2); // Indica que estamos en “Chequea la Previsualización”
    }
  };

  const handleConfirm = () => {
    // Confirmar envío
    // Podrías setear step 3
    setCurrentStep(3);
    alert('¡Datos enviados al servidor!');
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <NextSteps
          setCsvData={(data) => handleFileParsed(data, 'ARCHIVO.csv', false)}
          setFileName={setFileName}
          // Podrías pasar directamente handleFileParsed si quieres
        />

        {/* 
          Le pasamos currentStep y hasError al DataVisualization,
          que a su vez se lo pasa a ProgressBar
        */}
        <DataVisualization
          csvData={csvData}
          fileName={fileName}
          onConfirm={handleConfirm}
          currentStep={currentStep}
          hasError={hasError}
        />
      </div>
    </div>
  );
};

export default CargaDeInformacion;
