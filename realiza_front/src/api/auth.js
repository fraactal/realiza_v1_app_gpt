
import api from './api';

// Llamada a /user_login para obtener el token
export const login = async (username, password) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);

  const response = await api.post('/user_login', formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  // El backend devuelve access_token
  return response.data;  // { access_token, token_type }
};

// Llamada a /user_data info del usuario
export const getUserData = async () => {
  
  const response = await api.get('/user_data');
  
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
