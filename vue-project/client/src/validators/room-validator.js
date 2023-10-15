const assertNotEmptyString = (value) => {
    if (!value || typeof value !== "string" || value.trim() === "") throw new Error("Value cannot be empty");
};

const assertNotNegativeInteger = (id) => {
    try {
        if (!Number.isInteger(parseInt(id)) || id < 0) throw new Error("ID should be a positive integer");
    } catch (error) {
        throw new Error("ID should be a positive integer");
    }
};

const assertNotPastDateTime = (date, time) => {
    const currentDate = new Date();
    const inputDate = new Date(`${date}T${time}:00`);

    if (inputDate < currentDate) throw new Error("Date and time cannot be in the past");
};

const addRoomValidator = (roomname, roomtype) => {
    assertNotEmptyString(roomname);
    assertNotEmptyString(roomtype);
};

const deleteRoomValidator = (id) => {
    assertNotNegativeInteger(id);
};

const getRoomValidator = (id) => {
    assertNotNegativeInteger(id);
};

const addReservationValidator = (roomId, date, time, userId) => {
    assertNotNegativeInteger(roomId);
    assertNotPastDateTime(date, time);
    assertNotNegativeInteger(userId);
};

export default {
    addRoomValidator,
    deleteRoomValidator,
    getRoomValidator,
    addReservationValidator,
};
