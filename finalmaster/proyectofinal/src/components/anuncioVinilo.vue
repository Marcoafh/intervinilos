<template>
  <div class="formCreateContainer">
    <div class="titulo">
    <h2 >NUEVO VINILO</h2>
  </div>
    <form @submit.prevent="publicaVinilo" class="formCreateContainer">
      <div v-if="fotoURL">
        <img :src="fotoURL" alt="Vista previa de la foto" class="preview-img">
      </div>
      <label class="label-input" for="photoInput">Seleccionar foto:</label>
      <input class="label-input" type="file" id="photoInput" accept="image/*" @change="cambiofoto">
      
      <label class="green" for="title">Titulo</label>
      <input class="label-input" type="text" name="titulo" id="tituloInput" v-model="titulo">

      <label class="green" for="content">Contenido del anuncio</label>
      <textarea class="label-input" name="contenido" id="contenidoInput" v-model="contenido"></textarea>

      <label class="green">Estado</label>
      <input class="label-input" type="radio" name="estado" value="nuevo" v-model="estado"> Nuevo
      <input class="label-input" type="radio" name="estado" value="seminuevo" v-model="estado"> Seminuevo
      <input class="label-input" type="radio" name="estado" value="usado" v-model="estado"> Usado

      <label class="green" for="tras">Cambio o venta</label>
      <select class="label-input" v-model="tras">
        <option value="cambio">Cambio</option>
        <option value="venta">Venta</option>
      </select>

      <label class="green" for="tipo">Tipo de vendedor</label>
      <select class="label-input" v-model="tipo">
        <option value="particular">Particular</option>
        <option value="tienda">Tienda</option>
      </select>

      <label class="green" for="price">Precio</label>
      <input class="label-input" type="number" name="precio" id="precioInput" v-model="precio">

      <label class="green">Estilo de musica</label>
      <select class="label-input" v-model="estilo">
    <option value="Hip-Hop">Hip-Hop</option>
    <option value="Electronica">Electronica</option>
    <option value="Salsa">Salsa</option>
    <option value="Rocks">Rocks</option>
    <option value="Regueton">Regueton</option>
    <option value="Pop">Pop</option>
    <option value="Relax">Relax</option>
    <option value="Clasica">Clasica</option>
    </select>

    <label class="green" for="tipo">Sitio donde se vende</label>
    <select class="label-input" v-model="lugar">
    <option value="Andalucía">Toda españa</option>
    <option value="Andalucía">Andalucía</option>
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



      <button class="submitBtn" type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">





import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();  // se instancia el router

const anuncio = route.query.anuncio ? JSON.parse(route.query.anuncio as string) : null;
 //si anuncio existe lo parsemaos pa coger los datos si no es null
 //recibo los datos mandados



interface FormDataFields {
  id: number | null;
  titulo: string;
  contenido: string;
  estado: string;
  tras: string;
  tipo: string;
  precio: number;
  estilo: string;
  lugar: string;
}

const id = ref<number | null>(null);
const titulo = ref('');
const contenido = ref('');
const estado = ref('');
const tras = ref('');
const tipo = ref('');
const precio = ref(0);
const foto = ref<File | undefined>(undefined);
const fotoURL = ref<string>('');
const estilo = ref('');
const lugar = ref('');


if (anuncio) {
  id.value = anuncio.id;
  foto.value = anuncio.foto;
  titulo.value = anuncio.titulo;
  contenido.value = anuncio.contenido;
  estado.value = anuncio.estado;
  tras.value = anuncio.tras;
  tipo.value = anuncio.tipo;
  precio.value = anuncio.precio;
  estilo.value = anuncio.estilo;
  lugar.value = anuncio.lugar;
}


function cambiofoto(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  foto.value = file;

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      fotoURL.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    fotoURL.value = '';
  }
}

async function publicaVinilo() {
  // Verificar si se ha cargado la imagen
  if (!foto.value) {
    alert('Debes seleccionar una imagen.');
    return;
  }

  // Cargar la imagen antes de continuar
  const fotoBuffer = await loadFileAsync(foto.value);
  if (!fotoBuffer) {
    alert('Error al cargar la imagen.');
    return;
  }

  const formData = new FormData();
  const data: FormDataFields = {
    id: id.value,
    titulo: titulo.value,
    contenido: contenido.value,
    estado: estado.value,
    tras: tras.value,
    tipo: tipo.value,
    precio: precio.value,
    estilo: estilo.value,
    lugar: lugar.value,
  };

  // Agregar cada campo del formulario al formData
  formData.append('id', id.value ? id.value.toString() : 'undefined');  //si existe valor lo pasamos a string 
  formData.append('titulo', data.titulo);
  formData.append('contenido', data.contenido);
  formData.append('estado', data.estado);
  formData.append('tras', data.tras);
  formData.append('tipo', data.tipo);
  formData.append('precio', data.precio.toString());
  formData.append('estilo', data.estilo);
  formData.append('lugar', data.lugar)

console.log(formData)
  // Agregar la imagen como un archivo Blob
  formData.append('foto', new Blob([fotoBuffer], { type: 'image/jpeg' }), 'foto.jpg');

  try {
    const response = await fetch('http://localhost:3000/an', {  //guardo el vinilo o actualizo
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (response.ok) {
      alert('Anuncio insertado');
          
          router.push('/listavinilo');
      alert('Anuncio insertado');
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.error(error);
    alert('Algo ha salido mal');
  }
}

async function loadFileAsync(file: File): Promise<Uint8Array | null> {//garantiamos la carga del archivo antes de ser llamado
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as ArrayBuffer | null;
      resolve(result ? new Uint8Array(result) : null);
    };
    reader.readAsArrayBuffer(file);
  });
}
</script>



<style>
.titulo {
    box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
    display: flex;
    padding-top: 2%;
    color: rgb(31, 32, 33);
    border-radius: 15px;
    background-color: rgba(217, 224, 6, 0.349);
    justify-content: center
    
  }
.formCreateContainer {
 
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;
 

}

.green{
 
  margin-left: 2%;

}

.submitBtn {
  
  margin-top: 5px;
  width: 20%;
  height: 35px;
  border-radius: 15px;
  background-color: rgba(217, 224, 6, 0.349);
 border-color: rgba(217, 224, 6, 0.349);
 margin-left: 2%;
 margin-top: 2%;
 margin-bottom: 3%;


 
}
.label-input {
  display: flex;
  justify-content: space-between;
  margin: 2% ; 
  align-items: center;
}
.preview-img{
  width: 30%;
  margin-top: 6%;
}




</style>
