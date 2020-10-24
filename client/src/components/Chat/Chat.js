import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000'
    
    useEffect(() => {
        //return query parameters in object 
        const { name, room } = queryString.parse(location.search);

        //connect socket to server endpoint
        socket = io(ENDPOINT)
        setName(name);
        setRoom(room);
        socket.emit('join', {name, room}, () => {

        });

        //when componenet is unmounted, emit disconnect and turn off client socket instance
        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [ENDPOINT, location.search]);
    return(
        <h1>chat</h1>
    );
};

export default Chat;