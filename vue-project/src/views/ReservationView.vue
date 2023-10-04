<script setup>
    import { ref } from 'vue';
    import roomData from '../services/room';
    import equipmentData from '../services/equipment';
    import userData from '../services/user';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const user = ref(userData().getConnectedUser());
    const room = ref(roomData().getRooms());
    const equip = ref(equipmentData().getEquipments());

    if (!user.value.id) {
        alert('You must be logged in to access this page')
        router.push({ name: 'home' });
    }

    function getRoombyUserId(){
        let roombyid = []
        for (let i = 0; i < room.value.length; i++){
            for (let j =0; j < room.value[i].reservation.length; j++){
                if (room.value[i].reservation[j].userid === user.value.id){
                    let data = room.value[i].reservation[j]
                    data.roomname = room.value[i].roomname
                    console.log(data)
                    roombyid.push(data)
                }
            }
        }
        return roombyid
    }

    const roomReservations = ref(getRoombyUserId());

    const equipmentReservation = ref(equip.value.filter((e) => e.reservation && e.reservation.id === user.value.id)[0]);
</script>

<template>
    <div class="reservation-view">
        <h2>My Reservations</h2>
        <div class="flexdiv">
            <div>
                <h3>Room Reservations</h3>
                <div class="reservation">
                    <ul>
                        <li v-for="roomReservation in roomReservations" :key="roomReservation.id">
                            <span>Room: {{ roomReservation.roomname }}</span>
                            <span>Date: {{ roomReservation.date }}</span>
                            <span>Hours: {{ roomReservation.time }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h3>Equipment Reservation</h3>
                <div class="reservation">
                    
                    <p v-if="equipmentReservation">Equipment: {{ equipmentReservation.name }}</p>
                    <p v-else>No equipment reservation</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
@import '../assets/css/views/ReservationView.css';
</style>