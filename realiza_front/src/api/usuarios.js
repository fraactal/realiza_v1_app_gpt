import api from './api';

export const getUsuarios = async () => {
  try {
    console.log("Obteniendo usuarios");
    const response = await api.get('/Usuarios'); // endpoint de Usuarios
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
