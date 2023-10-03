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
  console.log(id)
  return rooms.find(room => room.id == id)
}

addRoom({roomname: "Kitchen 1", roomtype: "kitchen", reservation: [{date: "2021-05-01", time: "12:00", userid: 1}, {date: "2021-05-02", time: "18:00", userid: 1}, {date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Kitchen 2", roomtype: "kitchen", reservation: [{date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Theater Room", roomtype: "multimedia", reservation: [{date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}]});

export default function roomData() {
    return {
        addRoom,
        getRooms,
        getRoom
    }
}