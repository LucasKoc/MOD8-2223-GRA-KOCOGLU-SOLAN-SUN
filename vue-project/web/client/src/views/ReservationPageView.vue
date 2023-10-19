<script setup>
import { ref, onMounted } from 'vue'
import roomData from '../services/room'
import equipmentData from '../services/equipment'
import userData from '../services/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref()
const roomReservations = ref([])
const equipmentReservation = ref([])

const fetchData = async () => {
  try {
    user.value = await userData().getConnectedUser()
    if (!user.value || !user.value.id) {
      alert('You must be logged in to access this page')
      router.push({ name: 'home' })
    }
    roomReservations.value = await roomData().getReservationsByUserId(user.value.id)
    if (roomReservations.value.message !== undefined) {
      if (roomReservations.value.message === 'Reservation does not exist.') {
        roomReservations.value = []
      }
    }
    equipmentReservation.value = await equipmentData().getEquipmentReservationByUserId(user.value.id)
    equipmentReservation.value = equipmentReservation.value[0]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)

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
      <h2>Reservations for : {{ user?.name || "Loading…" }}</h2>
      <div class="flexdiv">
        <div>
          <div class="block-room">
            <h3 class="title">Room Reservations</h3>

            <div class="reservation-room">
              <ul v-if="roomReservations.length !== 0">
                <li v-for="roomReservation in roomReservations" :key="roomReservation.id" :class="isReservationInPast(roomReservation.date, roomReservation.time)">
                  <span>Room: {{ roomReservation.roomname }}</span>
                  <span>Date: {{ roomReservation.date.split("T")[0]}}</span>
                  <span>Hours: {{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getHours()).padStart(2, '0') }}:{{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getMinutes()).padStart(2, '0') }}:{{ String(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getSeconds()).padStart(2, '0') }} - {{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getHours()).padStart(2, '0') }}:{{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getMinutes()).padStart(2, '0') }}:{{ String(new Date(new Date(`${roomReservation.date.split('T')[0]}T${roomReservation.time}-04:00`).getTime() + 3600000).getSeconds()).padStart(2, '0') }}
                  <span v-if="isReservationInPast(roomReservation.date, roomReservation.time) === 'currentReservation'">(Running)</span>
                  </span>
                </li>
              </ul>
              <ul v-else>
                <li class="emptyReservation">
                  <span class="emptyReservation">No room reservation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div class="block-equipement">
            <h3 class="title">Equipment Reservation</h3>

            <div class="reservation-equipment">
              <p v-if="equipmentReservation">Equipment: {{ equipmentReservation.name }}</p>
              <p v-else>No equipment reservation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import '../assets/css/views/ReservationPageView.css';
</style>
