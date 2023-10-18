import database from './database.js'

function mapRoom(row) {
  return {
    id: row.id,
    roomname: row.roomname,
    roomtype: row.roomtype
  }
}

const findRooms = async () => {
  const query = 'SELECT id, roomname, roomtype FROM rooms;'
  const [rows] = await database.execute(query)
  return rows.map(mapRoom)
}

const findRoom = async (id) => {
  const query = 'SELECT id, roomname, roomtype FROM rooms WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapRoom(rows[0]) : null
}

const findUserRoomReservations = async (userId) => {
    const query = 'SELECT rooms.roomname, reservations.room_id, reservations.date, reservations.time FROM rooms JOIN reservations ON rooms.id = reservations.room_id WHERE reservations.user_id = ?;'
    const [rows] = await database.execute(query, [userId])
    return rows.map(mapReservation)
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

    const query2 = 'DELETE FROM reservations WHERE room_id = ?'
    await database.execute(query2, [id]);
    const query = 'DELETE FROM rooms WHERE id = ?;'
    const [result] = await database.execute(query, [id]);
    return result.affectedRows > 0;
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

const findReservations = async (id) => {
  const query = 'SELECT id, room_id, date, time, user_id FROM reservations WHERE room_id = ? ORDER BY date DESC;'
  const [rows] = await database.execute(query, [id])
  return rows.map(mapReservation)
}

const createReservation = async (reservation) => {
  const query = 'INSERT INTO reservations (room_id, date, time, user_id) VALUES (?, ?, ?, ?);'
  const [result] = await database.execute(query, [reservation.roomId, reservation.date, reservation.time, reservation.userId])
  if (result.affectedRows > 0) {
    return reservation
  }

  throw new Error(`Failed to create reservation ${reservation.id}.`)
}

const deleteReservation = async (id, roomId) => {
  const query = 'DELETE FROM reservations WHERE id = ? AND room_id = ?;'
  const [result] = await database.execute(query, [id, roomId])
  return result.affectedRows > 0
}

const deleteUserRoomReservations = async (userId) => {
    const query = 'DELETE FROM reservations WHERE user_id = ?;'
    const [result] = await database.execute(query, [userId])
    return result.affectedRows > 0
}

export default {
    findRooms,
    findRoom,
    findUserRoomReservations,
    addRoom,
    deleteRoom,
    findReservations,
    createReservation,
    deleteReservation,
    deleteUserRoomReservations
}
