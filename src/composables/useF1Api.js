import { ref } from 'vue';
import axios from 'axios';


export function useF1Api() {
  const drivers = ref([]);
  const teams = ref([]);
  const driverDetails = ref(null);
  const teamDetails = ref(null);

  // Obtener pilotos
  const fetchDrivers = async () => {
    try {
      const response = await axios.get(`https://f1-api-7h7q.onrender.com/api/drivers`);
      drivers.value = response.data;
    } catch (error) {
      console.error('Error al obtener pilotos:', error);
    }
  };

  // Obtener escuderías
  const fetchTeams = async () => {
    try {
      const response = await axios.get(`https://f1-api-7h7q.onrender.com/api/standings/constructors`);
      teams.value = response.data;
    } catch (error) {
      console.error('Error al obtener escuderías:', error);
    }
  };

  // Obtener detalles del piloto
  const fetchDriverDetails = async (driverId) => {
    try {
      const response = await axios.get(`https://f1-api-7h7q.onrender.com/api/drivers/`);
      const piloto = response.data.find(piloto => piloto.driverId === driverId);

      if (piloto) {
        driverDetails.value = piloto;
      } else {
        console.error('Piloto no encontrado');
      }
    } catch (error) {
      console.error('Error al obtener detalles del piloto:', error);
    }
  };

  // Obtener detalles de las escuderias
  const fetchTeamDetails = async (constructorId) => {
    try {
      const response = await axios.get(`https://f1-api-7h7q.onrender.com/api/standings/constructors`);
      const team = response.data.find(team => team.Constructor.constructorId === constructorId);

      if (team) {
        teamDetails.value = team;
      } else {
        console.error('Escudería no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener detalles de la escudería:', error);
    }
  };

  return { drivers, teams, driverDetails, teamDetails, fetchDrivers, fetchTeams, fetchDriverDetails, fetchTeamDetails };
}
