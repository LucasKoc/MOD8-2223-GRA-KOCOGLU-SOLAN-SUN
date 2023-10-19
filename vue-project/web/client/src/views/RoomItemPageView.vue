<script setup>
import {onMounted, ref} from 'vue'
import RoomReservation from '../components/RoomReservation.vue'
import roomData  from '../services/room.js'
import { useRoute } from 'vue-router'
import userData from '../services/user.js'

const roomManage = ref(false)
const route = useRoute()
const roomId = route.params.id
const room = roomData().getRoom(roomId)
const user = ref()
const roomname = ref(room.roomname)
const roomReservations = ref([])
const username = ref({})

const fetchData = async () => {
  try {
    roomReservations.value = await roomData().getReservations(roomId);
    if (roomReservations.value.message !== undefined) {
      if (roomReservations.value.message === 'Room reservation does not exist or could not be find.') {
        roomReservations.value = []
      }
    }
    else {
      await fetchUsers();
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const fetchLogin = async () => {
  try {
    user.value = await userData().getConnectedUser()
  } catch (error) {
    console.log(error)
  }
}

const fetchUsers = async () => {
  try {
    for (const reservation of roomReservations.value) {
      const userId = reservation.userId;
      if (!username.value[userId]) {
        username.value[userId] = await userData().getUser(userId);
      }
    }
  } catch (error) {
    console.log(error)
  }
};


onMounted(fetchData)

async function saveData(data) {
  try {
    if (data) {
      data.userId = user.value.id
      await roomData().addReservation(roomId, data.date, data.time, data.userId)
    }
  } catch (error) {
    console.error('Error adding reservation:', error)
  }
  roomManage.value = false
  // window.location.reload()
}

async function openModal() {
  await fetchLogin();
  if (!user.value || !user.value.id) {
    alert('You must be logged in order to make a reservation')
  } else {
    roomManage.value = true
  }
}

function isReservationInPast(date, time) {
  const currentTime = new Date();
  const reservationDateWithTime = new Date(`${date.split('T')[0]}T${time}-04:00`);

  return reservationDateWithTime < currentTime;
}


</script>

<template>
  <main>
  <div class="reservation-view">
    <div class="flexdivtop">
      <h2>{{ roomname }}</h2>
    </div>
    <div class="flexdiv">
      <div>
        <div class="title">
          <h3>Room Reservations</h3>
          <button class="reservebutton" @click="openModal()">Reserve</button>
        </div>
        <div class="reservation">
          <ul v-if="roomReservations.length !== 0">
            <li v-for="roomReservation in roomReservations" :key="roomReservation.id" :class="{'pastReservation': isReservationInPast(roomReservation.date, roomReservation.time)}">
              <span>Date: {{ roomReservation.date.split("T")[0] }}</span>
              <span>Reserved by: {{ username[roomReservation.userId] ? (username[roomReservation.userId].name !== undefined ? username[roomReservation.userId].name : "N/A") : "N/A" }}</span>
              <span>Hours: {{ roomReservation.time }}</span>
            </li>
          </ul>
          <ul v-else>
            <li class="emptyReservation">
              <span class="emptyReservation">No reservations yet.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="roomManage"></div>
  <RoomReservation class="user-modal" v-if="roomManage" @sendData="(data) => saveData(data)" />
  </main>
</template>

<style scoped>
@import '../assets/css/views/RoomItemPageView.css';
</style>
