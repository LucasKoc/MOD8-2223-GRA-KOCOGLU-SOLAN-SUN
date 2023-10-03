<script setup>
  import { ref } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import Login from './components/Login.vue';

  const isUserModalOpen = ref(false);

  function exit(){
    isUserModalOpen.value = false;
  }
</script>

<template>
  <header>
    <RouterLink to="/">
      <img alt="Vue logo" class="logo" src="@/assets/pictures/LogoMOD8.png" width="164" />

    </RouterLink>
    <div class="wrapper">

      <ul class="menuclick">
        <li>
          <RouterLink class="redirect" to="/rooms">Rooms status</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/reservation">See Reservation</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/rooms/5">Room(debug)</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/equipments/5">Equipment(debug)</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/panel">adminPanel</RouterLink>
        </li>
        <li>
          <div class="redirect login" @click="isUserModalOpen=true">Login</div>
        </li>
      </ul>

    </div>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>
      <RouterLink to="/about">About</RouterLink>
    </p>
  </footer>

  <!-- Backdrop for the modal -->
  <div class="backdrop" v-if="isUserModalOpen"></div>


  <Login class="user-modal" @exit="exit()" v-if="isUserModalOpen"/>
</template>