<template>
  <div class="room-thumbnail" @click="hrefToRoom">
    <span class="room-title">{{ room['roomname'] }}</span>
    <span :class="'availability ' + availability">{{ availability ? availability : 'N/A' }}</span>
  </div>
</template>

<script setup>
import roomData from '../services/room'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  room: {
    type: Object,
    required: true
  }
})

const availability = ref()

const fetchData = async () => {
  availability.value = await roomData().isRoomAvailable(props.room)
}

onMounted(fetchData)

function hrefToRoom() {
  router.push(`/rooms/${props.room.id}`)
}
</script>

<style scoped>
@import '../assets/css/components/RoomThumbnail.css';
</style>
