let id = 1
const users = []

function addUser (user) {
  user.id = id++
  users.push(user)
}

function getUsers () {
  return users
}

function getUser (id) {
  return users.find(user => user.id === id)
}

export default function userData() {
    return {
        addUser,
        getUsers,
        getUser
    }
}