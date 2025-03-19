import React, { useState, useEffect } from 'react';
import { getSedes } from '../api/sedes';

const SedeSelector = ({ onChange }) => {
  const [sedes, setSedes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        setLoading(true);
        const data = await getSedes(); 
        console.log("Sedes obtenidas:", data); 
        setSedes(data);
      } catch (error) {
        setError('Error al cargar las sedes');
      } finally {
        setLoading(false);
      }
    };

    fetchSedes();
  }, []);

  if (loading) return <p>Cargando sedes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mb-4">
      <select className="block w-full p-2 border rounded text-black" onChange={onChange}>
        <option value="">Selecciona una sede</option>
        {sedes.map((sede) => (
          <option key={sede.id_campus} value={sede.nombre_campus}>
            {sede.nombre_campus}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SedeSelector;
