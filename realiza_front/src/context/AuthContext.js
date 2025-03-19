import React, { createContext, useState, useEffect } from 'react';
import { login as loginApi, getUserData } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // si hay un token en localStorage, llamar /user_data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(); 
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const data = await getUserData(); // llama a /user_data
      setUser(data);
    } catch (err) {
      console.error('Error obteniendo datos de usuario:', err);
      // token es inválido
      setUser(null);
    }
  };

  // Función que se usa cuando el usuario hace login
  const login = async (username, password) => {
    const { access_token } = await loginApi(username, password);
    localStorage.setItem('token', access_token);
    // guardar el token - llama a /user_data
    await fetchUserData();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
