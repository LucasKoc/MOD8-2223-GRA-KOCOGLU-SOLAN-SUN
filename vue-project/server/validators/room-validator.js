import userRepository from "../persistence/users-repository.js";
import roomRepository from "../persistence/room-repository.js";
function validateDeleteRoom(id)
{
    return validateID(id)
}



function validateFindRoom(id)
{
    return validateID(id)
}

function validateDeleteRoomReservation(id)
{
    return validateID(id)
}
function validateFindRoomReservation(id)
{
    return validateID(id)
}


function validateCreateRoom(name,description)
{
    return (
        validateRoom(name) ??
        validateDescription(description)

    )
}

function validateCreateRoomReservation(date,time)
{
    return (

        validateDate(date) ??
        validateTime(time)
    )
}
function validateFindUserRoomReservation(id){
    return validateID(id)
}
function validateDescription(description) {
    if (description === undefined) {
        return new Error('Description is missing.')
    }

    if (typeof description !== 'string') {
        return new Error('Description must be a string.')
    }

    description = description.trim()

    if (description === '') {
        return new Error('Description must not be empty.')
    }

    if (description.length > 100) {
        return new Error('Description must be no longer than 100 characters.')
    }

    return null
}

function validateRoom(room) {
    if (room === undefined) {
        return new Error('Room is missing.')
    }

    if (typeof room !== 'string') {
        return new Error('Room must be a string.')
    }

    room = room.trim()

    if (room === '') {
        return new Error('Room must not be empty.')
    }

    if (room.length > 100) {
        return new Error('Room must be no longer than 100 characters.')
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
async function validateRoomId(id) {
    const  idValidationError2= validateID(id);

    if (idValidationError2) {
        return idValidationError2;
    }

    try {
        const user = await roomRepository.findRoom(id);
        if (user === null) {
            return new Error('Room does not exist.');
        }

        return null;
    } catch (error) {

        return new Error('An error occurred while validating the Room ID.');
    }
}
function validateID(id) {
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
function validateDate(date) {
    if (date === undefined) {
        return new Error('Date is missing.');
    }

    if (typeof date !== 'string') {
    return new Error('Date must be a string.')
    }
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!date.match(datePattern)) {
        return new Error('Date format is incorrect. Use YYYY-MM-DD.');
    }
    const currentDate = new Date();
    const providedDate = new Date(`${date}T00:00:00Z`);


    if(providedDate< currentDate)
    {
        return new Error('You can only reserve for future.');
    }

    return null;
}

function validateTime(time) {
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



    const [hours, minutes, seconds] = time.split(':');
    if (
        isNaN(parseInt(hours)) || isNaN(parseInt(minutes)) || isNaN(parseInt(seconds)) ||
        parseInt(hours) < 0 || parseInt(hours) > 23 ||
        parseInt(minutes) < 0 || parseInt(minutes) > 59 ||
        parseInt(seconds) < 0 || parseInt(seconds) > 59
    ) {
        return new Error('Time is not valid.');
    }


    return null;
}








export default{
    validateDeleteRoom,
    validateDeleteRoomReservation,
    validateFindRoom,
    validateCreateRoom,
    validateFindRoomReservation,
    validateCreateRoomReservation,
    validateFindUserRoomReservation,
    validateUserID,
    validateRoomId

}