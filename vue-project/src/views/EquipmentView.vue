<script setup>
    import { ref } from 'vue';
    import Equipment from '../components/Equipment.vue';
    import EquipRes from '../components/EquipRes.vue';

    const equipmentManage = ref(false);
    
    const equipmentReservation = ref([]);
    equipmentReservation.value.push({ id: 1, name: 'Equipment A' });
    equipmentReservation.value.push({ id: 2, name: 'Equipment B' });
    equipmentReservation.value.push({ id: 3, name: 'Equipment C' });
    equipmentReservation.value.push({ id: 4, name: 'Equipment D' });

    function saveData(){
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
    <EquipRes class="user-modal" v-if="equipmentManage" @sendData="(data) => saveData(data)"/>
</template>
  
<style scoped>
@import '../assets/css/views/EquipmentView.css';
</style>