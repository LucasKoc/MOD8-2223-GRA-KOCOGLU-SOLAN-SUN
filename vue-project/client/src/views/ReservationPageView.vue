<script setup>
import { ref, onMounted } from 'vue'
import roomData from '../services/room'
import equipmentData from '../services/equipment'
import userData from '../services/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref()
const room = ref()
const equip = ref()
const roomReservations = ref()
const equipmentReservation = ref()

async function getRoombyUserId() {
  let roombyid = []
  console.log(room.value)
  for (let i = 0; i < room.value.length; i++) {
    const reservation = roomData().getReservations(room.value[i].id)
    for (let j = 0; j < reservation.length; j++) {
      if (room.value[i].reservation[j].userid === user.value.id) {
        let data = room.value[i].reservation[j]
        data.roomname = room.value[i].roomname
        roombyid.push(data)
      }
    }
  }
  return roombyid
}


const fetchData = async () => {
  try {
    user.value = await userData().getConnectedUser()
    if (!user.value.id) {
      alert('You must be logged in to access this page')
      router.push({ name: 'home' })
    }
    room.value = await roomData().getRooms()
    equip.value = await equipmentData().getEquipments()
    roomReservations.value = await getRoombyUserId()
    equipmentReservation.value = equip.value.filter((e) => e.reservation && e.reservation.id === user.value.id)[0]
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

onMounted(fetchData)


</script>

<template>
  <main>
    <div class="reservation-view">
      <h2>My Reservations</h2>
      <div class="flexdiv">
        <div>
          <div class="block-room">
            <h3 class="title">Room Reservations</h3>

            <div class="reservation-room">
              <ul>
                <li v-for="roomReservation in roomReservations" :key="roomReservation.id">
                  <span>Room: {{ roomReservation.roomname }}</span>
                  <span>Date: {{ roomReservation.date }}</span>
                  <span>Hours: {{ roomReservation.time }}</span>
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
