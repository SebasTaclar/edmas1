import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/financiero',
      name: 'financiero',
      component: () => import('../views/Financiero.vue'),
    },
    {
      path: '/supervisor',
      name: 'supervisor',
      component: () => import('../views/Supervisor.vue'),
    },
    {
      path: '/producto',
      name: 'producto',
      component: () => import('../views/Producto.vue'),
    },
    {
      path: '/recursos-humanos',
      name: 'recursos-humanos',
      component: () => import('../views/RecursosHumanos.vue'),
    },
    // Catch-all route - debe ir al final
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/',
    },
  ],
})

export default router
