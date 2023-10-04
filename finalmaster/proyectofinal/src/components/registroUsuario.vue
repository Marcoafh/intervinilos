<script setup lang="ts">

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import avatar1 from '@/assets/photos/avatar1.png';
import conejo from '@/assets/photos/conejo.png';
import avatar4 from '@/assets/photos/avatar4.png';
import pngegg from '@/assets/photos/pngegg.png';
import avatar7 from '@/assets/photos/avatar7.png';
import fantasma from '@/assets/photos/fantasma.png';
import lobo from '@/assets/photos/lobo.png';
import manga from '@/assets/photos/manga.png';
import homer from '@/assets/photos/homer.png';
import music from '@/assets/photos/music.png';
import oso from '@/assets/photos/oso.png';
import dj from '@/assets/photos/dj.png';




    let router = useRouter()
  
interface Photo {
  name: string;
  url: string;
}
let photos: Photo[] = [
      { name: 'avatar1', url: avatar1 },
      { name: 'pngegg', url: pngegg},
      { name: 'avatar7', url: avatar7},
      { name: 'conejo', url: conejo },
      { name: 'avatar4', url: avatar4},
      { name: 'fantasma', url: fantasma},
      { name: 'lobo', url: lobo },
      { name: 'manga', url: manga},
      { name: 'homer', url: homer},
      { name: 'music', url: music},
      { name: 'oso', url: oso},
      { name: 'dj', url: dj},
     
    
    
 
  ]
let nombreError = ref('');
let contrasenaError = ref('');
let emailError = ref('');
let apellidoError = ref('');
let telefonoError = ref('');
let errorMessage = ref('');


  function validacionUsuario() {

 contrasenaError.value = '';
 nombreError.value = '';
 emailError.value = '';
 apellidoError.value = '';
 telefonoError.value ='';
 errorMessage.value ='';
 

    //validamos toos los campos en el front
     

 if (passRef.value !== confirmPassRef.value) {
  contrasenaError.value = 'Las contraseñas no coinciden';
}

if (nombreRef.value.length < 2 || nombreRef.value.length > 20) {
  nombreError.value = 'Debe tener entre 2 y 20 caracteres';
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailPattern.test(emailRef.value)) {
  emailError.value = 'El email no es válido';
}

if (apellidosRef.value.length < 2 || apellidosRef.value.length > 15) {
  apellidoError.value = 'El apellido no es correcto';
}

if (!/^\d{7,15}$/.test(telefonoRef.value)) {
  telefonoError.value = 'El teléfono no es correcto';
}




      
  if(!nombreError.value && !contrasenaError.value && !emailError.value && !apellidoError.value && !telefonoError.value){
        
    fetch('http://localhost:3000/user', {
        method: "POST",
        body: JSON.stringify({

            email: emailRef.value,
            pass: passRef.value,
            telefono: telefonoRef.value,
            nombre: nombreRef.value,
            apellidos: apellidosRef.value,
            abatar: selectedAvatar.value
           

        }),
        headers: {
             "Content-Type": "application/json"
                },
                
    })
      .then(async (response) => {
        if (response.ok) {
         
          router.push('/login');
        } else {
          
          const respuestaerror = await response.json();  //paso los datos a jondson
          errorMessage.value = respuestaerror.message ; //aqui le damos el valor del mensaje
        }
      })
      .catch((e) => {  // la e captura cualquier error del try y lo captura lo muestra en consola y de otra forma
        console.error(e);
        errorMessage.value = 'algo a ido mal intentalo otra vez';
      });
 
}
    
    

  
}
  
    let emailRef = ref("")
    let passRef = ref("")
    let confirmPassRef = ref("")
    let telefonoRef = ref("")  
    let nombreRef = ref("")
    let apellidosRef = ref("")
    let selectedAvatar =ref("")

  
  
 
 

   
</script>

<template>
    
  
  <div class="registerForm">   
    <h1 class="green">REGISTRO DE USUARIO</h1>
    <form @submit.prevent="validacionUsuario">

        <label class="green" for="emailInput">Email:</label>
        <input type="text" id="emailInput" v-model="emailRef" required :class="{ 'error': emailError }">
        <span v-if="emailError" class="error-message">{{ emailError }}</span>

        <label class="green" for="passInput">Pass:</label>
        <input type="password" id="passInput" v-model="passRef">

        <label class="green" for="nueva">Repeat pass:</label>
        <input type="password" id="nueva" v-model="confirmPassRef" required :class="{ 'error': contrasenaError }">
        <span v-if="contrasenaError" class="error-message">{{ contrasenaError }}</span>

        

        <label class="green" for="edadInput">telefono:</label>
        <input type="tel" id="telefonoInput" v-model="telefonoRef" required :class="{ 'error': telefonoError }">
        <span v-if="telefonoError" class="error-message">{{ telefonoError }}</span>

        
       

        <div class="green">
          <div class="form-group">
        <label for="avatar">Avatar:</label>
      <div>
          <label v-for="(photo, index) in photos" :key="index">
            <input type="radio" v-model="selectedAvatar" :value="photo.url" required>
            <img class="tamañoavatar" :src="photo.url" :alt="photo.name">
          </label>
        </div>
        </div>

        
    </div>

    
        <label class="green" for="nombreInput">Nombre:</label>
        <input type="text" id="nombreInput" v-model="nombreRef" required :class="{ 'error': nombreError }">
        <span v-if="nombreError" class="error-message">{{ nombreError }}</span>
     

        
    

        <label class="green" for="apellidosInput">apellidos:</label>
        <input type="text" id="apellidosInput" v-model="apellidosRef" required :class="{ 'error': apellidoError }">
        <span v-if="apellidoError" class="error-message">{{ apellidoError }}</span>

        <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>

        <button class="green" type="submit">Enviar</button>
    </form>
  </div>
</template>













<style>

.registerForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.registerForm form {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.registerForm form input{
    height: 35px;
    border-radius: 5%;
    
}

.registerForm form button{
  background-color: #b53620; 
    color: white;
    width: 15%;
   margin-top: 3%;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1rem;
    margin-bottom: 2%;

}
.registerForm form button:hover {
  background-color: #f04309; 
}
.avatar-options {
  display: flex;
  justify-content: center;
}
.avatar-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.form-group {
  margin-bottom: 0px;
}
.tamañoavatar{
  
  width:20%;
 
}
.error-message {
  color: red;
  font-size: small;
}

</style>