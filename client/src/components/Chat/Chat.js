import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    const ENDPOINT = 'localhost:5000'
    
    //for joining/leaving
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

    //handle messages
    useEffect(() => {
        //listen for message event
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        }, [messages]);
});
    //function for sending messages
    const sendMessage = (event) => {
        if(message){
            event.preventDefault();
            //if message submitted, sent to whole room and clear input field with callback
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }
    console.log(message, messages);

    return(
        <div className="outerContainer">
            <div className="container">
                <input value={message} onChange={(event) => setMessage(event.target.value)} 
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null} />
            </div>
        </div>
        );
};

export default Chat;