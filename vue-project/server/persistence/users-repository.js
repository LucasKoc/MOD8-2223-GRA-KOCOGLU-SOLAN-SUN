import database from "./database.js";

function mapUser(row) {
  return {
    id: row.id,
    room: row.room,
    keyp: row.keyp,
    name: row.name,
    role: row.role
  };
}

const findUsers = async () => {
  const query = "SELECT id, room, keyp, name, role FROM users;";
  const [rows] = await database.execute(query);
  return rows.map(mapUser);
};

const findUser = async id => {
  const query = "SELECT id, room, keyp, name, role FROM users WHERE id = ?;";
  const [rows] = await database.execute(query, [id]);
  return rows.length > 0 ? mapUser(rows[0]) : null;
};

const addUser = async user => {
  const query =
    "INSERT INTO users (room, keyp, name, role) VALUES (?, ?, ?, ?);";
  const [result] = await database.execute(query, [
    user.room,
    user.keyp,
    user.name,
    user.role
  ]);
  if (result.affectedRows > 0) {
    return user;
  }

  throw new Error(`Failed to create user ${user.id}.`);
};

const deleteUser = async id => {
  const query = "DELETE FROM users WHERE id = ?;";
  const [result] = await database.execute(query, [id]);
  return result.affectedRows > 0;
};

const modifyUser = async (id, user) => {
    const query =
        "UPDATE users SET room = ?, keyp = ?, name = ?, role = ? WHERE id = ?;";
    const [result] = await database.execute(query, [
        user.room,
        user.keyp,
        user.name,
        user.role,
        id
    ]);
    if (result.affectedRows === 0) {
        throw new Error(`Failed to modify user ${id}.`);
    }
}

export default {
  findUsers,
  findUser,
  addUser,
  deleteUser,
  modifyUser
};
