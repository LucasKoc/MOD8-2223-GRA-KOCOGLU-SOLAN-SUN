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

addRoom({roomname: "Gaming Room #1", roomtype: "gaming", reservation: [{date: "2021-05-01", time: "12:00", userid: 1}, {date: "2021-05-02", time: "18:00", userid: 1}, {date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Gaming Room #2", roomtype: "gaming", reservation: [{date: "2021-08-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Gaming Room #3", roomtype: "gaming", reservation: []});
addRoom({roomname: "Gaming Room #4", roomtype: "gaming", reservation: []});
addRoom({roomname: "Gaming Room #5", roomtype: "gaming", reservation: []});
addRoom({roomname: "Gaming Room #6", roomtype: "gaming", reservation: []});
addRoom({roomname: "Gaming Room #7", roomtype: "gaming", reservation: []});
addRoom({roomname: "Gaming Room #8", roomtype: "gaming", reservation: []});
addRoom({roomname: "Theater Room #1", roomtype: "multimedia", reservation: [{date: "2021-06-01", time: "18:00", userid: 2}, {date: "2021-06-01", time: "18:00", userid: 2}]});
addRoom({roomname: "Theater Room #2", roomtype: "multimedia", reservation: [{date: "2021-09-01", time: "16:00", userid: 2}]});
addRoom({roomname: "Gym Access #1", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #2", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #3", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #4", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #5", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #6", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #7", roomtype: "gym", reservation: []});
addRoom({roomname: "Gym Access #8", roomtype: "gym", reservation: []});
addRoom({roomname: "Billard Table #1", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #2", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #3", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #4", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #5", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #6", roomtype: "billard", reservation: []});
addRoom({roomname: "Billard Table #7", roomtype: "billard", reservation: []});

export default function roomData() {
    return {
        addRoom,
        getRooms,
        getRoom
    }
}