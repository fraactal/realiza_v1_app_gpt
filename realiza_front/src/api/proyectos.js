import api from './api';

export const getProyectos = async () => {
  try {
    console.log("Obteniendo proyectos");
    const response = await api.get('/Proyectos'); // endpoint de Proyectos
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
