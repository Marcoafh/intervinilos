<script setup lang="ts">
import router from '@/router';
import { useSearchStore } from '@/store/searchStore';
import { ref } from 'vue';

const buscar = ref('');
const estilo = ref('');
const lugar = ref('');
const searchStore = useSearchStore(); // Instanciar el store
const errorMessage = ref(''); // Variable para el mensaje de error

const resultadoBuscador = async () => {
  
  const url = new URL('http://localhost:3000/buscador');

const params = {  //pasamos datos como parametros para cogerlos con la query ya que algunos puede ser null
  buscar: buscar.value,
  estilo: estilo.value,
  lugar: lugar.value,
};


url.search = new URLSearchParams(params).toString();  //mirar esto mañana

const response = await fetch(url.toString(), {  //tambien mira esto
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
});

    if (response.ok) {
      const data = await response.json();

      searchStore.actualizarResultados(data); // Guardar los resultados en el store
      router.push({ name: 'listaVinilo' }); // Redirigir sin pasar los resultados por la query
    } else {
      // Si hay un error en el backend, muestra el mensaje personalizado
      errorMessage.value = 'No se han encontrado resultados'; // Aquí le damos el valor del mensaje
    }
  }

</script>
<template>
 
  
 <div class="buscador">
    <h2 class="letra">¿Que vinilo buscas?</h2>
    <form @submit.prevent="resultadoBuscador">

      <label  for="buscar">Buscar:</label>
      <input class="green" type="text" id="buscar" v-model="buscar">
    

      <label class="green" for="tras">Estilo</label>
      <select v-model="estilo" required>
        <option value="Rocks">Rocks</option>
        <option value="Regueton">Regueton</option>
        <option value="Salsa">Salsa</option>
        <option value="Pop">Pop</option>
        <option value="Hip-Hop">Hip-Hop</option>
        <option value="Electronica">Electronica</option>
        <option value="Relax">Relax</option>
        <option value="Clasica">Clasica</option>


      </select>

    <label class="green" for="tras">Lugar</label>
    <select v-model="lugar" required>
    <option value="Espana">Toda españa</option>
    <option value="cambio">Andalucía</option>
    <option value="Aragón">Aragón</option>
    <option value="Asturias">Asturias</option>
    <option value="Baleares">Baleares</option>
    <option value="Canarias">Canarias</option>
    <option value="Cantabria">Cantabria</option>
    <option value="Castilla-La Mancha">Castilla-La Mancha</option>
    <option value="Castilla y León">Castilla y León</option>
    <option value="Cataluña">Cataluña</option>
    <option value="Extremadura">Extremadura</option>
    <option value="Galicia">Galicia</option>
    <option value="La Rioja">La Rioja</option>
    <option value="Madrid">Madrid</option>
    <option value="Murcia">Murcia</option>
    <option value="Navarra">Navarra</option>
    <option value="País Vasco">País Vasco</option>
    <option value="Valencia">Valencia</option>

      </select>
      <div class="error" v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
      <button class="boto" type="submit">Buscar</button>
    </form>
     
    
  </div>


</template>
<style>

.buscador {
  background-color: rgba(217, 224, 6, 0.349);
  padding-top: 3%;
  padding-bottom: 3%;
  padding-left: 10%;
  padding-right: 3%;
  border-radius: 32px;
  margin-top: 10%;
  box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  } 

  .error {

    color: brown;
  }
.green{
  width: 25%;
}

.boto {

background-color: #d43316;
color: white;

border: none;
margin-left: 5%;
width: 15%;
margin-bottom: 1%;
margin-right: 2%;
border-radius: 15px;

}
.boto:hover {
  background-color: #f53106; 
}


@media (max-width: 420px) {
 
 #app {
  padding: 0%;
 background-color: rgb(238, 237, 217);
 .green{
  width: 45%;
}
}
.buscador {
  display: flex;
  flex-direction: column; 
  align-items: center; 
  justify-content: center;
  margin-top: 20%;
  border-radius: 0px;
  padding-left: 3%;
  
}
.boton{
width: 0%;
margin-top: 10%;

}
}

</style>

