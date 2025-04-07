<template>
    <q-page>
      <q-card v-if="driverDetails">
        <q-card-section>
          <q-avatar size="100px">
            <img :src="driverDetails.image" alt="Foto del piloto" />
          </q-avatar>
          <div class="text-h6">{{ driverDetails.givenName }} {{ driverDetails.familyName }}</div>
          <div>Fecha de nacimiento: {{ driverDetails.dateOfBirth }}</div>
          <div>Nacionalidad: {{ driverDetails.nationality }}</div>
          <div>Número: {{ driverDetails.permanentNumber }}</div>
          <div>Pseudònimo: {{ driverDetails.code }}</div>
          <div>
            <a :href="driverDetails.url" target="_blank">Ver más sobre {{ driverDetails.givenName }} {{ driverDetails.familyName }}</a>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useF1Api } from '../composables/useF1Api';
  
  const route = useRoute();
  const { driverDetails, fetchDriverDetails } = useF1Api();
  
  onMounted(() => {
    fetchDriverDetails(route.params.id);
  });
  </script>
  