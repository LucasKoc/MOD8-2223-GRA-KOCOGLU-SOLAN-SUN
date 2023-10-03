<template>
  <main>
    <div class="search-component">
      <h1>Search for your book !</h1>
      <input
          v-model="searchQuery"
          placeholder="Search for books"
          class="search-bar"
      />
    </div>
    <div id="result-search" v-show="searchQuery">
      <ul v-if="filteredRooms.length">
        <li v-for="rooms in filteredRooms" :key="rooms.id">
          <RoomThumbnail :room="rooms"/>
        </li>
      </ul>
    </div>
    <div id="recommanded-rooms" v-if="recommandedRooms.length">
      <h1>Recommanded rooms :</h1>
      <ul v-if="recommandedRooms.length">
        <li v-for="rooms in recommandedRooms" :key="rooms.id">
          <RoomThumbnail :room="rooms" />
        </li>
      </ul>
    </div>
  </main>
</template>

<script>
import { ref, computed } from "vue";
import RoomThumbnail from "@/components/RoomThumbnail.vue";
import roomData from "@/services/room.js";

export default {
  components: { RoomThumbnail },
  setup() {
    const searchQuery = ref("");
    const roomReservations = ref( roomData().getRooms());

    const filteredRooms = computed(() => {
      const results = roomReservations.value.filter((room) =>
          room["roomname"].toLowerCase().includes(searchQuery.value.toLowerCase()),
      );

      return results.slice(0, 5);
    });

    let recommandedRooms = []
    for (
        let i = 0;
        i < roomReservations.value.length && recommandedRooms.length < 3;
        i++
    ) {
      try {
        if (Math.round(Math.random()) === 1) {
          recommandedRooms.push(roomReservations.value[i]);
        }
      } catch (e) {console.error(e)}
    }

    return { searchQuery, filteredRooms, roomReservations, recommandedRooms };
  },
};
</script>
<style scoped>
@import '../assets/css/views/HomeView.css';
</style>