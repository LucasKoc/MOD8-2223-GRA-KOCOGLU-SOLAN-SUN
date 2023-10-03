<script setup>
    const props = defineProps({
        equipment: {
            type: Object,
            required: true
        },
    });
    const equipment = props.equipment;

</script>

<template>
    <div class="equipment-item">
        <div class="equipment-info">
            <p>{{ equipment.name }}</p>
            <p>ID: {{ equipment.id }}</p>
        </div>
    </div>
</template>
  
<style scoped>
@import "../assets/css/components/Equipment.css";
</style>
  