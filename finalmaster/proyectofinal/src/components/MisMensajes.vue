<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<template>
  <h1>-Mis Mensajes-</h1>
  <Mensajes></Mensajes>
</template>



<script setup lang="ts">

import Mensajes from './Mensajes.vue'


import { useSearchStore } from '@/store/searchStore';

const searchStore = useSearchStore();




   fetch('http://localhost:3000/mensaje', {//llamada
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
              }).then(async (response) => {
                const data = await response.json() as {
                  id: number,
                  mensaje: string,
                  usuarioid: string,
                  viniloid: string,
                
                }[]
                searchStore.actualizarResultados(data);
                console.log(data)
                
                console.log(data)
              })




</script>

<style>

  
</style>