<script setup>
    import {ref} from 'vue';
    import Equipment from './Equipment.vue';
    const reservationHours = ref('');

    const props = defineProps({
        equipmentData: {
            type: Object,
            default: () => {}
        }
    });

    const equipment = props.equipmentData;

    console.log(equipment);

    const selectedEquipmentId = ref();
    const emits = defineEmits(['sendData']);

    const submitForm = () => {
        const reservation = {
            time: reservationHours.value,
            user: userfunc.getConnectedUser().id || 0
        };
        const equip = equipment.filter((e) => e.id === selectedEquipmentId.value)[0]
        equip.reservations = reservation;
        emits('sendData', equip);

    };

    function selectedEquipment(equipment){
        selectedEquipmentId.value = equipment.id;
    }
</script>

<template>
    <div class="equipment-reservation">
        <button class="close" @click="emits('sendData')">X</button>
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
@import "../assets/css/components/EquipmentRes.css";
</style>
  