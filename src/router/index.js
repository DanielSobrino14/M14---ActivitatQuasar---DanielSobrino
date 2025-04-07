import { createRouter, createWebHistory } from 'vue-router';
import F1Page from '../pages/F1Page.vue';
import DriverDetail from '../pages/DriverDetail.vue';
import TeamDetail from '../pages/TeamDetail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: F1Page,
  },
  {
    path: '/drivers/:id',
    name: 'driverDetail',
    component: DriverDetail,
    props: true, // Esto permite pasar el parámetro 'id' como prop
  },
  {
    path: '/teams/:id',
    name: 'teamDetail',
    component: TeamDetail,
    props: true, // Esto permite pasar el parámetro 'id' como prop
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
