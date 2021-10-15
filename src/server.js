var express = require('express'),
    app = express(), 
    server = require('http').createServer(app),
    path = require('path');
server.listen(3000);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});

// why cannot
app.get('/', (req, res) => {
  console.log("A");
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (client) => {
  //here can start emitting events to the client
  // client.on('chatMessage', (interval, msg) => {
  //   console.log('client is subscribing to text with interval ', interval);
  //   setInterval(() => {
  //     client.emit('chatMessage', msg);
  //   }, interval);
  // });
  client.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit( 'timer', new Date() );
    }, interval);
  });

  //here can start emitting events to the client
  // client.on('chatMessage', (interval) => {
  //   console.log('client is subscribing to test with interval ', interval);
  //   setInterval(() => {
  //     client.emit( 'message', "aa" );
  //   }, interval);
  // });
})

const port = 8000;
io.listen(port);
console.log('server.js - listening on port: ', port);