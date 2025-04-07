<template>
  <q-page padding>
    <q-tabs v-model="tab" class="text-primary">
      <q-tab name="drivers" label="Pilotos" />
      <q-tab name="teams" label="Escuderías" />
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="drivers">
        <q-input v-model="busquedaPiloto" filled label="Buscar piloto" class="q-mb-md" />

        <q-table :rows="filteredDrivers" :columns="driverColumns" row-key="driverId" flat bordered>
          <template v-slot:body-cell-image="props">
            <q-td :props="props">
              <q-avatar size="40px">
                <img :src="props.row.image" />
              </q-avatar>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="primary" label="Ver Detalles" @click="IrAlDetallePiloto(props.row.driverId)" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>

      <q-tab-panel name="teams">
        <q-input v-model="busquedaEquipo" filled label="Buscar escudería" class="q-mb-md" />

        <q-table :rows="filteredTeams" :columns="teamColumns" row-key="constructorId" flat bordered>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn color="primary" label="Ver Detalles"
                @click="IrAlDetalleEquipo(props.row.Constructor.constructorId)" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useF1Api } from '../composables/useF1Api';

const { drivers, teams, fetchDrivers, fetchTeams } = useF1Api();
const router = useRouter();
const tab = ref('drivers');
const busquedaPiloto = ref('');
const busquedaEquipo = ref('');

onMounted(() => {
  fetchDrivers();
  fetchTeams();
});

const driverColumns = [
  { name: 'image', label: 'Foto', align: 'left', field: 'image' },
  { name: 'name', label: 'Nombre', align: 'left', field: row => `${row.givenName} ${row.familyName}` },
  { name: 'nationality', label: 'Nacionalidad', align: 'left', field: 'nationality' },
  { name: 'actions', label: 'Acciones', align: 'center' },
];

const teamColumns = [
  { name: 'name', label: 'Nombre', align: 'left', field: row => row.Constructor.name },
  { name: 'nationality', label: 'Nacionalidad', align: 'left', field: row => row.Constructor.nationality },
  { name: 'actions', label: 'Acciones', align: 'center' },
];

const filteredDrivers = computed(() =>
  drivers.value.filter(driver => driver.givenName.toLowerCase().includes(busquedaPiloto.value.toLowerCase()))
);

const filteredTeams = computed(() =>
  teams.value.filter(team => team.Constructor.name.toLowerCase().includes(busquedaEquipo.value.toLowerCase()))
);

const IrAlDetallePiloto = (driverId) => {
  router.push(`/drivers/${driverId}`);
};

const IrAlDetalleEquipo = (constructorId) => {
  router.push(`/teams/${constructorId}`);
};
</script>
