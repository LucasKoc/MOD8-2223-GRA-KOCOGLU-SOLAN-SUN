<script setup>
import {computed, ref} from 'vue';
import Equipment from '../components/Equipment.vue';
import EquipRes from '../components/EquipRes.vue';
import equipmentData from '../services/equipment.js';
import userData from '../services/user';

const equipmentManage = ref(false);
const equipment = equipmentData()
const equipmentforTypeDataSelected = ref();
const equipmentSelected = ref();
const user = ref(userData().getConnectedUser());

const equipmentReservation = ref(equipment.getEquipments())

const test = equipment.isEquipmentAvailable(equipmentReservation.value[1])

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

function activateModal(data){
  if(!user.value.id) {
    alert('You must be logged in to be able to make a reservation')
  }else{
    equipmentSelected.value = data;
    equipmentforTypeDataSelected.value = typeOfEquipment.value[data['category']]
    equipmentManage.value = true;
  }
}

function saveData(data){
  if (data){
    console.log(data);
    equipment.modifyEquipment(data);
  }
  equipmentManage.value = false;
}
</script>

<template>
  <main id="equipments-status-main">
    <div id="equipments-status-div">
      <div v-for="(equipments, type) in typeOfEquipment" :key="type" class="equipments-row-container">
        <h2 class="equipmentTypeTitle">{{ type && type.length > 0 ? (type[0].toUpperCase() + type.slice(1)) : "N/A"}} Equipment:</h2>
        <div class="equipment-box-container">
          <div v-for="equipment in equipments" :key="equipment.id">
            <Equipment :equipment="equipment" @click="activateModal(equipment)"/>
          </div>
        </div>
      </div>
    </div>

    <div class="backdrop" v-if="equipmentManage"></div>
    <EquipRes class="user-modal" v-if="equipmentManage" @sendData="(data) => saveData(data)" :equipmentData="equipmentforTypeDataSelected" :equipment-selected="equipmentSelected"/>
  </main>
</template>

<style scoped>
@import '../assets/css/views/EquipmentView.css';
</style>