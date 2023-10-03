let id = 1
const rooms = []

function addRoom (room) {
  room.id = id++
  rooms.push(room)
}

function getRooms () {
  return rooms
}

function getRoom (id) {
  return rooms.find(room => room.id === id)
}

export default function roomData() {
    return {
        addRoom,
        getRooms,
        getRoom
    }
}