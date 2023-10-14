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
const user = ref(userData().getConnectedUser())
const roomname = ref(room.roomname)
const roomReservations = ref([])

const fetchData = async () => {
  try {
    roomReservations.value = await roomData().getReservations(roomId);
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData);

function saveData(data) {
  if (data) {
    // TODO: Save data in Reservation table
    data.userid = user.value.id
    room.reservation.push(data)
  }
  roomManage.value = false
}

function openModal() {
  if (!user.value.id) {
    alert('You must be logged in order to make a reservation')
  } else {
    roomManage.value = true
  }
}
</script>

<template>
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
          <ul>
            <li v-for="roomReservation in roomReservations" :key="roomReservation.id">
              <span>Date: {{ roomReservation.date }}</span>
              <span>Hours: {{ roomReservation.time }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <div class="backdrop" v-if="roomManage"></div>
  <RoomReservation class="user-modal" v-if="roomManage" @sendData="(data) => saveData(data)" />
</template>

<style scoped>
@import '../assets/css/views/RoomItemPageView.css';
</style>
