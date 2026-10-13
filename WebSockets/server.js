const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: 'https://g44d853b39c3572-bpdrapex.adb.ca-montreal-1.oraclecloudapps.com',
        methods: ['GET','POST'],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('<h1>Hello from socket.io</h1>');
});

io.on('connection', (socket) => {

    console.log('A user is connected.');
    
    socket.on('new-req-normal', (msg) => {
       socket.broadcast.emit('new-req-normal', msg);
    });

    socket.on('new-req-high', (msg) => {
       socket.broadcast.emit('new-req-high', msg);
    });

    socket.on('disconnect', (reason) => {
        console.log('A user is disconnected.');
    });

});

server.listen(3000, '0.0.0.0', () => {
    console.log('listening on *:3000');
});