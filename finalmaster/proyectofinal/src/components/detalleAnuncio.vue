<template>
  <div class="anuncioo">
   
    <h1 class="titulo">{{ anuncio.titulo }}</h1>
    
    
      <img class="foto" :src="getImagenUrl(anuncio.foto)" alt="My Image">
    


    <div class="letras">
      <span class="precio">Precio:</span> {{ anuncio.precio }}€
      <p>titulo: {{ anuncio.titulo }}</p>
    <p>contenido: {{ anuncio.contenido }}</p>
    <p>Estado: {{ anuncio.estado }}</p>
    <p>tipo tras: {{ anuncio.tras }}</p>
    <p>tipo: {{ anuncio.tipo }}</p>
    <p>estilo: {{ anuncio.estilo }}</p>
    <p>sitio: {{ anuncio.lugar }}</p>
    <p>Vendedor: {{ anuncio.owner.nombre }}</p>
  </div>

  <div class="mensaje">
    
    <form @submit.prevent="mensajeUsuario">

      <div v-if="userData">
        <h2>Mensaje a usuario</h2>
      <label for="mensaje"></label>
      <textarea id="mensaje" v-model="mensaje" required></textarea>
      <button class="boton" type="submit">Mandar</button>
     </div>
    </form>
    


  </div>

  
</div>


</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useSearchStore } from '@/store/searchStore';
import router from '@/router';
import { getUserData } from './setCookie.vue';





let userData: any = undefined;
userData = getUserData();



const route = useRoute();
const searchStore = useSearchStore();  //instaciamos en pinia

const anuncioId = Number(route.params.id); //pasamos el id a variable

const anuncio = computed(() => searchStore.resultados.find((resultado) => resultado.id === anuncioId)); //buscamos por el id mediante una propiedad computada



const getImagenUrl = (imagenRutaAbsoluta: string | undefined) => {  //sacamos la foto
  if (imagenRutaAbsoluta) {
    const filename = imagenRutaAbsoluta.split('\\').pop();
    const imageUrl = `http://localhost:3000/${filename}`;
    return imageUrl;
  }
  return '';
};

const mensaje = ref("");


async function mensajeUsuario() {
  
  

    const response = await fetch('http://localhost:3000/mensaje', {  //enviamos mensaje
      method: "POST",
      body: JSON.stringify({

        mensajee: mensaje.value,
        id: anuncioId
        
      }),
      headers: {
        "Content-Type": "application/json"
      },

      credentials: 'include',
    });

    if (response.ok) {
      router.push('/vinilos');
    } else {
       await response.json();
      
       
      }
    }
 
   
  

</script>



  
<style>
.precio {
  font-size: 20px; 
  font-weight: bold; 
  color: rgb(199, 223, 22); }
  .anuncioo {
    border: 2px white;
    border-radius: 10px;
    display: flex;
    align-items: baseline;
    flex-direction: column;

  
    box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
    background-color: rgb(123, 122, 121);
    background-color: rgba(217, 224, 6, 0.349);
    margin-top: 5%;
    color: black;
  }
  .imagen{
  margin-top: 5%;
  }

  .foto{
    width: 44%;
    margin-left: 5%;
    
  }
  .titulo{
    margin-top: 2%;
    color: rgb(156, 18, 18);
    padding-bottom: 2%;
  }
  .letras{
    color: brown;
    
  }
  #mensaje{
    width: 350%;
  height: 200px;
  border-radius: 15px;
  margin-bottom: 5%;
  }
  .boton {

  background-color: #b53620;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  width: 80%;
  margin-bottom: 10%;
  
  
}
.boton:hover {
  background-color: #f53106; 
}
  </style>