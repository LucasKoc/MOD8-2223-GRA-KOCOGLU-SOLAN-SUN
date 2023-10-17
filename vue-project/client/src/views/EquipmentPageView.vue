<script setup>
import {computed, onMounted, ref} from 'vue'
import Equipment from '../components/Equipment.vue'
import EquipmentReservation from '../components/EquipmentReservation.vue'
import equipmentData from '../services/equipment.js'
import userData from '../services/user'

const equipmentManage = ref(false)
const equipment = equipmentData()
const equipmentforTypeDataSelected = ref()
const equipmentSelected = ref()
const user = ref()
const equipmentReservation = ref([])

const fetchData = async () => {
  try {
    equipmentReservation.value = await equipment.getEquipments()
  } catch (error) {
    console.log(error)
  }
}

const fetchLogin = async () => {
  try {
    user.value = await userData().getConnectedUser()
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchData)

const typeOfEquipment = computed(() => {
  let equipmentTypes = {}

  for (let i = 0; i < equipmentReservation.value.length; i++) {
    let equipment = equipmentReservation.value[i]
    let equipmentType = equipment['category']

    if (!equipmentTypes[equipmentType]) {
      equipmentTypes[equipmentType] = []
    }
    equipmentTypes[equipmentType].push(equipment)
  }
  return equipmentTypes
})

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
    window.location.reload()
  }
  equipmentManage.value = false
}
</script>

<template>
  <main id="equipments-status-main">
    <div id="equipments-status-div">
      <div
        v-for="(equipments, type) in typeOfEquipment"
        :key="type"
        class="equipments-row-container"
      >
        <h2 class="equipmentTypeTitle">
          {{ type && type.length > 0 ? type[0].toUpperCase() + type.slice(1) : 'N/A' }} Equipment:
        </h2>
        <div class="equipment-box-container">
          <div v-for="equipment in equipments" :key="equipment.id">
            <Equipment :equipment="equipment" @click="activateModal(equipment)" />
          </div>
        </div>
      </div>
    </div>

    <div class="backdrop" v-if="equipmentManage"></div>
    <EquipmentReservation
      class="user-modal"
      v-if="equipmentManage"
      @sendData="(data) => saveData(data)"
      :equipmentData="equipmentforTypeDataSelected"
      :equipment-selected="equipmentSelected"
    />
  </main>
</template>

<style scoped>
@import '../assets/css/views/EquipmentPageView.css';
</style>
