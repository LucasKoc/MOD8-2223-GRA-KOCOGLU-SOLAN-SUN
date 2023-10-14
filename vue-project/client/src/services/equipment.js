import axios from "axios";

let id = 1
const equipments = []

/*
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

const reserveEquipment = async (id, time) => {
    try {
      // TODO: Assert Validator isEquipmentAvailable
        const response = await axios.patch(`/equipments/${id}`, { time })
        return response.data
    } catch (error) {
        return handleError(error)
    }
}

 */

function addEquipment(equipment) {
  equipment.id = id++
  equipments.push(equipment)
}

function getEquipments() {
  return equipments
}

function getEquipmentsByCategory(category) {
  return getEquipments().filter((equipment) => equipment.category === category)
}

function getEquipment(id) {
  return equipments.find((equipment) => equipment.id === id)
}

function modifyEquipment(equipment) {
  const index = equipments.findIndex((e) => e.id === equipment.id)
  equipments.splice(index, 1, equipment)
}

function isEquipmentAvailable(equipment) {
  if (!equipment.reservation) {
    return { valid: true }
  }

  const currentTime = new Date().getMinutes() + new Date().getHours() * 60
  const equipmentTime = equipment.reservation.time.split(':')
  const addedTime = equipmentTime[0] * 60 + parseInt(equipmentTime[1])

  if (addedTime > currentTime) {
    return { valid: false, minutes: addedTime - currentTime }
  }
  return { valid: true }
}

addEquipment({ name: 'Washing Machine #1', category: 'washing' })
addEquipment({
  name: 'Washing Machine #2',
  category: 'washing',
  reservation: { id: 2, time: '23:45' }
})
addEquipment({ name: 'Washing Machine #3', category: 'washing' })
addEquipment({ name: 'Washing Machine #4', category: 'washing' })
addEquipment({ name: 'Washing Machine #5', category: 'washing' })
addEquipment({ name: 'Washing Machine #6', category: 'washing' })
addEquipment({ name: 'Washing Machine #7', category: 'washing' })
addEquipment({ name: 'Washing Machine #8', category: 'washing' })
addEquipment({ name: 'Washing Machine #9', category: 'washing' })
addEquipment({ name: 'Washing Machine #10', category: 'washing' })
addEquipment({ name: 'Washing Machine #11', category: 'washing' })
addEquipment({ name: 'Washing Machine #12', category: 'washing' })
addEquipment({ name: 'Washing Machine #13', category: 'washing' })
addEquipment({ name: 'Washing Machine #14', category: 'washing' })
addEquipment({ name: 'Washing Machine #15', category: 'washing' })
addEquipment({ name: 'Drying Machine #1', category: 'drying' })
addEquipment({ name: 'Drying Machine #2', category: 'drying' })
addEquipment({ name: 'Drying Machine #3', category: 'drying' })
addEquipment({ name: 'Drying Machine #4', category: 'drying' })
addEquipment({ name: 'Drying Machine #5', category: 'drying' })
addEquipment({ name: 'Drying Machine #6', category: 'drying' })
addEquipment({ name: 'Drying Machine #7', category: 'drying' })
addEquipment({ name: 'Drying Machine #8', category: 'drying' })
addEquipment({ name: 'Drying Machine #9', category: 'drying' })
addEquipment({ name: 'Drying Machine #10', category: 'drying' })
addEquipment({ name: 'Drying Machine #11', category: 'drying' })
addEquipment({ name: 'Drying Machine #12', category: 'drying' })
addEquipment({ name: 'Drying Machine #13', category: 'drying' })
addEquipment({ name: 'Drying Machine #14', category: 'drying' })
addEquipment({ name: 'Drying Machine #15', category: 'drying' })
addEquipment({ name: 'Vacuum Cleaner #1', category: 'vacuum' })
addEquipment({ name: 'Vacuum Cleaner #2', category: 'vacuum' })
addEquipment({ name: 'Vacuum Cleaner #3', category: 'vacuum' })
addEquipment({ name: 'Playstation 4', category: 'game' })
addEquipment({ name: 'XBOX Series X', category: 'game' })
addEquipment({ name: 'Nintendo Switch + Pro Controller', category: 'game' })

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
    getEquipmentsByCategory,
    getEquipments,
    modifyEquipment,
    isEquipmentAvailable,
    getEquipment
  }
}
