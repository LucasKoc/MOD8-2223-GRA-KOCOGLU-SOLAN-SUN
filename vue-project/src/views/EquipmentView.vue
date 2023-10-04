<template>
  <main id="equipments-status-main">
    <div class="reservation-view">
      <div class="flexdivtop">
        <button class="reservebutton" @click="equipmentManage = true">Reserve</button>
      </div>
    </div>

    <div id="equipment-status-div">
      <div v-for="(equipments, type) in typeOfEquipment" :key="type" class="equipment-row-container">
        <h2 class="equipmentTypeTitle">{{ type && type.length > 0 ? (type[0].toUpperCase() + type.slice(1)) : "N/A"}} Equipment:</h2>
        <div class="equipment-box-container">
          <div v-for="equipment in equipments" :key="equipment.id">
            <Equipment :equipment="equipment"/>
          </div>
        </div>
      </div>
    </div>

    <div class="backdrop" v-if="equipmentManage"></div>
    <EquipRes class="user-modal" v-if="equipmentManage" @sendData="(data) => saveData(data)" :equipmentData="equipmentReservation"/>
  </main>
</template>

<script setup>
import {computed, ref} from 'vue';
import Equipment from '../components/Equipment.vue';
import EquipRes from '../components/EquipRes.vue';
import equipmentData from '../services/equipment.js';
// import { useRoute } from 'vue-router';

// const route = useRoute();
// const equipmentCategory = route.params.id;
const equipmentManage = ref(false);
const equipment = equipmentData()

// const equipmentReservation = ref(equipment.getEquipmentsByCategory(equipmentCategory));

const equipmentReservation = ref(equipment.getEquipments())

const typeOfEquipment = computed(() => {
  let equipmentTypes = {};

  for(let i = 0; i < equipmentReservation.value.length; i++) {
    let equipment = equipmentReservation.value[i];
    let equipmentType = equipment["category"];

    if (!equipmentTypes[equipmentType]) {
      equipmentTypes[equipmentType] = [];
    }

    equipmentTypes[equipmentType].push(equipment);
  }

  return equipmentTypes;
});

function saveData(data){
  if (data){
    console.log(data);
    equipment.modifyEquipment(data);
  }
  equipmentManage.value = false;
}
</script>

<style scoped>
@import '../assets/css/views/EquipmentView.css';
</style>