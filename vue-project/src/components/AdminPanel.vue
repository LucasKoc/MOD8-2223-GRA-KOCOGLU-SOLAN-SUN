<script setup>
const props = defineProps({
    user: {
        type: Object,
        required: true
    },
});

</script>

<template>
  <div class="admin-item">
    <div class="admin-info">
      <p>{{ user.name }}</p>
      <p>Room: {{ user.room }}</p>
    </div>
  </div>
</template>

<style scoped>
.admin-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.admin-info {
  text-align: center;
}

.equipment-info p {
  margin: 5px 0;
}
</style>