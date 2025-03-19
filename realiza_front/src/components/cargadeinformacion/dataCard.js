import React, { useRef } from 'react';
import Papa from 'papaparse';

const DataCard = ({ icon, title, button, setCsvData, setFileName }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (button === 'SUBIR ARCHIVOS') {
      // Abrir el file input oculto
      fileInputRef.current.click();
    } else if (button === 'DESCARGAR') {
      // Ejemplo: Descargar plantilla/manual
      const url = '/Doc/Plantilla.csv'; 
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Plantilla.csv';   
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          // Guardamos la data en el estado de la página (a través de props)
          setCsvData(results.data);
          setFileName(file.name);

          // Si deseas notificar al usuario
          alert(`Archivo "${file.name}" parseado con éxito. Revisa la previsualización`);
        },
      });
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
      <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mr-4">
        <div className="text-5xl text-gray-600">{icon}</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded" onClick={handleButtonClick}>
          {button}
        </button>

        {/* input file oculto si es “SUBIR ARCHIVOS” */}
        {button === 'SUBIR ARCHIVOS' && (
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default DataCard;
