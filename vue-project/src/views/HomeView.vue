<script setup>
  import Login from '@/components/Login.vue'
  import RoomRes from '../components/RoomRes.vue';
  import EquipRes from '../components/EquipRes.vue';
  import UserManage from '../components/UserManage.vue';
</script>

<template>
  <main>
    <article>
      <h1>Reservation</h1>
      <p>Reservation is a Vue.js application that allows users to make reservations for a restaurant.</p>
      <p>It is built with Vue.js, Vue Router, and Tailwind CSS.</p>
    </article>

    <article>
      <h2>Features</h2>
      <ul>
        <li>Users can make reservations for a restaurant.</li>
        <li>Users can view their reservations.</li>
        <li>Users can delete their reservations.</li>
      </ul>
    </article>

    <EquipRes />
    <Login />
    <RoomRes />
    <UserManage />
    
    
  </main>
</template>

<style scoped>
  main {
    align-items: center;
    max-width: 100%;
    align-content: center;
    width: 100%;
    margin: 0px;
    margin-top: 80px;
  }

  

  article{
    margin: 5%;
    padding: 20px;
    width: 90%;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  }
</style>
