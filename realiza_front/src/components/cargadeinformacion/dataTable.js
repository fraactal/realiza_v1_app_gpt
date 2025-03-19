
import React from 'react';

const DataTable = ({ data }) => {
  // data es un array de objetos. Ejemplo: [{col1: val1, col2: val2}, ...]

  if (!data || data.length === 0) {
    return <p className="text-gray-500">No hay datos para mostrar. Sube un archivo CSV.</p>;
  }

  // Obtenemos las columnas a partir de las keys del primer objeto
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto">
      <div className="table-container">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="py-2 px-4 border-b bg-gray-100 text-left font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex} className="py-2 px-4 border-b">
                  {row[header]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default DataTable;
