import equipmentRepository from "../persistence/equipment-repository.js";
import userRepository from "../persistence/users-repository.js";

function validateFindEquipment(id) {
    return validateID(id)
}

function validateCreateEquipments(name,category) {
    return (
        validateEquipment(name) ??
        validateCategory(category)
    )
}
function validateModifyEquipments(equipTime) {
    return validateTime(equipTime)

}

function validateFindEquipmentReservation(id) {
    return validateID(id)
}
function validateFindUserEquipmentsReservation(id) {
    return validateID(id)
}

function validateDeleteUserEquipmentsReservation(id) {
    return validateID(id)
}

function validateUserNotBanned(id) {
    return (
        validateUserID(id) ??
        validateUserBanned(id)
    )
}

function validateDeleteEquipment(id) {
    return validateID(id)
}

function validateEquipment(name) {
    if (name === undefined) {
        return new Error('name is missing.')
    }

    if (typeof name !== 'string') {
        return new Error('name must be a string.')
    }

    name = name.trim()

    if (name === '') {
        return new Error('name must not be empty.')
    }

    if (name.length > 100) {
        return new Error('name must be no longer than 100 characters.')
    }

    return null
}

function validateUserBanned(id) {
    const banDate = userRepository.isUserBanned(id)
    if (banDate > new Date().getTime()) {
        return new Error('User is banned.')
    }
    return null
}

function validateCategory(category) {
    if (category === undefined) {
        return new Error('Category is missing.')
    }

    if (typeof category !== 'string') {
        return new Error('Category must be a string.')
    }

    category = category.trim()

    if (category === '') {
        return new Error('Category must not be empty.')
    }

    if (category.length > 100) {
        return new Error('Category must be no longer than 100 characters.')
    }

    return null
}

function validateTime(timed) {

    const time = timed + ':00'
    if (time === undefined) {
        return new Error('Time is missing.');
    }
    if (typeof time !== 'string') {
        return new Error('Time must be a string.')
    }

    const timePattern = /^\d{2}:\d{2}:\d{2}$/;
    if (!time.match(timePattern)) {
        return new Error('Time format is incorrect. Use HH:MM:SS.');

    }
    return null
}

async function validateUserID(id) {
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
    validateFindEquipment,
    validateCreateEquipments,
    validateDeleteEquipment,
    validateModifyEquipments,
    validateFindEquipmentReservation,
    validateFindUserEquipmentsReservation,
    validateDeleteUserEquipmentsReservation,
    validateUserNotBanned,
    validateUserID
}
