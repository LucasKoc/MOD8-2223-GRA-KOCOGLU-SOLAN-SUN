<script setup>
    import {ref} from 'vue';
    import Equipment from './Equipment.vue';
    const reservationHours = ref('');
    const equipmentData = [
        { id: 1, name: 'Equipment 1' },
        { id: 2, name: 'Equipment 2' },
        { id: 3, name: 'Equipment 3' },
        // Add more equipment items as needed
    ];
    const selectedEquipmentId = ref();

    const submitForm = () => {
        // Handle equipment reservation submission logic here
        console.log("Hour of Reservation:", reservationHours.value);
        // You can also access the selected equipment items here if needed
    };

    function selectedEquipment(equipment){
        selectedEquipmentId.value = equipment.id;
    }
</script>

<template>
    <div class="equipment-reservation">
        <h2>Equipment Reservation</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
            <label for="reservationHours">Hour of Reservation</label>
            <input
                type="time"
                id="equipmentreservationHours"
                v-model="reservationHours"
                required
            />
            </div>
            <div class="form-group">
            <label for="equipmentList">Equipment List</label>
            <div class="equipment-list">
                <div class="equipment" v-for="equipment in equipmentData" :class="{'selected': selectedEquipmentId === equipment.id}">
                    <Equipment @click="selectedEquipment(equipment)"
                    :key="equipment.id"
                    :equipment="equipment"
                    />
                </div>
            </div>
            </div>
            <button type="submit">Reserve</button>
        </form>
    </div>
</template>
  
<style scoped>
    .equipment-reservation {
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
    
    input[type="time"] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
    .equipment-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }

    .selected{
        background-color: #007BFF;
        border: solid 1px blue;
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
  