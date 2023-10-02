<script setup>
    import {ref} from 'vue';
    const reservationDate = ref('');
    const reservationHours = ref('');
    
    const submitForm = () => {
        // Handle reservation submission logic here
        console.log("Date:", reservationDate.value);
        console.log("Hours of Reservation:", reservationHours.value);
    };
</script>

<template>
    <div class="reservation-form">
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
.reservation-form {
max-width: 400px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
background-color: #f9f9f9;
}

h2 {
text-align: center;
}

.form-group {
margin-bottom: 15px;
}

label {
display: block;
font-weight: bold;
}

input[type="date"],
input[type="time"] {
width: 100%;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
}

button {
width: 100%;
padding: 10px;
background-color: #007BFF;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
font-size: 16px;
}

button:hover {
background-color: #0056b3;
}
</style>
