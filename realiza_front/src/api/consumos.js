import api from './api';

// Obtener todos los consumos
export const getConsumos = async () => {
  try {
    console.log("Obteniendo Consumos");
    const response = await api.get('/Consumos');
    console.log(response.data);
    // Verifiquemos si es string o un objeto parseado:
    if (typeof response.data === 'string') {
      // Lo convertimos a objeto
      return JSON.parse(response.data);
    } else {
      // Ya es un objeto
      return response.data;
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Obtener consumos por sede
export const getConsumosPorSede = async (sede) => {
  try {
    console.log(`Obteniendo Consumos para la sede: ${sede}`);
    const response = await api.get(`/Consumos/sede?sede=${sede}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};
