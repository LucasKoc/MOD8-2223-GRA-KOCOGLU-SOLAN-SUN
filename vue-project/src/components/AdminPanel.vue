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
@import "../assets/css/components/AdminPanel.css";
</style>