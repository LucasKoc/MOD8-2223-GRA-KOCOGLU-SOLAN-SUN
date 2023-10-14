import database from './database.js'

/*
-- Create the "equipments" table
CREATE TABLE equipments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL
    time TIME,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
*/

function mapEquipment(row) {
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      time: row.time,
      userId: row.user_id
    }
}

const findEquipments = async () => {
  const query = 'SELECT id, name, category, time, user_id FROM equipments;'
  const [rows] = await database.execute(query)
  return rows.map(mapEquipment)
}

const findEquipment = async (id) => {
  const query = 'SELECT id, name, category, time, user_id FROM equipments WHERE id = ?;'
  const [rows] = await database.execute(query, [id])
  return rows.length > 0 ? mapEquipment(rows[0]) : null
}

const addEquipment = async (equipment) => {
    const query = 'INSERT INTO equipments (name, category) VALUES (?, ?);'
    const [result] = await database.execute(query, [equipment.name, equipment.category])
    if (result.affectedRows > 0) {
        return equipment
    }
    
    throw new Error(`Failed to create equipment ${equipment.id}.`)
}

const deleteEquipment = async (id) => {
    const query = 'DELETE FROM equipments WHERE id = ?;'
    const [result] = await database.execute(query, [id])
    return result.affectedRows > 0
}

const setreservation = async (id, time) => {
    const query = 'UPDATE equipments SET time = ? WHERE id = ?;'
    const [result] = await database.execute(query, [time, id])
    if (result.affectedRows === 0) {
        throw new Error(`Failed to set time for equipment ${id}.`)
    }
}

const getreservation = async (id) => {
    const query = 'SELECT time FROM equipments WHERE id = ?;'
    const [rows] = await database.execute(query, [id])
    return rows.length > 0 ? rows[0].time : null
}

export default {
  findEquipments,
  findEquipment,
  addEquipment,
  deleteEquipment,
  setreservation,
  getreservation
}


