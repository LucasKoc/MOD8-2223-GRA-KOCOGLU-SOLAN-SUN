<script setup>
    import { ref } from 'vue';
    import Equipment from '../components/Equipment.vue';
    import EquipRes from '../components/EquipRes.vue';
    import equipmentData from '../services/equipment.js';

    const equipmentManage = ref(false);
    const equipment = equipmentData()
    
    const equipmentReservation = ref(equipment.getEquipments());
    console.log(equipmentReservation.value);

    function saveData(data){
        if (data){
            console.log(data);
            equipment.modifyEquipment(data);
        }
        equipmentManage.value = false;
    }
</script>

<template>
    <div class="reservation-view">
        <div class="flexdivtop">
            <h2>Multimedia</h2>
            <button class="reservebutton" @click="equipmentManage = true">Reserve</button>
        </div>
        <div class="flexdiv">
            <div>
                <h3>Equipment Reservations</h3>
                <div class="reservation">
                    <ul class="reservation-list">
                        <li v-for="equipment in equipmentReservation" :key="equipment.id">
                            <Equipment :equipment="equipment" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="backdrop" v-if="equipmentManage"></div>
    <EquipRes class="user-modal" v-if="equipmentManage" @sendData="(data) => saveData(data)" :equipmentData="equipment.getEquipments()"/>
</template>
  
<style scoped>
@import '../assets/css/views/EquipmentView.css';
</style>