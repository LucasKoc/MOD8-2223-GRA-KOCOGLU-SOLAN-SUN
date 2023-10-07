<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Login from './components/Login.vue'
import userData from './services/user'

const isUserModalOpen = ref(false)
const user = ref(userData().getConnectedUser())
const loginval = ref('Login')
const router = useRouter()

if (user.value) {
  loginval.value = 'Log out'
}

function exit(s) {
  if (s) {
    loginval.value = 'Log out'
    user.value = userData().getConnectedUser()
  }
  isUserModalOpen.value = false
}

function navbarButton() {
  let x = document.getElementById('header-router')
  console.log(x.classList)
  if (x.classList.value === 'router-list') {
    x.classList.add('displayed');
  } else {
    x.classList.remove('displayed');
  }
}
</script>

<template>
  <header>
    <div id="header">
      <div class="wrapper">
        <RouterLink to="/">
          <img alt="Vue logo" class="logo" src="@/assets/pictures/LogoMOD8.png" width="164" />
        </RouterLink>

        <ul class="menuclick header-router">
          <li>
            <RouterLink class="redirect" to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink class="redirect" to="/rooms">Rooms List</RouterLink>
          </li>
          <li>
            <RouterLink class="redirect" to="/equipments">Equipment List</RouterLink>
          </li>
          <li>
            <RouterLink class="redirect" v-if="user" to="/reservation">See Reservation</RouterLink>
          </li>
        </ul>
      </div>

      <div class="wrapper header-router">
        <ul class="login-button">
          <li>
            <RouterLink class="redirect" v-if="user && user.role == 'admin'" to="/panel"
            >adminPanel</RouterLink
            >
          </li>
          <li>
            <div
                class="redirect login"
                @click="
              loginval === 'Login' ? (isUserModalOpen = true) : (user = false),
                userData().resetConnectedUser(),
                (loginval = 'Login'),
                router.push('/')
            "
            >
              {{ loginval }}
            </div>
          </li>
        </ul>
      </div>

      <a href="javascript:void(0);" class="icon" @click="navbarButton()">
        <i class="fa fa-bars"></i>
      </a>
    </div>

    <nav class="router-list" id="header-router">
      <RouterLink class="redirect" to="/">Home</RouterLink>
      <RouterLink class="redirect" to="/rooms">Rooms List</RouterLink>
      <RouterLink class="redirect" to="/equipments">Equipment List</RouterLink>
      <RouterLink class="redirect" v-if="user" to="/reservation">See Reservation</RouterLink>
      <RouterLink class="redirect" v-if="user && user.role == 'admin'" to="/panel"
      >adminPanel</RouterLink
      >
      <div
          class="redirect login"
          @click="
          loginval === 'Login' ? (isUserModalOpen = true) : (user = false),
            userData().resetConnectedUser(),
            (loginval = 'Login'),
            router.push('/')
        "
      >
        {{ loginval }}
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>

  <footer>
    <p>
      &copy; OVE - Vieux Montreal - Since 2023 |
      <RouterLink to="/about">Learn more about OVE</RouterLink>
    </p>
  </footer>

  <!-- Backdrop for the modal -->
  <div class="backdrop" v-if="isUserModalOpen"></div>

  <Login class="user-modal" @exit="(s) => exit(s)" v-if="isUserModalOpen" />
</template>
