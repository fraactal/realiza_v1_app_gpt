import api from './api';

export const getAlcances = async () => {
  try {
    console.log("Obteniendo alcances"); 
    const response = await api.get('/Alcances'); // endpoint de alcances
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
