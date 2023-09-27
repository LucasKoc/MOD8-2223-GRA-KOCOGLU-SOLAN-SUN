<template>
    <div class="overlay">
      <div class="login-box">
        <span class="close-button" @click="closeLoginOverlay">&times;</span>
        <h2>Login</h2>
        <form>
          <label for="username">Username:</label>
          <input type="text" id="username" name="username"><br><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password"><br><br>
          <button type="button">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      closeLoginOverlay() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styling for the login overlay */
  .overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
  }
  /* Add your other styles here */
  </style>
  