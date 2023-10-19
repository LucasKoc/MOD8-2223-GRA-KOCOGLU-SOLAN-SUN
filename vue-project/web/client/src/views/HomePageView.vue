<template>
  <main>
    <div class="search-component">
      <h1>Search for your room/equipment !</h1>
      <input
        v-model="searchQuery"
        placeholder="ex: Gaming room #4 / Washing Machine #1"
        class="search-bar"
      />
    </div>
    <div id="result-search" v-show="searchQuery">
      <ul v-if="filteredRooms.length || filteredEquipment.length">
        <li v-for="rooms in filteredRooms" :key="rooms.id">
          <RoomThumbnail :room="rooms" />
        </li>
        <li v-for="equipment in filteredEquipment" :key="equipment.id">
          <Equipment :equipment="equipment" @click="activateModal(equipment)" />
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
    <div id="recommanded-equipments" v-if="recommandedEquipment.length">
      <h1>Recommanded equipment :</h1>
      <ul v-if="recommandedEquipment.length">
        <li v-for="equipment in recommandedEquipment" :key="equipment.id">
          <Equipment :equipment="equipment" @click="activateModal(equipment)" />
        </li>
      </ul>
    </div>

    <div class="backdrop" v-if="equipmentManage === true"></div>
    <EquipmentReservation
      class="user-modal"
      v-if="equipmentManage"
      @sendData="(data) => saveData(data)"
      :equipmentData="equipmentforTypeDataSelected"
      :equipment-selected="equipmentSelected"
    />
  </main>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import RoomThumbnail from '@/components/RoomThumbnail.vue'
import roomData from '@/services/room.js'
import equipmentData from '@/services/equipment.js'
import Equipment from '@/components/Equipment.vue'
import EquipmentReservation from '@/components/EquipmentReservation.vue'
import userData from '@/services/user'
import { route } from 'express/lib/router'

export default {
  components: { EquipmentReservation, Equipment, RoomThumbnail },
  setup() {
    const searchQuery = ref('')
    const roomReservations = ref([])
    const equipmentReservations = ref([])
    const recommandedRooms = ref([])
    const recommandedEquipment = ref([])

    const fetchData = async () => {
      try {
        roomReservations.value = await roomData().getRooms()
        equipmentReservations.value = await equipmentData().getEquipments()
        await recommandations()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const recommandations = async () => {
      try {
        // Recommanded rooms
        for (
          let i = 0;
          i < roomReservations.value.length && recommandedRooms.value.length < 3;
          i++
        ) {
          try {
            const roomReservationAvailableStatus = await roomData().isRoomAvailable(
              roomReservations.value[i]
            )
            if (
              Math.round(Math.random()) === 1 &&
              !roomReservationAvailableStatus.includes('in') &&
              !roomReservationAvailableStatus.includes('in')
            ) {
              recommandedRooms.value.push(roomReservations.value[i])
            }
          } catch (e) {
            console.error(e)
          }
        }

        // Recommanded equipment
        for (
          let i = 0;
          i < equipmentReservations.value.length && recommandedEquipment.value.length < 3;
          i++
        ) {
          try {
            if (
              Math.round(Math.random()) === 1 &&
              !equipmentData().isEquipmentAvailable(equipmentReservations.value[i]).valid === false
            ) {
              recommandedEquipment.value.push(equipmentReservations.value[i])
            }
          } catch (e) {
            console.error(e)
          }
        }
      } catch (error) {
        console.error('Error generating recommandation:', error)
      }
    }

    onMounted(fetchData)

    const filteredRooms = computed(() => {
      const results = roomReservations.value.filter((room) =>
        room['roomname'].toLowerCase().includes(searchQuery.value.toLowerCase())
      )

      return results.slice(0, 2)
    })

    const filteredEquipment = computed(() => {
      const results = equipmentReservations.value.filter((equipment) =>
        equipment['name'].toLowerCase().includes(searchQuery.value.toLowerCase())
      )

      return results.slice(0, 2)
    })

    const equipmentManage = ref(false)
    const equipmentforTypeDataSelected = ref()
    const user = ref()
    const equipment = equipmentData()
    const equipmentSelected = ref()

    const fetchLogin = async () => {
      try {
        user.value = await userData().getConnectedUser()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    async function activateModal(data) {
      await fetchLogin()
      if (!user.value || !user.value.id) {
        alert('You must be logged in to be able to make a reservation')
      } else {
        equipmentSelected.value = data
        equipmentforTypeDataSelected.value = typeOfEquipment.value[data['category']]
        equipmentManage.value = true
      }
    }

    function saveData(data) {
      if (data) {
        equipment.reserveEquipment(data.id, data.reservations.time, user.value.id)
        window.location.replace('/equipments')
      }
      equipmentManage.value = false
    }

    const typeOfEquipment = computed(() => {
      let equipmentTypes = {}

      for (let i = 0; i < equipmentReservations.value.length; i++) {
        let equipment = equipmentReservations.value[i]
        let equipmentType = equipment['category']

        if (!equipmentTypes[equipmentType]) {
          equipmentTypes[equipmentType] = []
        }
        equipmentTypes[equipmentType].push(equipment)
      }
      return equipmentTypes
    })

    return {
      searchQuery,
      filteredRooms,
      filteredEquipment,
      roomReservations,
      recommandedRooms,
      recommandedEquipment,
      activateModal,
      saveData,
      equipmentforTypeDataSelected,
      equipmentManage,
      equipmentSelected
    }
  }
}
</script>
<style scoped>
@import '../assets/css/views/HomePageView.css';
</style>
