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
    .reservation-view {
        height: 90%;
        padding: 20px 0px;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .flexdiv {
        display: flex;
        justify-content: space-around;
        align-items: baseline;
    }

    .reservation {
        padding: 1%;
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
    }
    
    h2 {
        text-align: center;
        margin-bottom: 20px;
    }
    
    h3 {
        margin-top: 10px;
    }
    
    ul {
        list-style: none;
        padding: 0;
    }
    
    li {
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
    }
    
    p {
        background-color: #fff;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        text-align: center;
    }
    
    p.v-if {
        background-color: #007BFF;
        color: white;
    }
</style>