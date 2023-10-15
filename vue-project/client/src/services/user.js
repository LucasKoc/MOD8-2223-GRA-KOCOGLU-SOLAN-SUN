import axios from "axios";

let id = 1
const users = []
let connectedUser = false


function addUser(user) {
  axios.post('/users', user)
}

function getUsers() {
  return axios.get('/users')
}

function getUser(id) {
  return axios.get(`/users/${id}`)
}

function modifyUser(id, user) {
  if (!axios.get(`/users/${id}`)) {
    axios.post('/users', user)
    return
  }
  axios.patch(`/users/${id}`, user)
}

function verifyUser(key, room, name) {
  return axios.get('/users/verify', { params: { key, room, name } })
}

function login(key, room, name) {
  return axios.post('/users/login', { key, room, name })
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

export default function userData() {
  return {
    addUser,
    getUsers,
    verifyUser,
    login,
    getConnectedUser,
    resetConnectedUser,
    modifyUser,
    getUser
  }
}
