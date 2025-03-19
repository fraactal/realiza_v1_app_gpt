import api from './api';

export const getSedes = async () => {
  try {
    console.log("ingreso a sedes");
    const response = await api.get('/Campus'); // endpoint
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
