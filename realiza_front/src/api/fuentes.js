import api from './api';

export const getFuentes = async () => {
  try {
    console.log("Obteniendo Fuentes");
    const response = await api.get('/Fuentes'); // endpoint de Fuentes
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
