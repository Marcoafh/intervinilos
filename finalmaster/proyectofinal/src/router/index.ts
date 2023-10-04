import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import registroUsuario from '@/components/registroUsuario.vue'
import anuncioVinilo from '@/components/anuncioVinilo.vue'
import listaVinilo from '@/components/listaVinilo.vue'

import detalleAnuncio from '@/components/detalleAnuncio.vue'
import loginautentic from '@/components/LoginAutentic.vue'
import misVinilos from '@/components/MisVinilos.vue'
import MisMensajes from '@/components/MisMensajes.vue'




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/registro',
      name: 'registrousuario',
      component: registroUsuario
    },
    {
      path: '/vinilos/registro',
      name: 'registroVinilo',
      component: anuncioVinilo
    },
    {
      path: '/vinilos/modificacion',
      name: 'modificacionVinilo',
      component: anuncioVinilo,
      props: route => ({ anuncio: JSON.parse(route.query.anuncio as string) }),
    },
    {
      path: '/listaVinilo',
      name: 'listaVinilo',
      component: listaVinilo
    },
    {
      path: '/login',
      name: 'login',
      component: loginautentic
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/detalleAnuncio/:id',
      name: 'detalleAnuncio',
      component: detalleAnuncio,
    },
    {
      path: '/misvinilos/',
      name: 'misvinilos',
      component: misVinilos,
    },
    {
      path: '/mismensajes/',
      name: 'mismensajes',
      component: MisMensajes,
    },
    


  ]
})

export default router
