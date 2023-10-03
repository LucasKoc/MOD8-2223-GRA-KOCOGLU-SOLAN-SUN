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
@import "../assets/css/components/Login.css";
</style>
  