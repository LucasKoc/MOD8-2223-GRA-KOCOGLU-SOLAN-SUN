<script setup>
    import { ref } from 'vue';
    const roomReservations = ref([
        { id: 1, room: 'Room 101', date: '2023-10-01', hours: '10:00 AM - 12:00 PM' },
        { id: 2, room: 'Room 202', date: '2023-10-03', hours: '02:00 PM - 04:00 PM' },
    ]);
    
    const equipmentReservation = ref('Equipment A');
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
                            <span>Room: {{ roomReservation.room }}</span>
                            <span>Date: {{ roomReservation.date }}</span>
                            <span>Hours: {{ roomReservation.hours }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <h3>Equipment Reservation</h3>
                <div class="reservation">
                    
                    <p v-if="equipmentReservation">Equipment: {{ equipmentReservation }}</p>
                    <p v-else>No equipment reservation</p>
                </div>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
@import '../assets/css/views/ReservationView.css';
</style>