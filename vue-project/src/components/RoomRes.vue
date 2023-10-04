<script setup>
    import {ref} from 'vue';
    const reservationDate = ref('');
    const reservationHours = ref('');

    const emits = defineEmits(['sendData']);
    
    const submitForm = () => {
        emits('sendData', {
            date: reservationDate.value,
            time: reservationHours.value
        });
    };
</script>

<template>
    <div class="reservation-form">
        <button class="close" @click="emits('sendData')">X</button>
        <h2>Reservation</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
            <label for="reservationDate">Date</label>
            <input
                type="date"
                id="reservationDate"
                v-model="reservationDate"
                required
            />
            </div>
            <div class="form-group">
            <label for="reservationHours">Hours of Reservation</label>
            <input
                type="time"
                id="roomreservationHours"
                v-model="reservationHours"
                required
            />
            </div>
            <button type="submit">Reserve</button>
        </form>
    </div>
</template>

<style scoped>
@import "../assets/css/components/RoomRes.css";
</style>
