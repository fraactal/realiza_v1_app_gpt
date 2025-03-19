import React from 'react';
import DataCard from './dataCard';
import { GrDocumentUpload } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FiBookOpen } from "react-icons/fi";

const NextSteps = ({ setCsvData, setFileName }) => {
  const steps = [
    { icon: <GrDocumentUpload />, title: 'Carga los datos', button: 'SUBIR ARCHIVOS' },
    { icon: <IoDocumentTextOutline />, title: 'Plantilla de datos', button: 'DESCARGAR' },
    { icon: <FiBookOpen />, title: 'Manual de carga de datos', button: 'DESCARGAR' },
  ];

  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">PRÓXIMOS PASOS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <DataCard
            key={index}
            icon={step.icon}
            title={step.title}
            button={step.button}
            setCsvData={setCsvData}
            setFileName={setFileName}
          />
        ))}
      </div>
    </div>
  );
};

export default NextSteps;
