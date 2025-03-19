import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../PreviewCSV.css';

const PreviewCSV = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const csvData = location.state?.data || [];

  const handleSubmit = () => {
    console.log('Enviando datos al servidor:', csvData);
    navigate('/success');
  };

  return (
      <div>
    <div className="table-container">
      <h2>Previsualización de los Datos del CSV</h2>
      <table>
        <thead>
          <tr>
            {csvData.length > 0 &&
              Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button onClick={handleSubmit} className="confirm-button">
        Confirmar y Enviar
      </button>
    </div>
  );
};

export default PreviewCSV;
