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
@import "../assets/css/components/AdminPanel.css";
</style>