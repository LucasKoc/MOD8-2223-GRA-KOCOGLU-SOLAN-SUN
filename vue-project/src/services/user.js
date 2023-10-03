let id = 1
const users = []

function addUser (user) {
    user.id = id++;
    users.push(user);
}

function getUsers () {
    return users;
}

function getUser (id) {
    return users.find(user => user.id === id);
}

function modifyUser (id, user) {
    if (!id){
        addUser(user);
        return;
    }
    const index = users.findIndex(user => user.id === id);
    users[index] = user;
}

addUser({room: 202, key: "1234", name: "John"});
addUser({room: 206, key: "8627", name: "John2"});
addUser({room: 195, key: "1268", name: "John3"});

export default function userData() {
    return {
        addUser,
        getUsers,
        modifyUser,
        getUser
    }
}