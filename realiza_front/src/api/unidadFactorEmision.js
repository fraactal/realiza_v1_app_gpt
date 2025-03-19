import api from './api';

export const getUnidadFactorEmision = async () => {
  try {
    console.log("Obteniendo Unidad Factor Emisión");
    const response = await api.get('/UnidadFactorEmision'); // endpoint de Unidad Factor Emisión
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
