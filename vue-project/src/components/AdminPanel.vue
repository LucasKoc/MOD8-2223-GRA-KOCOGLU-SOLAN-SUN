<script setup>
const props = defineProps({
    admin: {
        type: Object,
        required: true
    },
});
const admin = props.admin;

</script>

<template>
  <div class="admin-item">
    <div class="admin-info">
      <p>{{ admin.name }}</p>
      <p>Room: {{ admin.Room }}</p>
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