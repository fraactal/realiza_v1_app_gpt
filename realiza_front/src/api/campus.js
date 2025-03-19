import api from './api';

export const getCampus = async () => {
  try {
    console.log("Obteniendo campus");
    const response = await api.get('/Campus'); // endpoint de Campus
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
