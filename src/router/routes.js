import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import F1Page from '@/pages/F1Page.vue';
import DriverDetail from '@/pages/DriverDetail.vue';
import TeamDetail from '@/pages/TeamDetail.vue';

const routes = [
  {
    path: '/',
    component: MainLayout, // Aquí envolvemos todas las páginas dentro del MainLayout
    children: [
      { path: '', component: F1Page },
      { path: 'drivers/:id', component: DriverDetail },
      { path: 'teams/:id', component: TeamDetail },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
