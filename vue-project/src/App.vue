<script setup>
  import { ref, watch } from 'vue';
  import { RouterLink, RouterView } from 'vue-router';
  import Login from './components/Login.vue';
  import userData from './services/user';

  const isUserModalOpen = ref(false);
  const user = ref(userData().getConnectedUser());
  const loginval = ref("Login");
  console.log();

  function exit(s){
    if (s){
      loginval.value = "Log out";
    }
    isUserModalOpen.value = false;
  }
</script>

<template>
  <header>
    <div class="wrapper">
      <RouterLink to="/">
        <img alt="Vue logo" class="logo" src="@/assets/pictures/LogoMOD8.png" width="164" />
      </RouterLink>

      <ul class="menuclick">
        <li>
          <RouterLink class="redirect" to="/">Home</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/rooms">Rooms status</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/equipments">Equipment status</RouterLink>
        </li>
        <li>
          <RouterLink class="redirect" to="/reservation">See Reservation</RouterLink>
        </li>
      </ul>
    </div>

    <div class="wrapper">
      <ul class="login-button">
        <li>
          <!-- v-if temp because ultra not secure : v-if="user.value ? (user.value.role === 'admin') : false" -->
          <RouterLink class="redirect" to="/panel">adminPanel</RouterLink>
        </li>
        <li>
          <div class="redirect login" @click="loginval === 'Login' ? isUserModalOpen = true : null ;">{{loginval}}</div>
        </li>
      </ul>
    </div>

  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>
      &copy; OVE - Vieux Montreal - Since 2023 | <RouterLink to="/about">Learn more about OVE</RouterLink>
    </p>
  </footer>

  <!-- Backdrop for the modal -->
  <div class="backdrop" v-if="isUserModalOpen"></div>

  <Login class="user-modal" @exit="(s) => exit(s)" v-if="isUserModalOpen"/>
</template>
