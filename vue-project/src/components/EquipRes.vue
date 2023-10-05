<script setup>
    import {ref} from 'vue';
    import Equipment from './Equipment.vue';
    import userData from '../services/user';
    const reservationHours = ref('');

    const d = new Date();
    let currentTime = d.getHours();

    const props = defineProps({
        equipmentData: {
            type: Object,
            default: () => {}
        },
        equipmentSelected: {
          type: Object,
          default: () => {}
        }
    });

    const equipment = props.equipmentData;
    const userfunc = userData();
    
    const selectedEquipmentId = ref();
    const emits = defineEmits(['sendData']);

    const submitForm = () => {

        const selectedHour = reservationHours.value.split(':')[0];

        if (selectedHour < currentTime) {
            alert('Please select a time later than the current time.');
            return;
        }

        const reservation = {
            time: reservationHours.value,
            user: userfunc.getConnectedUser().id || 0
        };

        const equip = equipment.filter((e) => e.id === selectedEquipmentId.value)[0];
        equip.reservations = reservation;
        emits('sendData', equip);

    };

    function selectedEquipment(equipment){
        selectedEquipmentId.value = equipment.id;
    }

    try {
      selectedEquipment(props.equipmentSelected);
    } catch (error) {
    }
</script>

<template>
    <div class="equipment-reservation">
        <button class="close" @click="emits('sendData')">X</button>
        <h2>Equipment Reservation</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
            <label for="reservationHours">Reserve until</label>
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
  