<script setup lang="ts">
import { RouterLink, RouterView} from 'vue-router'
import { getUserData } from './components/setCookie.vue';



let userData: any = undefined;
userData = getUserData();

const abatar = userData ? userData.abatar : null;
</script>

<template>
  <header>
   
    <img class="logo" src="@\components\logo\logovinilo.png" alt="Logo Vinilo">

    <div class="wrapper">
      <nav>
        <RouterLink class="letras" to="/">Buscar</RouterLink>
       
        <RouterLink  class="letras" v-if="!userData" to="/registro">Registro</RouterLink>
        <RouterLink class="letras" v-if="userData" to="/vinilos/registro">poner anuncio</RouterLink>
     
        <RouterLink class="letras" v-if="!userData" to="/login">Iniciar seccion</RouterLink>
        <RouterLink class="letras" v-if="userData" to="/misvinilos">Mis vinilos</RouterLink>
        <RouterLink class="letras" v-if="userData" to="/mismensajes">Mensajes</RouterLink>

         
        
        

        
        
        <a class="letras" v-if="userData"> {{ userData['email'] }}</a>
        <img class="abatar" v-if="userData" :src="abatar" alt="Avatar">

      </nav>
     
      
    
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}


nav a.router-link-exact-active:hover {
  background-color: rgba(217, 224, 6, 0.349);
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}


@media (min-width: 1024px) {


  .logo {
    margin: 0 2rem 0 0;
  }
  .abatar{
    width: 10%;
  }

  header .wrapper {
    display: flex;
    flex-direction: column;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;


    padding: 1rem 0;
    margin-top: 1rem;
  }
  .letras{
    color: brown;

  }

 
}

@media (min-width: 320px) {
 
  .logo {
    display: flex;
    align-items: center;
    justify-content: center; 
    margin-left: 0%;
  }
  .abatar{
    width: 10%;
  }
  

  header .wrapper {
    display: flex;
    flex-direction: column;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
   margin-left: 8%;
    padding: 1rem 0;
    margin-top: 1rem;
   
  }
}
</style>
