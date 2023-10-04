<template>
  <div >
    <h1>-Mis Vinilos-</h1>
    <div  v-for="resultado in searchStore.resultados" :key="resultado.id">
      <div class="vinilos">
      <img class="imagen" :src="getImagenUrl(resultado.foto)" alt="My Image">
      <p>Título: {{ resultado.titulo }}</p>
      <p>Contenido: {{ resultado.contenido }}</p>
      <p>Precio: {{ resultado.precio }}€</p>
      <button class="boton" @click="eliminar(resultado.id)">Eliminar</button>
      <button class="boton" @click="modificar(resultado)">Modificar</button>
    </div>
  </div>
  </div>
</template>







<script setup lang="ts">
import router from '@/router';
import { useSearchStore } from '@/store/searchStore';  //pinia
import { onMounted } from 'vue';


const searchStore = useSearchStore();

interface Anuncio {
  id: number;
  titulo: string;
  contenido: string;
  foto: string; 
  precio: number;
  createdAt: Date,
  estado: string,
  tras: string,
  tipo: string,
  owner: null,
  estilo: string,
  lugar: string
  
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/aqui', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      const vinilosDb: Anuncio[] = data;
      searchStore.actualizarResultados(vinilosDb); // Guardar los resultados en el pinia para probarlo como funciona 
    } else {  //lo utilizo para guardar los datos y luego acceder desde otro componente
      const mensajeError = await response.json();
      console.error(mensajeError);
    }
  } catch (error) {
    console.error(error);
  }
});


const getImagenUrl = (imagenRutaAbsoluta: string | undefined) => {  //cotamos enlace de la foto
  if (imagenRutaAbsoluta) {
    const filename = imagenRutaAbsoluta.split('\\').pop();
    const imageUrl = `http://localhost:3000/${filename}`;
    return imageUrl;
  }
  return '';
};
function eliminar (id: number) { 
  
  fetch(`http://localhost:3000/eliminarvinilo/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
   
  })
    .then(async (response) => {
      if (response.ok) {
        alert('Anuncio borrado');
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

const modificar = (resultado: Anuncio) => {
  router.push({
    name: 'modificacionVinilo',
    query: { anuncio: JSON.stringify(resultado) }, //mando anuncio a modoficar anuncio , no lo mando el id y luego lo busco por pinia para probar otros metodos
  });

};
</script>

<style scoped>
 .boton {

background-color: #b53620;
color: white;
padding: 10px 20px;
border: none;
cursor: pointer;
border-radius: 15px;
width: 10%;
margin-bottom: 1%;
margin-right: 2%;

}
.boton:hover {
  background-color: #f53106; /* Cambia el color de fondo al pasar el ratón por encima */
}
.vinilos{
  background-color: rgb(217, 224, 6, 0.349);
  padding-bottom: 1%;
  margin-bottom: 3%;
  
  padding-left: 4%;
  box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  
}
.anuncio {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1%;
  border-radius: 15px;
}
.anuncio div {
  border: 2px solid white;
  flex-direction: column;
  justify-content: center;
  background-color: rgba(217, 224, 6, 0.349);
  display: flex;
 align-items: center;
  margin-top: 5%;
  width: calc(100% / 3);
  
}
.imagen {
  margin-top: 5%;
  width: 40%;
height: 60%;

}

.anuncio {
  border: 2px white;
 
  justify-content: center;
  background-color: rgb(123, 122, 121);
  display: flex;
  align-items: center;
  margin-top: 5%;
  flex-direction:row;
}
@media (max-width: 420px) {}
.vinilos{
  border-radius: 0%;
  margin-left: 1%;
  margin-right: 1%;
}




</style>

  
  

  

  
  
  

 