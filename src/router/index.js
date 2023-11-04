import { createRouter, createWebHistory } from 'vue-router'
import Appointments from '../views/Appointments.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Appointments
    },
    {
      path: '/create-appointment',
      name: 'create-appointment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/CreateAppointment.vue')
    },
    {
      path: '/appointment/:id',
      name: 'vue-appointment',
      component:()=>import('../views/ShowAppointment.vue')
    }
  ]
})

export default router
