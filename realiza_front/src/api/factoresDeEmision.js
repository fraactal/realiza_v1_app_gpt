import api from './api';

export const getFactoresDeEmision = async () => {
  try {
    console.log("Obteniendo Factores de Emisión");
    const response = await api.get('/FactoresDeEmision'); // endpoint de Factores de Emisión
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
