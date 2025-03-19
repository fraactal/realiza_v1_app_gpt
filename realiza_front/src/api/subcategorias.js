import api from './api';

export const getSubCategorias = async () => {
  try {
    console.log("Obteniendo subcategorías");
    const response = await api.get('/SubCategorias'); // endpoint de subcategorías
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
