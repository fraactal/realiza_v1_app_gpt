
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.placeholder === 'Nombre de usuario' ? 'username' : 'password']: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamamos a login
      await login(credentials.username, credentials.password);

      // Si el login es exitoso, redirige a /perfil (o donde desees)
      navigate('/');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        fontFamily: 'Roboto, sans-serif',
        backgroundImage: "url('https://placehold.co/800x600?text=Background+Image+with+flowers+and+sunset')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl">
        {/* Left Section with Image and Welcome Text */}
        <div
          className="w-1/2 bg-cover bg-center p-8"
          style={{ backgroundImage: "url('https://placehold.co/400x600?text=Background+Image+with+flowers+and+sunset')" }}
        >
          <div className="flex items-center h-full">
            <div>
              <img
                src="https://storage.googleapis.com/a1aa/image/ZCM1fC72rgyWIiTkmg5ol0ArxfysUYkn3VM2RcrKn0H0H0tTA.jpg"
                alt="Logo"
                width="50"
                height="50"
                className="mb-4"
              />
              <h1 className="text-white text-4xl font-bold">Bienvenido otra vez</h1>
            </div>
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Inicio de sesión</h2>
          <p className="text-gray-600 mb-6">
            Bienvenido de nuevo, por favor inicie sesión en su cuenta.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                placeholder="Nombre de usuario"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={credentials.username}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                value={credentials.password}
              />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-blue-500" />
                <span className="ml-2 text-gray-700">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-gray-600 hover:underline">
                ¿Olvidaste la contraseña?
              </a>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Iniciar sesión
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            ¿Eres Nuevo?{' '}
            <a href="#" className="text-blue-500 hover:underline">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
