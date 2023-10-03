<template>
  <div class="room-thumbnail" @click="hrefToRoom">
    <span class="room-title">{{ room["roomname"] }}</span>
    <span :class="'availability ' + availabilityClass()">{{ availabilityClass() }}</span>
  </div>
</template>

<script>
export default {
  name: "RoomThumbnail",
  props: {
    room: {
      type: Object,
      required: true
    }
  },
  methods: {
    availabilityClass() {
      if (!this.room.availability) return 'ERROR';
      if (this.room.availability === 'Available') {
        return 'available';
      } else if (this.room.availability === 'Unavailable') {
        return 'unavailable';
      } else if (this.room.availability.includes('Available in')) {
        return 'available-in';
      }
      return 'available';
    },
    hrefToRoom() {
      this.$router.push(`/rooms/${this.room.id}`);
    }
  }
}
</script>

<style scoped>
@import "../assets/css/components/RoomThumbnail.css";
</style>