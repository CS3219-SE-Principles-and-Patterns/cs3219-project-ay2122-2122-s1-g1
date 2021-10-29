require('dotenv').config();
require("../config/db");

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const { v4: uuidv4 } = require('uuid');

// Routes
let authRoutes = require("./routes/auth-routes")
var usersRouter = require('./routes/users');
var dbRouter = require("./routes/db-data");

var app = express();

// Socket.io
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (client) => {
  console.log(`client [${client.id}] connected`);

  client.on('chatMessage', (data) => {
    io.to(data.roomId).emit('chatMessage', data.message);
    // console.log(`emitting to room [${data.roomId} with message: ${data.message}]`)
  });

  client.on('join', (difficulty) => {
    var hasJoined = false;
    if (io.sockets.adapter.rooms != null) {
      const rooms = io.sockets.adapter.rooms;

      // iterate current rooms and join if possible
      for (const [key, value] of rooms.entries()) {
        if (key.includes(difficulty.concat('-')) && value.size < 2) {
          client.join(key);
          console.log(`client [${client.id}] has joined existing room [${key}]`);
          hasJoined = true;
          io.to(key).emit('matched', { roomId: key, connectedUser: 2 });
        }
      }
    }

    if (!hasJoined) {
      console.log('creating new room...');
      roomId = difficulty.concat('-', uuidv4());
      client.join(roomId);
      console.log(`client [${client.id}] has created and joined room [${roomId}]`);
      hasJoined = true;
      io.to(roomId).emit('connected', { roomId: roomId, connectedUser: 1 });
    }
  });

  client.on('endSession', ({ roomId }) => {
    io.to(roomId).emit('disconnectAll');
  })
})

// server.listen(app.get('port'));

const socketIoPort = 8000; // 8000 for SocketIo
io.listen(socketIoPort);
console.log('SocketIo - listening on port: ', socketIoPort);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token');
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes)
app.use('/users', usersRouter);
app.use("/db-data", dbRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 8080;

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running PeerPrep on port " + port);
});

module.exports = app;
