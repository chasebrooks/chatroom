const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', (socket) => {
     //join event specifed in client Chat.js
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id:socket.id, name, room });

        if(error){return callback(error)};
        
        socket.join(user.room);

    });
    
    socket.on('disconnect', () => {
        console.log('A user just disconnected');
    });
})

// call router as a middleware
app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
