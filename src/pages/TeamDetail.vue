<template>
  <q-page>
    <q-card v-if="teamDetails">
      <q-card-section>
        <div class="text-h6">{{ teamDetails.Constructor.name }}</div>
        <div>Posición: {{ teamDetails.positionText }}</div>
        <div>Puntos: {{ teamDetails.points }}</div>
        <div>Victorias: {{ teamDetails.wins }}</div>
        <div>Nacionalidad: {{ teamDetails.Constructor.nationality }}</div>
        <div>
          <a :href="teamDetails.Constructor.url" target="_blank">Ver más sobre {{ teamDetails.Constructor.name }}</a>
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
const { teamDetails, fetchTeamDetails } = useF1Api();

onMounted(() => {
  fetchTeamDetails(route.params.id); 
});
</script>
