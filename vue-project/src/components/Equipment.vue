<template>
  <div class="equipment-thumbnail">
    <span class="equipment-title">{{ equipment.name }}</span>
    <span :class="'availability '">status: {{ availability ? availability : "Available" }}</span>
  </div>
</template>

<script setup>
  import equipmentData from '../services/equipment';
  import { ref } from 'vue';
  const props = defineProps({
      equipment: {
          type: Object,
          required: true
      },
  });
  const equipment = props.equipment;
  const availability = ref();

  const getavailabilitydictionnary = equipmentData().isEquipmentAvailable(equipment);
  if (!getavailabilitydictionnary.valid){
    availability.value = getavailabilitydictionnary.minutes;
  }else{
    availability.value = "Available";
  }


</script>
  
<style scoped>
@import "../assets/css/components/Equipment.css";
</style>
  