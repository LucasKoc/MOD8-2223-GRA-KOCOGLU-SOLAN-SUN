let id = 1
const equipments = []

function addEquipment (equipment) {
  equipment.id = id++
  equipments.push(equipment)
}

function getEquipments () {
  return equipments
}

function getEquipmentsByCategory (category) {
  return equipments.filter(equipment => equipment.category === category)
}

function getEquipment (id) {
  return equipments.find(equipment => equipment.id === id)
}

function modifyEquipment (equipment) {
  const index = equipments.findIndex(e => e.id === equipment.id)
  equipments.splice(index, 1, equipment)
}

addEquipment({name: "Washing Machine 1", category: "", status: "Available"});
addEquipment({name: "Washing Machine 2", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine 3", category: "washing", status: "Available"});
addEquipment({name: "Playstation 4", category: "game", status: "Available"});

export default function equipmentData() {
    return {
        addEquipment,
        getEquipmentsByCategory,
        getEquipments,
        modifyEquipment,
        getEquipment
    }
}