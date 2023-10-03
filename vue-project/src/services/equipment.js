let id = 1
const equipments = []

function addEquipment (equipment) {
  equipment.id = id++
  equipments.push(equipment)
}

function getEquipments () {
  return equipments
}

function getEquipment (id) {
  return equipments.find(equipment => equipment.id === id)
}

export default function equipmentData() {
    return {
        addEquipment,
        getEquipments,
        getEquipment
    }
}