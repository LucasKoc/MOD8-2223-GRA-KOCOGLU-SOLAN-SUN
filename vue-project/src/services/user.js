let id = 1
const users = []
let connectedUser = false

function addUser(user) {
  user.id = id++
  users.push(user)
}

function getUsers() {
  return users
}

function getUser(id) {
  return users.find((user) => user.id === id)
}

function modifyUser(id, user) {
  if (!id) {
    addUser(user)
    return
  }
  const index = users.findIndex((user) => user.id === id)
  users[index] = user
}

function verifyUser(key, room, name) {
  const index = users.findIndex((user) => user.key === key)

  if (index >= 0 && users[index].room == room && users[index].name == name) {
    return true
  }

  return false
}

function login(key, room, name) {
  if (verifyUser(key, room, name)) {
    connectedUser = users.filter((user) => user.key === key)[0]
    return true
  }
  return false
}

function getConnectedUser() {
  if (connectedUser) {
    return connectedUser
  }
  return false
}

function resetConnectedUser() {
  if (connectedUser) {
    connectedUser = false
  }
}

addUser({ room: 202, key: '1234', name: 'John' })
addUser({ room: 0, key: '0', name: '0', role: 'admin' })
addUser({ room: 206, key: '8627', name: 'John2' })
addUser({ room: 195, key: '1268', name: 'John3' })

export default function userData() {
  return {
    addUser,
    getUsers,
    login,
    getConnectedUser,
    resetConnectedUser,
    modifyUser,
    getUser
  }
}
