<script>
import LoginOverlay from './components/LoginOverlay.vue';

export default {
  data() {
    return {
      showLoginOverlay: false,
    };
  },
  components: {
    LoginOverlay,
  },
  methods: {
    openLoginOverlay() {
      this.showLoginOverlay = true;
    },
    closeLoginOverlay() {
      this.showLoginOverlay = false;
    },
  },
};
</script>

<template>
  <div id="app">
    <div class="container">
      <!-- Fancy homepage content -->
      <h1>Welcome to Our Website</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit....</p>
      <button @click="openLoginOverlay">Login</button>
    </div>

    <!-- Login overlay -->
    <LoginOverlay v-if="showLoginOverlay" @close="closeLoginOverlay" />
  </div>
</template>

<style>

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
