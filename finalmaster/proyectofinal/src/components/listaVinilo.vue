<template>
  <div class="anuncio">
    <div v-for="resultado in searchStore.resultados" :key="resultado.id" @click="click(resultado.id)">
      <img class="imagen" :src="getImagenUrl(resultado.foto)" alt="My Image">
      <p>Título: {{ resultado.titulo }} </p> 
      <p>Precio: {{ resultado.precio }}€</p> 
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSearchStore } from '@/store/searchStore';


const router = useRouter();
const searchStore = useSearchStore();

const getImagenUrl = (imagenRutaAbsoluta: string | undefined) => {
  if (imagenRutaAbsoluta) {
    const filename = imagenRutaAbsoluta.split('\\').pop();
    const imageUrl = `http://localhost:3000/${filename}`;
    return imageUrl;
  }
  return '';
};

const click = (id: number) => {// se manda por el router el id a detala anuncio se usa esta tecnica para probar diferentes formas
  router.push({ name: 'detalleAnuncio', params: { id } });
};
</script>



<style scoped>
.anuncio {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1%;
  border-radius: 15px;
}
.anuncio div {
  
  flex-direction: column;
  justify-content: center;
  background-color: rgba(217, 224, 6, 0.349);
  display: flex;
 align-items: center;
  margin-top: 5%;
  box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  width: calc(96% / 3);
  margin-bottom: 3%;
  border-radius: 15px;
  margin-left: 1%;
  
}
.anuncio div:hover {
  background-color:rgb(203, 203, 106);
}

.imagen {
  margin-top: 5%;
  width: 55%;
  height: 12.5rem;
  

}





.imagen{
margin-top: 5%;
}
@media (max-width: 420px) {
 
  .anuncio div {
    width: 50%; 
    margin-left: 0%; 
    margin-right: 1%; 
    height: 12.5rem;
  
  }
  }



</style>