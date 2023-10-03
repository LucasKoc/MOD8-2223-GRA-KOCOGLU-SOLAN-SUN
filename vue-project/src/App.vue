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
      <img alt="Vue logo" class="logo" src="@/assets/pictures/logo.svg" width="50" height="50" />
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

<style scoped>
header {
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}

main {
  width: 100%;
  margin-top: 80px;
  margin-bottom: 50px;
}

.logo {
  display: block;
  margin: 0 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.menuclick {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

.menuclick li {
  margin-right: 10px;
}

.menuclick li:last-child {
  margin-right: 0; /* Remove margin from the last item to prevent extra space */
}

.redirect {
  text-decoration: none;
  padding: 10px;
  border: 1px solid black;
  color: black;
  transition: color 0.2s, background-color 0.2s;
  background-color: white;
}

.redirect:hover {
  color: red;
  background-color: black;
}

.login {
  border-radius: 100px;
}
</style>

<style scoped>
  footer{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: black;
    color: white;
    text-align: center;
    padding: 10px;
    box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.1);
  }
</style>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000; 
  }

  .user-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001
  }
</style>
