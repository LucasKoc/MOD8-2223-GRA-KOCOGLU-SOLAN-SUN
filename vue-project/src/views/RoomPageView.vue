<template>
  <main>
    <div v-for="(rooms, type) in typeOfRooms" :key="type">
      <h1 class="roomTypeTitle">{{ type.split('-')[0].charAt(0).toUpperCase() + type.split('-')[0].slice(1) }} Rooms:</h1>
      <div class="book-container">
        <div v-for="room in rooms" :key="room.id">
          <RoomThumbnail :room="room"/>
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

div.book-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  margin: 4vh 0 4vh 0;
}
</style>