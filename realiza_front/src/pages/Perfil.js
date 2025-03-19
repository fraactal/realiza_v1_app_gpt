import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-gray-600 text-lg">No estás logueado.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Perfil del Usuario</h2>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-1"><span className="font-semibold">Nombre:</span> {user.nombre}</p>
          <p className="text-gray-600"><span className="font-semibold">Correo:</span> {user.correo}</p>
          {/* Si hay más datos, agrégalos aquí */}
        </div>

        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default Perfil;
