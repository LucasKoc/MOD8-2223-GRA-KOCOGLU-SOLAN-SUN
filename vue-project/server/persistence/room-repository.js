import database from './database.js'

const findRooms = async () => {
  const query = 'SELECT id, roomname, roomtype FROM rooms;'
  const [rows] = await database.execute(query)
  return rows.map(mapRoom)
}

function mapRoom(row) {
  return {
    id: row.id,
    roomname: row.roomname,
    roomtype: row.roomtype
  }
}

const findRoom = async (id) => {
  const query = 'SELECT id, roomname, roomtype FROM rooms WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapRoom(rows[0]) : null
}

const addRoom = async (room) => {
    const query = 'INSERT INTO rooms (roomname, roomtype) VALUES (?, ?);'
    const [result] = await database.execute(query, [room.roomname, room.roomtype])
    if (result.affectedRows > 0) {
        return room
    }
    
    throw new Error(`Failed to create room ${room.id}.`)
}

const deleteRoom = async (id) => {
    const query = 'DELETE FROM rooms WHERE id = ?;'
    const [result] = await database.execute(query, [id])
    return result.affectedRows > 0
}

const findReservations = async (id) => {
  const query = 'SELECT id, room_id, date, time, user_id FROM reservations WHERE room_id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.map(mapReservation)
}

function mapReservation(row) {
  return {
    id: row.id,
    roomId: row.room_id,
    date: row.date,
    time: row.time,
    userId: row.user_id
  }
}

const createReservation = async (reservation) => {
  const query = 'INSERT INTO reservations (room_id, date, time, user_id) VALUES (?, ?, ?, ?);'
  const [result] = await database.execute(query, [reservation.roomId, reservation.date, reservation.time, reservation.userId])
  if (result.affectedRows > 0) {
    return reservation
  }

  throw new Error(`Failed to create reservation ${reservation.id}.`)
}

const deleteReservation = async (id) => {
  const query = 'DELETE FROM reservations WHERE id = ?;'
  const [result] = await database.execute(query, [id])
  return result.affectedRows > 0
}

export default {
    findRooms,
    findRoom,
    addRoom,
    deleteRoom,
    findReservations,
    createReservation,
    deleteReservation
}
