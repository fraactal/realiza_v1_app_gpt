
import React from 'react';
import Papa from 'papaparse';
import { useNavigate } from 'react-router-dom';

const UploadCSV = () => {
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          navigate('/preview-csv', { state: { data: results.data } });
        },
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Cargar archivo CSV</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default UploadCSV;
