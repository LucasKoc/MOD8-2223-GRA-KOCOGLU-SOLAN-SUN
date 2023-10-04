<template>
  <div class="equipment-thumbnail" @click="equipmentManage = true">
    <span class="equipment-title">{{ equipment.name }}</span>
    <span :class="'availability ' + availabilityClass()">{{ equipment.availability ? equipment.availability : "N/A" }}</span>
  </div>
</template>

<script setup>
    const props = defineProps({
        equipment: {
            type: Object,
            required: true
        },
    });
    const equipment = props.equipment;

    function availabilityClass() {
      if (!this.equipment.availability) return 'ERROR';
      else if (this.equipment.availability.toLowerCase() === 'Available'.toLowerCase()) {
        return 'Available';
      } else if (this.equipment.availability.toLowerCase() === 'Unavailable'.toLowerCase()) {
        return 'Unavailable';
      } else if (this.equipment.availability.toLowerCase().includes('Available in'.toLowerCase())) {
        return 'Available-in';
      }
      return 'Available';
    }

</script>
  
<style scoped>
@import "../assets/css/components/Equipment.css";
</style>
  