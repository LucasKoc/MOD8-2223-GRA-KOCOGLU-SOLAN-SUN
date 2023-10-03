<template>
  <main>
    <div v-for="(rooms, type) in typeOfRooms" :key="type">
      <h1 class="roomTypeTitle">{{ type.split('-')[0].charAt(0).toUpperCase() + type.split('-')[0].slice(1) }} Rooms:</h1>
      <div class="book-container">
        <div v-for="room in rooms" :key="room.id">
          <RoomThumbnail :room="room" @click="hrefToRoom(room.id)"/>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { ref, computed } from "vue";
import RoomThumbnail from "@/components/RoomThumbnail.vue";
import { useRouter } from "vue-router";

export default {
  components: {RoomThumbnail},
  setup() {
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
    const router = useRouter();

    const typeOfRooms = computed(() => {
      let roomTypes = {};

      for(let i = 0; i < roomReservations.value.length; i++) {
        let room = roomReservations.value[i];
        let roomType = room["room-type"];

        if (!roomTypes[roomType]) {
          roomTypes[roomType] = [];
        }

        roomTypes[roomType].push(room);
      }

      return roomTypes;
    });


    const hrefToRoom = (id) => {
      router.push(`/rooms/${id}`);
    }

    return { typeOfRooms, hrefToRoom };
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