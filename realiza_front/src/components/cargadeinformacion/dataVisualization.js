import React from 'react';
import ProgressBar from './progressBar';
import DataTable from './dataTable';

const DataVisualization = ({ csvData, fileName, onConfirm, currentStep, hasError }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">VISUALIZACIÓN DE DATOS</h2>
        <span className="bg-blue-600 text-white px-4 py-2 rounded">
          {fileName || 'No Archivo'}
        </span>
      </div>

      <ProgressBar currentStep={currentStep} hasError={hasError} />

      <DataTable data={csvData} />

      <button
        onClick={onConfirm}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Confirmar y Enviar
      </button>
    </div>
  );
};

export default DataVisualization;
