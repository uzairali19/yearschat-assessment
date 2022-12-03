const express = require('express');
const app = express();
const port = 3001;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', () => {
    console.log('Hello World!');
});

io.on('connection', (socket:any) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

http.listen(port, () => {
    console.log(`listening on ${port}`);
})