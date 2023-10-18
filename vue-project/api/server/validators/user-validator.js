import userRepository from "../persistence/users-repository.js";

function validateUser(id) {
    return validateID(id)
}

function validateUserIdentity(id,code,name) {
    return (
        validateRoom(id) ??
        validateCode(code) ??
        validateName(name)
    )
}
function validateDeleteUser(id) {
    return validateID(id)
}

function validateModifyUser(id, name, code) {
    return (
        validateID(id)??
        validateName(name)??
        validateCode(code)
    )
}

function validateBanTime(BanTime) {
    BanTime = Number.parseInt(BanTime)
    if (BanTime === undefined) {
        return new Error('BanTime is missing.')
    }
    try {
        if(!Number.isInteger(BanTime)) {
            return new Error('BanTime must be an integer .')
        }
    } catch (e) {
        return new Error('BanTime must be an integer .')
    }
    return null
}

function validateUserLogin(roomNumber,code,name) {
    return (
        validateRoomNumber(roomNumber) ??
        validateCode(code) ??
        validateName(name)
    )
}

function validateRoom(id) {
    id = Number.parseInt(id)
    if (id === undefined) {
        return new Error('Room is missing.')
    }
    try {
        if(!Number.isInteger(id)) {
            return new Error('Room must be an integer .')
        }
    } catch (e) {
        return new Error('Room must be an integer .')
    }
    return null
}
function validateUserLogout(userId) {
    return validateID(userId)
}

function validateRoomNumber(roomNumber) {
    roomNumber = Number.parseInt(roomNumber)
    if (roomNumber === undefined) {
        return new Error('RoomNumber is missing.')
    }
    try {
        if(!Number.isInteger(roomNumber)) {
            return new Error('RoomNumber must be an integer .')
        }
    } catch (e) {
        return new Error('RoomNumber must be an integer .')
    }
    return null
}
function validateName(name) {
    if (name === undefined) {
        return new Error('Name is missing.')
    }

    if (typeof name !== 'string') {
        return new Error('Name must be a string.')
    }

    name = name.trim()

    if (name === '') {
        return new Error('Name must not be empty.')
    }

    if (name.length > 100) {
        return new Error('Name must be no longer than 100 characters.')
    }

    return null
}


async function validateBannedID(id) {
    parseInt(id)
    const  idValidationError= validateID(id);

    if (idValidationError) {
        return idValidationError;
    }

    try {
        const user = await userRepository.findUser(id);
        if (user === null) {
            return new Error('User does not exist.');
        }

        return null;
    } catch (error) {

        return new Error('An error occurred while validating the user ID.');
    }
}

function validateKey(key) {
    key = Number.parseInt(key)
    if (key === undefined) {
        return new Error('Id is missing.')
    }
    try {
        if(!Number.isInteger(key)) {
            return new Error('Key must be an integer .')
        }
    } catch (e) {
        return new Error('Key must be an integer .')
    }
    return null

}

function validateUserConnection(userId) {
    return validateID(userId)
}
function validateCode(code) {
    console.log(code)
    code = Number.parseInt(code)
    if (code === undefined) {
        return new Error('key is missing.')
    }
    try {
        console.log(code)
        if(!Number.isInteger(code)) {
            return new Error('key must be an integer .')
        }
    } catch (e) {
        return new Error('key must be an integer 2 .')
    }
    return null
}
function validateID(id) {
    id = Number.parseInt(id)
    if (id === undefined) {
        return new Error('Id is missing.')
    }
    try {
        if(!Number.isInteger(id)) {
            return new Error('Id must be an integer .')
        }
    } catch (e) {
        return new Error('Id must be an integer .')
    }
    return null
}
export default {
    validateUser,
    validateUserIdentity,
    validateDeleteUser,
    validateModifyUser,
    validateBannedID,
    validateKey,
    validateBanTime,
    validateUserLogin,
    validateUserLogout,
    validateUserConnection
}