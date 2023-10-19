import axios from 'axios'

let id = 1
const equipments = []

const addEquipment = async (equipmentname, equipmentcategory) => {
  try {
    // TODO: Assert Validator
    const response = await axios.post('/equipments', { equipmentname, equipmentcategory })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const deleteEquipment = async (id) => {
  try {
    // TODO: Assert Validator
    const response = await axios.delete(`/equipments/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getEquipments = async (query) => {
  try {
    const response = await axios.get('/equipments', { params: query })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getEquipment = async (id) => {
  try {
    const response = await axios.get(`/equipments/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getEquipmentReservationByUserId = async (id) => {
  try {
    const response = await axios.get(`/equipments/user/reservation/${id}`, {
      headers: { 'X-Origin-URL': window.location.pathname }
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const reserveEquipment = async (id, time, userId) => {
  try {
    // TODO: Assert Validator isEquipmentAvailable
    const response = await axios.patch(`/equipments/${id}/reservation`, { time, userId })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

function isEquipmentAvailable(equipment) {
  if (equipment.time === undefined || equipment.time === null) {
    return { valid: true }
  }

  const currentTime = new Date().getMinutes() + new Date().getHours() * 60
  const equipmentTime = equipment.time.split(':')
  const addedTime = equipmentTime[0] * 60 + parseInt(equipmentTime[1])

  if (addedTime > currentTime) {
    return { valid: false, minutes: addedTime - currentTime }
  }
  return { valid: true }
}

function handleError(error) {
  if (error.response) {
    console.log(error.response.data)
    return error.response.data
  }

  if (error.request) {
    console.error(error)
    return { error: { message: 'Failed to connect to server.' } }
  }

  console.error(error)
  return { error: { message: 'Something went wrong.' } }
}

export default function equipmentData() {
  return {
    addEquipment,
    getEquipments,
    reserveEquipment,
    isEquipmentAvailable,
    getEquipment,
    getEquipmentReservationByUserId
  }
}
