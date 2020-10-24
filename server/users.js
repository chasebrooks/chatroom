const users = [];

const addUser = ({ id, name, room }) => {
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //find existing users with same name in the same room
    const existingUser = users.find((name) => user.room === user && user.name === name);

    if(existingUser){
        return{error: 'Username is taken'};
    };

    const user = { id, name, room };

    users.push(user);

    return { user }

};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id );
    if(index !== -1){
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room ) => users.filter((user) => user.room === room);



module.eports = { addUser, removeUser, getUser, getUsersInRoom};