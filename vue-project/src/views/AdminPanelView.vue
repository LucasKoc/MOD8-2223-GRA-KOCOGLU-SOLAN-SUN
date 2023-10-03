<script setup>
import { ref } from 'vue';
import AdminComponent from '../components/AdminPanel.vue';
import UserManage from '../components/UserManage.vue';

const userManage =  ref(false);

const userInformation = ref([]);
userInformation.value.push({ id: 1, name: 'User A' , Room: '001'});
userInformation.value.push({ id: 2, name: 'User B' , Room: '002'});
userInformation.value.push({ id: 3, name: 'User C' , Room: '003'});
userInformation.value.push({ id: 4, name: 'User D' , Room: '004'});
userInformation.value.push({ id: 5, name: 'User E' , Room: '005'});
userInformation.value.push({ id: 6, name: 'User F' , Room: '006'});
userInformation.value.push({ id: 7, name: 'User G' , Room: '007'});
userInformation.value.push({ id: 8, name: 'User H' , Room: '008'});
userInformation.value.push({ id: 9, name: 'User I' , Room: '009'});
userInformation.value.push({ id: 10, name: 'User J' , Room: '010'});

function saveData(){
  userManage.value = false;
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
            <li v-for="admin in userInformation" :key="admin.id">
              <AdminComponent :admin="admin" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="userManage"></div>
  <UserManage class="user-modal" v-if="userManage" @getInfo="(data) => saveData(data)"/>
</template>

<style scoped>
@import '../assets/css/views/AdminPanelView.css';
</style>