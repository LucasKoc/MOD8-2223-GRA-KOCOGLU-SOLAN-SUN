import axios from 'axios'
import validator from '../validators/room-validator'

const addRoom = async (roomname, roomtype) => {
  try {
    validator.addRoomValidator(roomname, roomtype)
    const response = await axios.post('/rooms', { roomname, roomtype })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const deleteRoom = async (id) => {
  try {
    validator.deleteRoomValidator(id)
    const response = await axios.delete(`/rooms/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getRooms = async (query) => {
  try {
    const response = await axios.get('/rooms', { params: query })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getRoom = async (id) => {
  try {
    validator.getRoomValidator(id)
    const response = await axios.get(`/rooms/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getReservations = async (id) => {
  try {
    const response = await axios.get(`/rooms/${id}/reservations`, {
      headers: { 'X-Origin-URL': window.location.pathname }
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const getReservationsByUserId = async (id) => {
  try {
    const response = await axios.get(`/rooms/user/reservations/${id}`, {
      headers: { 'X-Origin-URL': window.location.pathname }
    })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const addReservation = async (roomId, date, time, userId) => {
  try {
    validator.addReservationValidator(roomId, date, time, userId)
    const response = await axios.post(`/rooms/reservations`, { roomId, date, time, userId })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const deleteReservation = async (roomId, id) => {
  try {
    const response = await axios.delete(`/rooms/${roomId}/reservations`, { params: { id } })
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

async function isRoomAvailable(room) {
  try {
    room.reservation = await getReservations(room.id)
  } catch (error) {
    return handleError(error)
  }

  if (
    room.reservation === undefined ||
    room.reservation.length === 0 ||
    room.reservation.message === 'Room reservation does not exist or could not be find.'
  )
    return 'Available'

  const currentTimestamp = new Date()
  const futureReservation = room.reservation.filter(
    (reservation) =>
      new Date(reservation.date.split('T')[0] + 'T' + reservation.time + 'Z') >=
      currentTimestamp.getTime() - 4 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000
  )
  const currentReservation = room.reservation.filter(
    (reservation) =>
      new Date(reservation.date.split('T')[0] + 'T' + reservation.time + 'Z') >=
        new Date(currentTimestamp.getTime() - 4 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000) &&
      new Date(reservation.date.split('T')[0] + 'T' + reservation.time + 'Z') <=
        currentTimestamp.getTime() - 4 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000
  )

  if (currentReservation.length > 0 && futureReservation.length > 0) {
    if (
      new Date(
        futureReservation[futureReservation.length - 1].date.split('T')[0] +
          'T' +
          futureReservation[futureReservation.length - 1].time +
          'Z'
      ).getTime() <=
      currentTimestamp.getTime() - 4 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
    )
      return 'Unavailable'
    else
      return (
        'Available in ' +
        Math.round(
          (new Date(
            currentReservation[0].date.split('T')[0] + 'T' + currentReservation[0].time + 'Z'
          ).getTime() +
            60 * 60 * 1000 -
            (currentTimestamp.getTime() - 4 * 60 * 60 * 1000)) /
            (60 * 1000)
        ) +
        ' minutes'
      )
  }
  return 'Available'
}

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

export default function roomData() {
  return {
    isRoomAvailable,
    addRoom,
    deleteRoom,
    getRooms,
    getRoom,
    getReservations,
    getReservationsByUserId,
    addReservation,
    deleteReservation
  }
}
