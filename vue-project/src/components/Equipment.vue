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
    .equipment-item {
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .equipment-info {
        text-align: center;
    }

    .equipment-info p {
        margin: 5px 0;
    }
</style>
  