<template>
  <div class="room-thumbnail" @click="hrefToRoom">
    <span class="room-title">{{ room["roomname"] }}</span>
    <span :class="'availability ' + availabilityClass()">{{ room.availability ? room.availability : "N/A" }}</span>
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
      else if (this.room.availability.toLowerCase() === 'Available'.toLowerCase()) {
        return 'Available';
      } else if (this.room.availability.toLowerCase() === 'Unavailable'.toLowerCase()) {
        return 'Unavailable';
      } else if (this.room.availability.toLowerCase().includes('Available in'.toLowerCase())) {
        return 'Available-in';
      }
      return 'Available';
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