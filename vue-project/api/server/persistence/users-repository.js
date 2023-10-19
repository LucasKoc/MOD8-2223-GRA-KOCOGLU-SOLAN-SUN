import database from "./database.js";
import session from "./authentication-repository.js";

function mapUser(row) {
    return {
        id: row.id,
        room: row.room,
        key: row.keyp,
        name: row.name,
        role: row.role,
        ban: row.ban
    };
}

const findUsers = async () => {
    const query = "SELECT id, room, keyp, name, role, ban FROM users;";
    const [rows] = await database.execute(query);
    return rows.map(mapUser);
};

const findUser = async id => {
    const query = "SELECT id, room, keyp, name, role, ban FROM users WHERE id = ?;";
    const [rows] = await database.execute(query, [id]);
    return rows.length > 0 ? mapUser(rows[0]) : null;
};

const addUser = async user => {
    const query =
        "INSERT INTO users (room, keyp, name, role) VALUES (?, ?, ?, ?);";

    if (!user.role)
        user.role = "user"
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

const findUserByKey = async (key) => {
    const query = "SELECT id, room, keyp, name, role FROM users WHERE keyp = ?;";
    const [rows] = await database.execute(query, [key]);
    return rows.length > 0 ? mapUser(rows[0]) : null;
}

const banUser = async (bantime, id) => {
    const query = "UPDATE users SET ban = ? WHERE id = ?;";
    const [result] = await database.execute(query, [bantime, id]);
    if (result.affectedRows === 0) {
        throw new Error(`Failed to ban user ${id}.`);
    }
}

const isUserBanned = async (id) => {
    const query = "SELECT ban FROM users WHERE id = ?;";
    const [rows] = await database.execute(query, [id]);
    return rows.length > 0 ? rows[0].ban : null;
}

const verifyUser = async (body) => {
    const query = "SELECT id, room, keyp, name, role FROM users WHERE keyp = ? AND room = ? AND name = ?;";
    const [rows] = await database.execute(query, [body.key, body.room, body.name]);
    return rows.length > 0 ? mapUser(rows[0]) : null;
}

const login = async (body, req) => {
    const row = await verifyUser(body)

    if (row){
        row.username = row.name
        row.startTime = new Date().getTime()
        row.expiryTime = new Date().getTime() + 60 * 60 * 1000
        await session.createSession(row)
        return row.id
    }
    return false
}

const logout = async (id, req) => {
    req.cookies['session-id'] = null
    return session.deleteSession(id)
}

const getConnectedUser = async (id) => {
    const response = await session.findSession(id)
    return response
}

export default {
    findUsers,
    findUser,
    addUser,
    banUser,
    isUserBanned,
    deleteUser,
    modifyUser,
    verifyUser,
    login,
    logout,
    getConnectedUser,
    findUserByKey
};
