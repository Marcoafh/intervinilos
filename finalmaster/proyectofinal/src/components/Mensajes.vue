<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="mensajes" v-for="mensaje in mensajes" :key="mensaje.id">
      <img class="foto" :src="getImagenUrl(mensaje.foto)" alt="My Image">
      
      <div class="mensaje-info">
        <p><span class="etiqueta">Enviado por:</span> <span class="contenido">{{ mensaje.remitente }}</span></p>
        <p><span class="etiqueta">Telefono:</span> <span class="contenido">{{ mensaje.telefono }}</span></p>
        <p><span class="etiqueta">Mensaje:</span> <span class="contenido">{{ mensaje.mensaje }}</span></p>
      </div>

      <div>
        <input id="miInput" v-model="mensaje.respuesta" required />
        <button class="bo" @click="mostrarError = true; responder(mensaje.id, mensaje.respuesta, mensaje.idr)">Responder</button>
        <button class="bo"  @click="getEliminar(mensaje.idm)">Eliminar</button>
        <span class="error" v-if="mostrarError && mensaje.respuesta === ''">Tienes que escribir un mensaje.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { useSearchStore } from '@/store/searchStore';
import { computed } from 'vue';

const searchStore = useSearchStore();

const mensajes = computed(() => searchStore.resultados);




const responder = async (id: number, mensaje: string, idr: number) => {

  
  try {
    const response = await fetch('http://localhost:3000/mensaje/respuesta', {
      method: "POST",
      body: JSON.stringify({
        mensajee: mensaje, // Usamos el valor de mensaje en lugar de respuesta.value
        id: id,
        idr: idr, 
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    });

    if (response.ok) {
      alert('mensaje enviado');
          
          router.push('/mismensajes');
          window.location.reload(); 
      
    } else {
      alert('no se a podido enviar');
    }
  } catch (error) {
    console.error('Error al enviar la respuesta:', error);
  }
}
const getImagenUrl = (imagenRutaAbsoluta: string | undefined) => {
  if (imagenRutaAbsoluta) {
    const filename = imagenRutaAbsoluta.split('\\').pop();
    const imageUrl = `http://localhost:3000/${filename}`;
    return imageUrl;
  }
  return '';
};
let mostrarError = false;




function getEliminar (idm: number) {    //llamada para eliminar
  fetch(`http://localhost:3000/mensaje/eliminarmensaje/${idm}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
   
    
  })
    .then(async (response) => {
      if (response.ok) {
        alert('Mensaje borrado');
        window.location.reload();
      } else {
        const errorMessage = await response.json();
        console.error(errorMessage);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
</script>







  
  <style scoped>
  .mensajes {
  background-color: rgba(217, 224, 6, 0.349);
    display: flex;
    font-size: larger;
    flex-direction:column;
    flex-wrap: wrap;
    margin: 1%;
    border-radius: 15px;
    box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  } 
  .foto{
    width: 10%;
    margin-top: 1%;
    margin-left: 2%;
  }
  .bo{
    background-color: #b53620; 
    border: none;
    color: white;
  ;margin-left: 1%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin-bottom: 2%;
  }
  .bo:hover {
  background-color: #f53106; /* Cambia el color de fondo al pasar el ratón por encima */
}
  .mensajes p {
    margin-left: 2%;
    margin-right: 2%;
  }
  .mensajes input {
    margin-left: 2%;
    width: 30%;
  }
 
  .mensaje-info {
    color: rgb(3, 3, 3);
    margin-bottom: -3%;
  }
  
  .mensaje-info .etiqueta {
    font-weight: bold;
    color: rgba(52, 52, 51, 0.841);
  }
  .error {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.2rem;
    display: block;
    margin-left: 2%;
   
  }
 
  @media (max-width: 420px) {
  .mensajes{
  border-radius: 0%;
  display: flex;
  align-items: center;
  flex-direction: row;
  box-shadow: 0px 0px, -0em 0 0;
  box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 2%;
}
.foto{
    width: 30%;
    margin-top: 1%;
    margin-left: 2%;
  }
.bo{
  margin-top: 10%;
  width: 25%;
  
}
#miInput {
  width: 96%;
  margin-top: 5%;
  padding: 8px;
  font-size: 20px;
  padding-bottom: 0%;
}
  }
  </style>
  