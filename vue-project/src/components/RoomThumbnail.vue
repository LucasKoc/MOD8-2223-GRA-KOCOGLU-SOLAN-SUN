<template>
  <div class="room-thumbnail" @click="hrefToRoom">
    <span class="room-title">{{ room["room-name"] }}</span>
    <span :class="'availability ' + availabilityClass()">{{ room.availability }}</span>
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
      if (this.room.availability === 'Available') {
        return 'available';
      } else if (this.room.availability === 'Unavailable') {
        return 'unavailable';
      } else if (this.room.availability.includes('Available in')) {
        return 'available-in';
      }
      return '';
    },
    hrefToRoom() {
      this.$router.push(`/rooms/${this.room.id}`);
    }
  }
}
</script>

<style scoped>
.room-thumbnail {
  width: 200px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: 1px solid black;
  cursor: pointer;
}

.room-title {
  z-index: 1;
}

.availability {
  position: absolute;
  bottom: 10px;
  right: 10px;

  text-align: right;
  font-size: 75%;
}

/* Different color coding based on availability. Adjust colors as you see fit. */
.availability.available {
  color: green;
}

.availability.unavailable {
  color: red;
}

.availability.available-in {
  color: orange;
}
</style>