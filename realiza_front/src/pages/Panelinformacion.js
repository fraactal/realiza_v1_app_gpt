import React, { useState } from 'react';
import Grafico1 from '../components/grafico1';
import Grafico2 from '../components/grafico2';
import Grafico3 from '../components/grafico3';
import Grafico4 from '../components/grafico4';
import DatosHistoricos from '../components/datoshistoricos';
import CargaDeInformacion from '../components/cargadeinformacion';
import DatoGlobal from '../components/datoglobal';
import { FaChartLine, FaHistory, FaFileImport, FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Importar íconos
import DatoporSede from '../components/datoporsede';
import SedeSelector from '../components/SedeSelector';
import { getConsumosPorSede } from '../api/consumos';

const PanelInformacion = () => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isDatosHistoricosOpen, setIsDatosHistoricosOpen] = useState(false);
  const [isCargaInformacionOpen, setIsCargaInformacionOpen] = useState(false);
  const [selectedSede, setSelectedSede] = useState('');
  const [consumos, setConsumos] = useState(null);

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
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Panel de Información</h1> {/* Título principal */}

      {/* Sección de Dashboard Huella de Carbono */}
      <div>
        <h2
          className="text-2xl font-semibold flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsDashboardOpen(!isDashboardOpen)}
        >
          <FaChartLine className="text-blue-500" /> {/* icono */}
          <span>Dashboard Huella de Carbono</span>
          {isDashboardOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />} {/* Menú desplegable */}
        </h2>
        {isDashboardOpen && (
          <>
            <h3 className="text-xl mt-4 mb-2">Datos globales</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <DatoGlobal />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Grafico1 />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Grafico2 />
              </div>
            </div>

            {/* Sección de Datos por sede */}
            <h3 className="text-xl mt-4 mb-2">Datos por sede</h3>
            <div className="mb-4">
              {/* Usa el componente SedeSelector que recibe el onChange */}
              <SedeSelector onChange={handleSedeChange} />
            </div>


            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <DatoporSede selectedSede={selectedSede} />
              </div>
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Grafico4 />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <Grafico3 selectedSede={selectedSede} />
              </div>
            </div>

          </>
        )}
      </div>

      {/* Sección de Datos Históricos */}
      <div>
        <h2
          className="text-2xl font-semibold flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsDatosHistoricosOpen(!isDatosHistoricosOpen)}
        >
          <FaHistory className="text-green-500" /> {/* icono */}
          <span>Datos históricos</span>
          {isDatosHistoricosOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />} {/* Menú desplegable */}
        </h2>
        {isDatosHistoricosOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <DatosHistoricos />
          </div>
        )}
      </div>

      {/* Sección de Carga de Información */}
      <div>
        <h2
          className="text-2xl font-semibold flex items-center space-x-2 cursor-pointer"
          onClick={() => setIsCargaInformacionOpen(!isCargaInformacionOpen)}
        >
          <FaFileImport className="text-red-500" /> {/* icono */}
          <span>Carga de información</span>
          {isCargaInformacionOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />} {/* Menú desplegable */}
        </h2>
        {isCargaInformacionOpen && (
          <div className="bg-white rounded-lg shadow-lg p-4 mt-4">
            <CargaDeInformacion />
          </div>
        )}
      </div>
    </div>
  );
};

export default PanelInformacion;
