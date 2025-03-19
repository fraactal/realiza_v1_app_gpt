import api from './api';

export const getCategorias = async () => {
  try {
    console.log("Obteniendo categorías");
    const response = await api.get('/'); // endpoint de categorías
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
