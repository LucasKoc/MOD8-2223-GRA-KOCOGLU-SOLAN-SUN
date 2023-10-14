import database from './database.js'

const findSession = async (id) => {
  const query = 'SELECT id, username, start_time, extended_time, expiry_time FROM sessions WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapSession(rows[0]) : null
}

function mapSession(row) {
  return {
    id: row.id,
    username: row.username,
    startTime: row.start_time,
    extendedTime: row.extended_time,
    expiryTime: row.expiry_time
  }
}

const createSession = async (session) => {
  const query = 'INSERT INTO sessions (id, username, start_time, expiry_time) VALUES (?, ?, ?, ?);'
  const [result] = await database.execute(query, [session.id, session.username, session.startTime, session.expiryTime])
  if (result.affectedRows > 0) {
    return session
  }

  throw new Error(`Failed to create session ${session.id}.`)
}

const extendSession = async (id, extendedTime, expiryTime) => {
  const query = 'UPDATE sessions SET extended_time = ?, expiry_time = ? WHERE id = ?;'
  const [result] = await database.execute(query, [extendedTime, expiryTime, id])
  if (result.affectedRows === 0) {
    throw new Error(`Failed to extend session ${id}.`)
  }
}

const deleteSession = async (id) => {
  const query = 'DELETE FROM sessions WHERE id = ?;'
  const [result] = await database.execute(query, [id])
  return result.affectedRows > 0
}

export default {
  findSession,
  createSession,
  extendSession,
  deleteSession
}
