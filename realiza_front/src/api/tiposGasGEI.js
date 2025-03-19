import api from './api';

export const getTiposGasGEI = async () => {
  try {
    console.log("Obteniendo Tipos de Gas GEI");
    const response = await api.get('/TiposGasGEI'); // endpoint de Tipos de Gas GEI
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
