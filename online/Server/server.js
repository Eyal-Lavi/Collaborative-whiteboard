const express = require('express');
const body_parser = require('body-parser');
const { count } = require('console');
const UserConnection = require('./lib/userConnection');
const port =8080;
const app = express(body_parser.json());

const http = require('http').createServer(app);

const socketOptions = {
    cors: {
        origin: "*",
        allowedHeaders: "*",
        methods: ["GET", "POST"]
      }
};

const io = require('socket.io')(http,socketOptions);

io.on('connection',(socket)=>{
    console.log('User connection');
    const userConnection = new UserConnection(socket);
    socket.on('join',(dataJoin)=>{
        
        userConnection.join(dataJoin);

        ['create','move','color', 'textValue', 'dis', 'resize','disconnect','dis'].forEach(eventName => socket.on(eventName, userConnection[eventName]));
    });
});

http.listen(port,()=>{
    console.log(`http listen on port ${port}`);
})


