import axios from "axios";

let id = 1
const users = []

function addUser(user) {
  axios.post('/users', user)
}

async function getUsers() {
  const response = await axios.get(`/users`)
  return response.data
}

async function getUser(id) {
  const response = await axios.get(`/users/${id}`)
  return response.data
}

function modifyUser(id, user) {
  const response = axios.get(`/users/${id}`)
  if (!response.data) {
    axios.post('/users', user)
    return
  }
  axios.patch(`/users/${id}`, user)
}

async function verifyUser(key, room, name) {
  const response = await axios.get('/users/verify', { params: { key, room, name } })
  return response.data
}

async function login(key, room, name) {
  const response = await axios.post('/users/login', { key, room, name })
  console.log(response.data);
  document.cookie = `session-id=${response.data}`
  console.log(document.cookie)
  console.log(document.cookie.split('=')[1])
  return response.data
}

async function getConnectedUser() {
  const id = document.cookie.split('=')[1]
  console.log(id)
  if (id === undefined || id === '' || id === null) {
    return null
  }
  const session = await axios.get(`/users/${id}/connected`)
  const user = await axios.get(`/users/${id}`)
  console.log(session.data, user.data)
  return session.data ? user.data : null
}

function resetConnectedUser() {
  const id = document.cookie.split('=')[1]
  axios.post(`/users/${id}/logout`)
  document.cookie = `session-id=`
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
