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

export default {
  components: { RoomThumbnail },
  setup() {
    const searchQuery = ref("");
    const roomReservations = ref([
      {
        "id": 1,
        "room-type": "gaming-room",
        "room-name": "Gaming Room #1",
        "availability": "Available"
      },
      {
        "id": 2,
        "room-type": "theater-room",
        "room-name": "Theater Room #1",
        "availability": "Unavailable"
      },
      {
        "id": 3,
        "room-type": "gym-room",
        "room-name": "Gym Room #1",
        "availability": "Available in 30 minutes"
      },
      {
        "id": 4,
        "room-type": "billiard-room",
        "room-name": "Billiard Room #1",
        "availability": "Available"
      },
      {
        "id": 5,
        "room-type": "gaming-room",
        "room-name": "Gaming Room #2",
        "availability": "Available in 45 minutes"
      },
      {
        "id": 6,
        "room-type": "theater-room",
        "room-name": "Theater Room #2",
        "availability": "Available in 10 minutes"
      },
      {
        "id": 7,
        "room-type": "gym-room",
        "room-name": "Gym Room #2",
        "availability": "Available"
      },
      {
        "id": 8,
        "room-type": "billiard-room",
        "room-name": "Billiard Room #2",
        "availability": "Unavailable"
      },
      {
        "id": 9,
        "room-type": "gaming-room",
        "room-name": "Gaming Room #3",
        "availability": "Available in 5 minutes"
      },
      {
        "id": 10,
        "room-type": "theater-room",
        "room-name": "Theater Room #3",
        "availability": "Available"
      }
    ]);

    const filteredRooms = computed(() => {
      const results = roomReservations.value.filter((room) =>
          room["room-name"].toLowerCase().includes(searchQuery.value.toLowerCase()),
      );

      return results.slice(0, 5);
    });

    let recommandedRooms = [];
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
main {
  max-width: 80vw;
  width: 80vw;
  margin: 0 auto;
  padding: 20px;
}

div.search-component {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  text-align: center;
}

input.search-bar {
  width: 100%;
  padding: 1em;
  margin-bottom: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  outline: none;
}

ul {
  list-style-type: none;

  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  flex-direction: row;
}

ul li {
}

ul li:last-child {
  border-bottom: none;
}

@media (max-width: 844px) {
  main {
    font-size: 18px;
  }
}
</style>