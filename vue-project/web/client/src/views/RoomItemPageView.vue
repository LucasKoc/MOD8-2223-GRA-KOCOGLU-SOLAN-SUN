<script setup>
import {onMounted, ref} from 'vue'
import RoomReservation from '../components/RoomReservation.vue'
import roomData  from '../services/room.js'
import { useRoute } from 'vue-router'
import userData from '../services/user.js'

const roomManage = ref(false)
const route = useRoute()
const roomId = route.params.id
const room = ref([])
const user = ref()
const roomname = ref(null)
const roomReservations = ref([])
const username = ref({})

const fetchData = async () => {
  try {
    roomReservations.value = await roomData().getReservations(roomId);
    room.value = await roomData().getRoom(roomId);
    roomname.value = room.value.roomname;
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
      if (await isRoomAvailableAtSpecificHour(roomReservations, data.date, data.time)) {
        data.userId = user.value.id
        await roomData().addReservation(roomId, data.date, data.time, data.userId)
      } else {
        alert('Room is not available at this time.')
      }
    }
  } catch (error) {
    console.error('Error adding reservation:', error)
  }
  roomManage.value = false
  // window.location.reload()
}

async function isRoomAvailableAtSpecificHour(roomReservations, specificDate, specificTime) {
  const targetTimestamp = new Date(specificDate + 'T' + specificTime + 'Z');

  console.log(roomReservations.value)

  if (roomReservations.value === undefined || roomReservations.value.length === 0 || roomReservations.value.message === "Room reservation does not exist or could not be find.") return true;

  const startOfRange = targetTimestamp.getTime();
  const endOfRange = targetTimestamp.getTime() + (1 * 60 * 60 * 1000);

  const reservationsInRange = roomReservations.value.filter(reservation => {
    const reservationTimeStartRange = new Date(reservation.date.split('T')[0] + 'T' + reservation.time + 'Z').getTime();
    const reservationTimeEndRange = new Date(reservation.date.split('T')[0] + 'T' + reservation.time + 'Z').getTime() + (1 * 60 * 60 * 1000);
    return (reservationTimeStartRange >= startOfRange && reservationTimeStartRange <= endOfRange) || (reservationTimeEndRange >= startOfRange && reservationTimeEndRange <= endOfRange)
  });

  return reservationsInRange.length <= 0;
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
  const reservationEndTime = new Date(reservationDateWithTime.getTime() + (60 * 60 * 1000));

  if (reservationDateWithTime < currentTime && reservationEndTime > currentTime) {
    return "currentReservation";
  } else if (reservationDateWithTime < currentTime) {
    return "pastReservation";
  }
  return "";
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
            <li v-for="roomReservation in roomReservations" :key="roomReservation.id" :class="isReservationInPast(roomReservation.date, roomReservation.time)">
              <span>Date: {{ roomReservation.date.split("T")[0] }}</span>
              <span>Reserved by: {{ username[roomReservation.userId] ? (username[roomReservation.userId].name !== undefined ? username[roomReservation.userId].name : "N/A") : "N/A" }}</span>
              <span>Hours: {{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getHours()).padStart(2, '0') }}:{{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getMinutes()).padStart(2, '0') }}:{{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getSeconds()).padStart(2, '0') }} - {{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getHours()).padStart(2, '0') }}:{{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getMinutes()).padStart(2, '0') }}:{{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getSeconds()).padStart(2, '0') }}
                  <span v-if="isReservationInPast(roomReservation.date, roomReservation.time) === 'currentReservation'">(Running)</span>
                  </span>
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
