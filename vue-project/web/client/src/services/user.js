import axios from "axios";

function addUser(user) {
  try {
    axios.post('/users', user)
    } catch (error) {
    return handleError(error)
  }
}

async function getUsers() {
  try {
    const response = await axios.get(`/users`)
    return response.data
  } catch (error) {
  return handleError(error)
}
}

async function getUser(id) {
  try {
    const response = await axios.get(`/users/${id}`)
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

const modifyUser = async (id, user) => {
    try {
      if (user.role === undefined) user.role = null;
        const response = await axios.get(`/users/${id}`)
      if (!response.data) {
        await addUser(user)
        return;
      }
      await axios.patch(`/users/${id}`, user)
    } catch (error) {
        return handleError(error)
    }
}

const deleteUser = async (id) => {
    try {
      await axios.delete(`/rooms/user/reservations/${id}`)
      await axios.patch(`/equipments/user/reservation/${id}`)
      await axios.post(`/users/${id}/logout`)
      await axios.delete(`/users/${id}`)
        return true
    } catch (error) {
        return handleError(error)
    }
}

const banUser = async (id, bantime) => {
    try {
      axios.put(`/users/${id}/ban/${bantime}`)
    } catch (error) {
      return handleError(error)
    }
}

async function verifyUser(key, room, name) {
  try {
    const response = await axios.get('/users/verify', { params: { key, room, name } })
    return response.data
    } catch (error) {
    return handleError(error)
  }
}

async function login(key, room, name) {
  try {
    const response = await axios.post('/users/login', { key, room, name })
    document.cookie = `session-id=${response.data}`
    return response.data
  } catch (error) {
    return handleError(error)
  }
}

async function getConnectedUser() {
  const id = document.cookie.split('=')[1]
  if (id === undefined || id === '' || id === null) {
    return null
  }
  const session = await axios.get(`/users/${id}/connected`)
  const user = await axios.get(`/users/${id}`)
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
    banUser,
    getConnectedUser,
    resetConnectedUser,
    modifyUser,
    deleteUser,
    getUser
  }
}
