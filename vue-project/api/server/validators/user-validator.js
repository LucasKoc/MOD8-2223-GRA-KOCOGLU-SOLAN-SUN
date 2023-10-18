import userRepository from "../persistence/users-repository.js";

function validateUser(id) {
    return validateID(id)
}

function validateUserIdentity(id,code,name) {
    return (
        validateID(id) ??
        validateCode(code) ??
        validateName(name)
    )
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

function validateCode(code) {
    code = Number.parseInt(code)
    if (code === undefined) {
        return new Error('code is missing.')
    }
    try {
        if(!Number.isInteger(code)) {
            return new Error('code must be an integer .')
        }
    } catch (e) {
        return new Error('code must be an integer .')
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
    validateUserIdentity
}