let id = 1
const rooms = []

function addRoom(room) {
  room.id = id++
  rooms.push(room)
}

function getRooms() {
  return rooms
}

function getRoom(id) {
  return rooms.find((room) => room.id == id)
}

function isRoomAvailable(room) {
  let available = 'Available'
  if (room.reservation === undefined || room.reservation.length === 0) {
    return 'Available'
  }

  for (let i = 0; i < room.reservation.length; i++) {
    const currentTime =
      new Date().getMinutes() +
      new Date().getHours() * 60 +
      new Date().getDate() * 24 * 60 +
      (new Date().getMonth() + 1) * 30 * 24 * 60 +
      new Date().getFullYear() * 365 * 24 * 60
    const roomTime = room.reservation[i].time.split(':')
    const roomDate = room.reservation[i].date.split('-')
    const addedTime =
      roomTime[0] * 60 +
      parseInt(roomTime[1]) +
      roomDate[0] * 365 * 24 * 60 +
      roomDate[1] * 30 * 24 * 60 +
      roomDate[2] * 24 * 60

    if (addedTime - currentTime < 0 && 0 < addedTime + 60 - currentTime) {
      if (0 < addedTime + 60 - currentTime)
        available = 'Available in ' + (addedTime + 60 - currentTime) + ' minutes'
      else available = 'Unavailable'
    }
  }

  return available
}

addRoom({
  roomname: 'Gaming Room #1',
  roomtype: 'gaming',
  reservation: [
    { date: '2023-10-04', time: '23:00', userid: 1 },
    { date: '2023-10-05', time: '00:00', userid: 1 },
    { date: '2021-06-01', time: '18:00', userid: 2 },
    { date: '2021-06-01', time: '18:00', userid: 2 },
    { date: '2021-06-01', time: '18:00', userid: 2 },
    { date: '2021-06-01', time: '18:00', userid: 2 },
    { date: '2021-06-01', time: '18:00', userid: 2 }
  ]
})
addRoom({
  roomname: 'Gaming Room #2',
  roomtype: 'gaming',
  reservation: [{ date: '2021-08-01', time: '18:00', userid: 2 }]
})
addRoom({ roomname: 'Gaming Room #3', roomtype: 'gaming', reservation: [] })
addRoom({ roomname: 'Gaming Room #4', roomtype: 'gaming', reservation: [] })
addRoom({ roomname: 'Gaming Room #5', roomtype: 'gaming', reservation: [] })
addRoom({ roomname: 'Gaming Room #6', roomtype: 'gaming', reservation: [] })
addRoom({ roomname: 'Gaming Room #7', roomtype: 'gaming', reservation: [] })
addRoom({ roomname: 'Gaming Room #8', roomtype: 'gaming', reservation: [] })
addRoom({
  roomname: 'Theater Room #1',
  roomtype: 'multimedia',
  reservation: [
    { date: '2021-06-01', time: '18:00', userid: 2 },
    { date: '2021-06-01', time: '18:00', userid: 2 }
  ]
})
addRoom({
  roomname: 'Theater Room #2',
  roomtype: 'multimedia',
  reservation: [{ date: '2021-09-01', time: '16:00', userid: 2 }]
})
addRoom({ roomname: 'Gym Access #1', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #2', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #3', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #4', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #5', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #6', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #7', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Gym Access #8', roomtype: 'gym', reservation: [] })
addRoom({ roomname: 'Billard Table #1', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #2', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #3', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #4', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #5', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #6', roomtype: 'billard', reservation: [] })
addRoom({ roomname: 'Billard Table #7', roomtype: 'billard', reservation: [] })

export default function roomData() {
  return {
    isRoomAvailable,
    addRoom,
    getRooms,
    getRoom
  }
}
