<script setup>
import { ref } from 'vue';
import AdminComponent from '../components/AdminPanel.vue';
import UserManage from '../components/UserManage.vue';
import userData from '../services/user.js';

const userManage =  ref(false);

const userInformation = ref(userData().getUsers());
const singleUser = ref({});

function modifyUser(user){
  singleUser.value = user;
  userManage.value = true;
}

function saveData(data){
  if (data){
    userData().modifyUser(data.id, data);
  }
  userManage.value = false;
  singleUser.value = {};
}

</script>

<template>
  <div class="admin-view">
    <div class="div-adduser">
      <button class="add" @click="userManage = true">Add User</button>
    </div>
    <div class="flexdivtop">
      <h2>Admin Panel</h2>
  </div>
    <div class="flexdiv">
      <div>
        <h3>Room reservation</h3>
        <div class="reservation">
          <ul class="reservation-list">
            <li v-for="user in userInformation" @click="modifyUser(user)">
              <AdminComponent :user="user" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="userManage"></div>
  <UserManage class="user-modal" v-if="userManage" @getInfo="(data) => saveData(data)" :existsData="singleUser"/>
</template>

<style scoped>

.reservation-list{
  margin-top: 10px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.flexdiv {
  margin: 0% 5%;
}

.flexdivtop {
  display: flex;
  margin: 0% 5%;
  align-items: baseline;
  justify-content: space-around;
}

.reservation {
  padding: 1%;
  box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
}


h2 {
  margin: 2% 5%;
}

h3 {
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}
.div-adduser {
  display: flex;
  justify-content: flex-end;
  margin: 0% 5%;
}
.add{
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
.add:hover {
  background-color: #0056b3;
}

h2 {
  margin: 2% 5%;
}

h3 {
  margin-top: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

p {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

li:hover {
  border-color: #007BFF;
}

</style>

<style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
    z-index: 1000; /* Ensure it appears above other content */
  }

  /* Center the modal */
  .user-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001
  }
</style>