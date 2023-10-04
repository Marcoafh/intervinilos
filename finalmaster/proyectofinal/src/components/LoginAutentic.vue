<template>
  <div class="formulario">
    <div class="separacion"><h1>Inicio sesión</h1></div>
    <form @submit.prevent="loginautentic">
      <div class="input">
        <label class="label-grande" for="username">Email:</label>
        <br>
        <input type="text" id="username" v-model="email" required>
      </div>

      <div class="input">
        <label class="label-grande" for="password">Contraseña:</label>
        <br>
        <input type="password" id="password" v-model="password" required>
      </div>

      <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
      <button class="bo" type="submit">Enviar</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import router from '@/router';

const email = ref("");
const password = ref("");
const errorMessage = ref("");

async function loginautentic() {
  errorMessage.value = "";
  console.log("Email:", email.value);
  console.log("Password:", password.value);

  try {
    const response = await fetch('http://localhost:3000/sign', {//llamada
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        pass: password.value,
      }),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
    });

    if (response.ok) {
      setTimeout(() => {
        router.push('/misvinilos');
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      const responseData = await response.json();
      if (responseData.message) {
        errorMessage.value = 'Correo o contraseña incorrectos';
      }
    }
  } catch (error) {
    errorMessage.value = 'Error de contacto con el servidor';
  }
}
</script>

<style>
.formulario {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(217, 224, 6, 0.349);
  border-radius: 15px;
  padding-top: 5%;
  padding-bottom: 5%;
  width: 50%;
  margin-left: 25%;
  box-shadow: 1px 1px olive, -0.3em 0 0.4em olive;
  margin-top: 5.6rem; 

}
.separacion{
  margin-bottom: 3%;
}

.input {
  margin-bottom: 10px;
  
  display: block; 
}

.bo {
  background-color: #b53620;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin-bottom: 2%;
  cursor: pointer;

}

.bo:hover {
  background-color: #ff5733; 
}
.label-grande {
  font-size: 16px; 

 
}
  


@media (max-width: 420px) {



.formulario{
  width: 90%;
  margin-left: 5%;
}





}
</style>




