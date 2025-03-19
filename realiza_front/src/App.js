
// App.js
import React, { useState } from 'react';
/* 
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Panelinformacion from './pages/Panelinformacion';
import Recursos from './pages/Recursos';
import Ajustes from './pages/Ajustes';
import UploadCSV from './components/uploadCSV'; // Componente para cargar CSV
import PreviewCSV from './components/PreviewCSV'; // Componente para previsualizar CSV
 */
//>>>>>>> origin/frontv2
import Header from './components/Header'; // Importa el componente Header
import NavBar from './components/NavBar'; // Importa el componente NavBar
import './index.css'; // Asegúrate de importar index.css para usar Tailwind

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(true);

  return (
    /* 
<<<<<<< HEAD
    <div className="flex flex-col min-h-screen">
    <Header showNav={isNavOpen} setShowNav={setIsNavOpen} />
    <nav
        className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transform transition-transform duration-300 ease-in-out overflow-y-auto ${
            isNavOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
        <ul className="list-none p-0">
          <li className="p-4">
            <Link
              to="/"
              className="relative inline-block px-4 py-2 text-white no-underline rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/panel-de-informacion"
              className="relative inline-block px-4 py-2 text-white no-underline rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              Panel de Información
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/recursos"
              className="relative inline-block px-4 py-2 text-white no-underline rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              Recursos
            </Link>
          </li>
          <li className="p-4">
            <Link
              to="/ajustes"
              className="relative inline-block px-4 py-2 text-white no-underline rounded-md hover:bg-gray-600 hover:text-white transition-colors duration-300"
              onClick={() => setIsNavOpen(false)}
            >
              Ajustes
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-4 mr-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/panel-de-informacion" element={<Panelinformacion />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/ajustes" element={<Ajustes />} />
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/preview-csv" element={<PreviewCSV />} />
        </Routes>
      </main>
======= */
//  >> origin/frontv2

    <div className="flex flex-col min-h-screen bg-[#F5F6FB]">
      <Header showNav={isNavOpen} setShowNav={setIsNavOpen} />
      <NavBar isNavOpen={isNavOpen} setIsNavOpen={setIsNavOpen} />

    </div>
  );
};

export default App;
