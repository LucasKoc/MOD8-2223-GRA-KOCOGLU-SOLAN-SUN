<script setup>
    import {ref} from 'vue';
    const roomNumber = ref('');
    const key = ref('');
    const lastName = ref('');
    const emit = defineEmits(['exit']);
    
    const submitForm = () => {
        console.log("Room Number:", roomNumber.value);
        console.log("Key:", key.value);
        console.log("Last Name:", lastName.value);
        emit('exit');
    };
</script>

<template>
  
  <div class="login-form">
    <button class="close" @click="emit('exit')">X</button>
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
          <div class="form-group">
          <label for="roomNumber">Room Number</label>
          <input
              type="text"
              id="roomNumber"
              v-model="roomNumber"
              placeholder="Enter Room Number"
              required
          />
          </div>
          <div class="form-group">
          <label for="key">Key</label>
          <input
              type="password"
              id="key"
              v-model="key"
              placeholder="Enter Key"
              required
          />
          </div>
          <div class="form-group">
          <label for="lastName">Last Name</label>
          <input
              type="text"
              id="lastName"
              v-model="lastName"
              placeholder="Enter Last Name"
              required
          />
          </div>
          <button type="submit">Submit</button>
      </form>
  </div>
</template>
  
  <style scoped>
  .login-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 1px;
    right: 1px;
    padding: 0;
    background-color: #ccc;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .close:hover {
    background-color: red;
  }
  </style>
  