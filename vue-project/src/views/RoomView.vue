<script setup>
    import { ref } from 'vue';
    import RoomRes from '../components/RoomRes.vue';
    import roomData from '../services/room.js';
    import {useRoute} from 'vue-router';
    import userData from '../services/user.js';

    
    const roomManage = ref(false);
    const route = useRoute();
    const roomId = route.params.id;
    const room = roomData().getRoom(roomId);
    const roomReservations = ref(room.reservation);
    const user = ref(userData().getConnectedUser());
    const roomname = ref(room.roomname);

    function saveData(data) {
        if (data){
            data.userid = user.value.id;
            room.reservation.push(data);
        }
        roomManage.value = false;
    }

    function openModal() {
        if(!user.value.id) {
            alert('You must be logged in order to make a reservation')
        }else{
            roomManage.value = true;
        }
    }

</script>

<template>
    <div class="reservation-view">
        <div class="flexdivtop">
            <h2>{{roomname}}</h2>
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
    <RoomRes class="user-modal" v-if="roomManage" @sendData="(data) => saveData(data)"/>
</template>



<style scoped>
@import '../assets/css/views/RoomView.css';
</style>