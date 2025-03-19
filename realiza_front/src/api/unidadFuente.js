import api from './api';

export const getUnidadFuente = async () => {
  try {
    console.log("Obteniendo Unidad Fuente");
    const response = await api.get('/UnidadFuente'); // endpoint de Unidad Fuente
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
