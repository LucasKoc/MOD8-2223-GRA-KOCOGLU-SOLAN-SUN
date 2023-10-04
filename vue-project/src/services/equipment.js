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

addEquipment({name: "Washing Machine #1", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #2", category: "washing", status: "Available", reservation: {id: 2, time: "12:00"}});
addEquipment({name: "Washing Machine #3", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #4", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #5", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #6", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #7", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #8", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #9", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #10", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #11", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #12", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #13", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #14", category: "washing", status: "Available"});
addEquipment({name: "Washing Machine #15", category: "washing", status: "Available"});
addEquipment({name: "Drying Machine #1", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #2", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #3", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #4", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #5", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #6", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #7", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #8", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #9", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #10", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #11", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #12", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #13", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #14", category: "drying", status: "Available"});
addEquipment({name: "Drying Machine #15", category: "drying", status: "Available"});
addEquipment({name: "Vacuum Cleaner #1", category: "vacuum", status: "Available"});
addEquipment({name: "Vacuum Cleaner #2", category: "vacuum", status: "Available"});
addEquipment({name: "Vacuum Cleaner #3", category: "vacuum", status: "Available"});
addEquipment({name: "Playstation 4", category: "game", status: "Available"});
addEquipment({name: "XBOX Series X", category: "game", status: "Available"});
addEquipment({name: "Nintendo Switch + Pro Controller", category: "game", status: "Available"});

export default function equipmentData() {
    return {
        addEquipment,
        getEquipmentsByCategory,
        getEquipments,
        modifyEquipment,
        getEquipment
    }
}