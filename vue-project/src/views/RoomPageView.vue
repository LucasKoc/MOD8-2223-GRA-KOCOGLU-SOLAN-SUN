<template>
  <main id="rooms-status-main">
    <div id="rooms-status-div">
      <div v-for="(rooms, type) in typeOfRooms" :key="type" class="rooms-row-container">
        <h1 class="roomTypeTitle">{{ type.split('-')[0].charAt(0).toUpperCase() + type.split('-')[0].slice(1) }} Rooms:</h1>
        <div class="room-box-container">
          <div v-for="room in rooms" :key="room.id">
            <RoomThumbnail :room="room"/>
          </div>
      </div>
    </div>
    </div>
  </main>
</template>

<script>
import { ref, computed } from "vue";
import RoomThumbnail from "@/components/RoomThumbnail.vue";
import roomData from "../services/room.js";

export default {
  components: {RoomThumbnail},
  
  setup() {
    const roomReservations = ref(roomData().getRooms())

    const typeOfRooms = computed(() => {
      let roomTypes = {};

      for(let i = 0; i < roomReservations.value.length; i++) {
        let room = roomReservations.value[i];
        let roomType = room["roomtype"];

        if (!roomTypes[roomType]) {
          roomTypes[roomType] = [];
        }

        roomTypes[roomType].push(room);
      }

      return roomTypes;
    });

    return { typeOfRooms };
  }
}
</script>

<style scoped>
@import '../assets/css/views/RoomPageView.css';
</style>