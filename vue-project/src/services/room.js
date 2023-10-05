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
  return rooms.find(room => room.id == id)
}

function isRoomAvailable (room) {
  let available = "Available";
  if (!room.reservation) {
    return "Available"
  }

  for (let i = 0; i < room.reservation.length; i++) {
    const currentTime = new Date().getMinutes() + new Date().getHours() * 60 + new Date().getDate() * 24 * 60 + (new Date().getMonth() + 1) * 30 * 24 * 60 + new Date().getFullYear() * 365 * 24 * 60;
    const roomTime = room.reservation[i].time.split(":");
    const roomDate = room.reservation[i].date.split("-");
    const addedTime = (roomTime[0]) * 60 + parseInt(roomTime[1]) + (roomDate[0] * 365 * 24 * 60) + (roomDate[1] * 30 * 24 * 60) + (roomDate[2] * 24 * 60);

    if (((addedTime - currentTime) < 0)  && (0 < (addedTime + 60 - currentTime))) {
      available = "Unavailable"
    }
    
  }
  
  return available
}

addRoom({roomname: "Kitchen 1", roomtype: "kitchen", reservation: [{date: "2021-05-01", time: "12:00", userid: 1}, {date: "2021-05-02", time: "18:00", userid: 1}, {date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Kitchen 2", roomtype: "kitchen", reservation: [{date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Theater Room", roomtype: "multimedia", reservation: [{date: "2023-10-04", time: "20:17", userid: 2}]});

export default function roomData() {
    return {
        isRoomAvailable,
        addRoom,
        getRooms,
        getRoom
    }
}