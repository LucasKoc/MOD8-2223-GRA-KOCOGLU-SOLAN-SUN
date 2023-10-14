function validateDeleteRoom(id)
{
    return validateID(id)
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

export default{
    validateDeleteRoom,
    validateID
}