const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('A new user connected');
    
    socket.on('disconnect', () => {
        console.log('A user just disconnected');
    });
})

// call router as a middleware
app.use(router)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
