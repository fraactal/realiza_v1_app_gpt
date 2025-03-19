import React, { useState , useContext } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { IoIosMenu, IoIosHome, IoIosInformationCircle, IoIosFolder, IoIosSettings } from 'react-icons/io';
import { TbLogout2 } from "react-icons/tb";
import { FiLogIn } from "react-icons/fi";

import Home from '../pages/Home';
import Panelinformacion from '../pages/Panelinformacion';
import Recursos from '../pages/Recursos';
import Ajustes from '../pages/Ajustes';
import Login from '../pages/Login';

// Nuevas páginas del frontv2
import Dashboard from '../pages/dashboard';
import Analisis from '../pages/analisis';
import CargaDeInformacion from '../pages/cargaDeInformacion';

import Perfil from '../pages/Perfil';

import UploadCSV from './uploadCSV'; 
import PreviewCSV from './PreviewCSV';

import logo from '../images/imagen logo.png';

import { AuthContext } from '../context/AuthContext';

const NavBar = ({ isNavOpen, setIsNavOpen }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleNav = () => setIsExpanded(!isExpanded);
  const { user , logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // manejar logout con un contexto:
  // const { logout } = useContext(AuthContext);
  // const handleLogout = () => {
  //   logout();
  //   navigate('/login');
  // };

  const handleLogout = () => {
    logout();      
    navigate('/login'); // Redirige al login
  };

  const handleLogin = () => {
    navigate('/login'); // Redirige al login
  };
  

  return (
    <>
      <nav
        className={`fixed top-0 left-0 h-full bg-white text-black transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64 rounded-tr-lg rounded-br-lg' : 'w-16'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center p-4 ${isExpanded ? 'justify-start' : 'justify-center'}`}>
          <img src={logo} alt="Logo" className="h-8 w-8" />
          {isExpanded && <span className="ml-3 text-xl font-semibold text-[#0F79D8]">RealizApp</span>}
        </div>

        {/* Botón para expandir/colapsar */}
        <button
          className="flex items-center justify-center p-4 hover:bg-gray-700 focus:outline-none"
          onClick={toggleNav}
        >
          <IoIosMenu size={24} />
        </button>
        
        <ul className="list-none p-0 mt-4">
          {/* Opción Home */}
          <li className="p-4 flex items-center">
            <Link
              to="/"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <IoIosHome size={24} />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>

          {/* Submenú 'Gestión de Datos' (de frontv2) */}
          <li className="p-4">
            <div
              className="relative inline-flex items-center space-x-2 text-black no-underline w-full"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <IoIosInformationCircle size={24} />
              {isExpanded && <span className="font-semibold">Gestión de Datos</span>}
            </div>
            {isExpanded && (
              <ul className="pl-6 mt-2">
                <li className="p-2">
                  <Link
                    to="/carga-de-informacion"
                    className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
                    style={{
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <span>Carga de Información</span>
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    to="/dashboard"
                    className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
                    style={{
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li className="p-2">
                  <Link
                    to="/analisis"
                    className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
                    style={{
                      padding: "10px 15px",
                      borderRadius: "8px",
                    }}
                  >
                    <span>Análisis</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Panel de Información (de frontv3) 
          <li className="p-4 flex items-center">
            <Link
              to="/panel-de-informacion"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <IoIosInformationCircle size={24} />
              {isExpanded && <span>Panel de Información</span>}
            </Link>
          </li> */}

          {/* Recursos (de frontv3) */}
          <li className="p-4 flex items-center">
            <Link
              to="/recursos"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <IoIosFolder size={24} />
              {isExpanded && <span>Recursos</span>}
            </Link>
          </li>

          {/* Ajustes */}
          <li className="p-4 flex items-center">
            <Link
              to="/ajustes"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <IoIosSettings size={24} />
              {isExpanded && <span>Ajustes</span>}
            </Link>
          </li>
{/* 
          {/* Ejemplo para CSV Upload y Preview *
          <li className="p-4 flex items-center">
            <Link
              to="/upload-csv"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <span>Upload CSV</span>
            </Link>
          </li>
          <li className="p-4 flex items-center">
            <Link
              to="/preview-csv"
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              <span>Preview CSV</span>
            </Link>
          </li> */}

          {/* Logout (aun sin lógica de logout) */}
          <li className="p-4 flex items-center">
            <div
              className="relative inline-flex items-center space-x-2 text-black no-underline transition-colors duration-300 w-full rounded-lg hover:bg-gray-600 hover:text-white"
              onClick={handleLogout}
              style={{
                padding: "10px 15px",
                borderRadius: "8px",
              }}
            >
              {user ? <TbLogout2 size={24} /> : <FiLogIn size={24} />}
              {isExpanded && <span>{user ? 'Log out' : 'Log in'}</span>}
            </div>
          </li>
        </ul>
      </nav>

      <main className={`flex-1 p-4 ${isExpanded ? 'ml-64' : 'ml-16'}`}>
        <Routes>
          {/* Rutas antiguas */}
          <Route path="/" element={<Home />} />
          <Route path="/panel-de-informacion" element={<Panelinformacion />} />
          <Route path="/recursos" element={<Recursos />} />
          <Route path="/ajustes" element={<Ajustes />} />
          
          {/* Rutas CSV */}
          <Route path="/upload-csv" element={<UploadCSV />} />
          <Route path="/preview-csv" element={<PreviewCSV />} />

          {/* Rutas nuevas del frontv2 */}
          <Route path="/carga-de-informacion" element={<CargaDeInformacion />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analisis" element={<Analisis />} />

          {/* Login */}
          <Route path="/login" element={<Login />} />

          <Route path="/perfil" element={<Perfil />} />

        </Routes>
      </main>
    </>
  );
};

export default NavBar;
