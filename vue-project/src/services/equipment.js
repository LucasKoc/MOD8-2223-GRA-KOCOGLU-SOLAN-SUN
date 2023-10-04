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

function isEquipmentAvailable (equipment) {
  if (!equipment.reservation) {
    return true
  }

  const currentTime = new Date().getMinutes() + new Date().getHours() * 60;
  const equipmentTime = equipment.reservation.time.split(":")
  const addedTime=  (equipmentTime[0]) * 60 + parseInt(equipmentTime[1])

  
  console.log(addedTime, currentTime);

  if (addedTime > currentTime) {
    return {valid: false, minutes: addedTime - currentTime}
  }
  return {valid: true}
}

addEquipment({name: "Washing Machine 1", category: "washing"});
addEquipment({name: "Washing Machine 2", category: "washing", reservation: {id: 2, time: "20:00"}});
addEquipment({name: "Washing Machine 3", category: "washing"});
addEquipment({name: "Playstation 4", category: "game"});

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