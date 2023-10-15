<script setup>
import { ref, onMounted } from 'vue'
import AdminComponent from '../components/AdminPanel.vue'
import UserManage from '../components/UserManage.vue'
import userData from '../services/user.js'
import { useRouter } from 'vue-router'

const userManage = ref(false)

const userInformation = ref()
const singleUser = ref()
const blankUser = ref({
  name: '',
  key: '',
  room: '',
})
const router = useRouter()

const fetchData = async () => {
  try {
    singleUser.value = await userData().getConnectedUser()
    userInformation.value = await userData().getUsers()
    if (!(singleUser.value.role == 'admin')) {
      alert('You must be an administrator to access this page')
      router.push('/')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)

function modifyUser(user) {
  blankUser.value = user
  userManage.value = true
}

function addUser() {
  userManage.value = true
}

function deleteUser(id) {
  userData().deleteUser(id)
}

function saveData(data) {
  if (data) {
    if (data.id) userData().modifyUser(data.id, data)
    else userData().addUser(data)
  }
  userManage.value = false
  blankUser.value = {
    name: '',
    key: '',
    room: '',
  }
}
</script>

<template>
  <div class="admin-view">
    <div class="flexdivtop">
      <h2>Admin Panel</h2>
    </div>
    <div class="flexdiv">
      <div>
        <div class="title-res">
          <h3>Users List</h3>
          <button class="add" @click="addUser(user)">Add User</button>
        </div>
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
  <UserManage
    class="user-modal"
    v-if="userManage"
    @getInfo="(data) => saveData(data)"
    @delete-user="(id) => deleteUser(id)"
    :existsData="blankUser"
  />
</template>

<style scoped>
@import '../assets/css/views/AdminPanelView.css';
</style>
