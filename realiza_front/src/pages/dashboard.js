import React, { useState , useEffect } from 'react';
import GraficoHuellaDeCarbonoPorSedes from '../components/dashboard/graficoHuellaDeCarbonoPorEstablecimiento';
import GraficoHuellaDeCarbonoAlcance2 from '../components/dashboard/graficoHuellaDeCarbonoAlcance2';
import GraficoHuellaDeCarbonoAlcance1 from '../components/dashboard/graficoHuellaDeCarbonoAlcance1';
import GraficoHuellaDeCarbonoPorAlcance from '../components/dashboard/graficoHuellaDeCarbonoPorAlcance';
import GraficoHuellaDeCarbonoAlcance3 from '../components/dashboard/graficoHuellaDeCarbonoAlcance3';
import DatoHuellaDeCarbonoTotal from '../components/dashboard/datoHuellaDeCarbonoTotal';
import DatoHuellaDeCarbonoPerCapita from '../components/dashboard/datoHuellaDeCarbonoPerCapita';
import SedeSelector from '../components/dashboard/SedeSelector';
import { BiWorld } from "react-icons/bi";
import { FaRegBuilding } from "react-icons/fa";
import { getConsumos , getConsumosPorSede } from '../api/consumos';


const Dashboard = () => {
  const [selectedSede, setSelectedSede] = useState('');
  const [consumos, setConsumos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsumos = async () => {
      try {
        const data = await getConsumos(); 
        setConsumos(data); // data es el arreglo con todos los consumos
      } catch (err) {
        setError('Error al cargar los consumos');
      } finally {
        setLoading(false);
      }
    };
    fetchConsumos();
  }, []);

  if (loading) return <p>Cargando consumos...</p>;
  if (error) return <p>{error}</p>;

  const handleSedeChange = async (e) => {
    const sedeSeleccionada = e.target.value;
    setSelectedSede(sedeSeleccionada); // Actualiza la sede seleccionada

    try {
      // Almacena los consumos en el estado
      const data = await getConsumosPorSede(sedeSeleccionada);
      setConsumos(data);
    } catch (error) {
      console.error("Error obteniendo consumos por sede:", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <hr className="my-6 border-t border-gray-300" />


      {/* Sección Datos Globales */}
      <div>
          {/* Titulo */}
            <div
              className="relative inline-flex items-center space-x-2 text-black no-underline w-full mb-6">
              <BiWorld size={24} /> 
              <h2 className="text-3xl">Datos Globales</h2>
            </div>

            {/* Fila 1 */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="col-span-2 bg-blue-50 rounded-lg shadow-lg p-6">
                <DatoHuellaDeCarbonoTotal />
              </div>
              <div className="col-span-1 bg-blue-50 rounded-lg shadow-lg p-6">
                <DatoHuellaDeCarbonoPerCapita />
              </div>
            </div>

            {/* Fila 2 */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoPorAlcance />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 h-full"> {/* Agrega h-full aquí para que ocupe toda la altura */}
                <GraficoHuellaDeCarbonoPorSedes />
              </div>

            </div>

            {/* Fila 3 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                <div className="w-full h-full mb-20">
                  <GraficoHuellaDeCarbonoAlcance1 />
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoAlcance2 />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoAlcance3 />
              </div>
            </div>
        </div>
      <hr className="my-6 border-t border-gray-300" />


      {/* Sección Datos por Establecimiento */}
      <div>

        {/* Titulo */}
        <div
          className="relative inline-flex items-center space-x-2 text-black no-underline w-full mb-6">
          <FaRegBuilding size={24} /> 
          <h2 className="text-3xl">Datos por Establecimiento</h2>
        </div>

        <div className="mb-6">
          <SedeSelector onChange={handleSedeChange} />
        </div>

        {selectedSede ? (
          <>
            <p className="text-lg mb-4">Mostrando datos para la sede: <strong>{selectedSede}</strong></p>
            <div className="grid grid-cols-3 gap-6">
              {/* Fila 1 */}
              <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
                <DatoHuellaDeCarbonoTotal />
              </div>
              <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
                <DatoHuellaDeCarbonoPerCapita />
              </div>

              {/* Fila 2 */}
              <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoPorAlcance />
              </div>

              {/* Fila 3 */}
              <div className="col-span-1 bg-white rounded-lg shadow-lg p-6 overflow-hidden">
                <div className="w-full h-full">
                  <GraficoHuellaDeCarbonoAlcance1 />
                </div>
              </div>

              <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoAlcance2 />
              </div>
              <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
                <GraficoHuellaDeCarbonoAlcance3 />
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-500">Seleccione una sede para ver los datos correspondientes.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
