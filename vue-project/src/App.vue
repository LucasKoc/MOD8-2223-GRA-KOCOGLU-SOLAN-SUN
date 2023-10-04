<script setup>
  import { ref, watch } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import Login from './components/Login.vue';
  import userData from './services/user';

  const isUserModalOpen = ref(false);
  const user = ref(userData().getConnectedUser());
  const loginval = ref("Login");

  function exit(s){
    if (s){
      loginval.value = "Logged";
    }
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
          <RouterLink class="redirect" to="/rooms/1">Room(debug)</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/equipments">Equipment(debug)</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/panel">adminPanel</RouterLink>
        </li>
        <li>
          <div class="redirect login" @click="isUserModalOpen=true">{{loginval}}</div>
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

  <Login class="user-modal" @exit="(s) => exit(s)" v-if="isUserModalOpen"/>
</template>
