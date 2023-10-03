<script setup>
    import { ref } from 'vue';
    import RoomRes from '../components/RoomRes.vue';

    const roomManage = ref(false);
    const roomReservations = ref([
        { id: 1, room: 'Room 101', date: '2023-10-01', hours: '10:00 AM - 12:00 PM' },
        { id: 2, room: 'Room 202', date: '2023-10-03', hours: '02:00 PM - 04:00 PM' },
    ]);
    
    const equipmentReservation = ref('Equipment A');

    function saveData(data) {
        console.log("test")
        roomManage.value = false
    }
</script>

<template>
    <div class="reservation-view">
        <div class="flexdivtop">
            <h2>Multimedia</h2>
            <button class="reservebutton" @click="roomManage = true">Reserve</button>
        </div>
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
        </div>
    </div>
    <div class="backdrop" v-if="roomManage"></div>
    <RoomRes class="user-modal" v-if="roomManage" @sendData="(data) => saveData(data)"/>
</template>
  
<style scoped>
    .reservation-view {
        padding: 20px 0px;
        background-color: white;
        color: black;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .flexdiv {
        margin: 0% 5%;
    }

    .flexdivtop {
        display: flex;
        margin: 0% 5%;
        align-items: baseline;
        justify-content: space-around;
    }

    .reservation {
        padding: 1%;
        box-shadow: 0px 0px 1px 1px rgba(0,0,0,0.1);
    }

    .reservebutton {
        padding: 10px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    .reservebutton:hover {
        background-color: #0056b3;
    }
    
    h2 {
        margin: 2% 5%;
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

<style scoped>
@import '../assets/css/views/RoomView.css';
</style>