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

var rooms = {}

/*
  {
    'roomId': {
      'messages': []
      'users': 2
    }
  }
*/
var roomIdToQuestions = {}

io.on('connection', (client) => {
  console.log(`client [${client.id}] connected`);

  client.on('editorUpdate', (data) => {
    io.to(data.roomId).emit('editorUpdate', data.message);
  });

  client.on('join', ({ difficulty, questions }) => {
    var hasJoined = false;
    if (rooms) {
      // iterate current rooms and join if possible
      for (const [key, value] of Object.entries(rooms)) {
        if (key.includes(difficulty.concat('-')) && value['users'] < 2) {
          client.join(key);
          rooms[key]['users'] = 2;
          console.log(`client [${client.id}] has joined existing room [${key}]`);

          // const chatRoomId = rooms[key]['chatRoomId'];
          // client.join(chatRoomId);
          // console.log(`client [${client.id}] has joined existing room's chat room [${rooms[key]['chatRoomId']}]`);

          hasJoined = true;

          // choose a question available in room roomId
          const availableQuestions = roomIdToQuestions[key];
          const filteredQuestions = availableQuestions.filter(q => { return questions.map(p => p._id).includes(q._id); });
          const chosenQuestion = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

          // if (!filteredQuestions) {
          //   redirect
          // }

          io.to(key).emit('matched', { roomId: key, connectedUser: 2, question: chosenQuestion });
        }
      }
    }

    if (!hasJoined) {
      console.log('creating new room...');

      const roomId = difficulty.concat('-', uuidv4());
      client.join(roomId);
      rooms[roomId] = {};
      rooms[roomId]['users'] = 1;
      rooms[roomId]['messages'] = [];
      console.log(`client [${client.id}] has created and joined room [${roomId}]`);

      // const chatRoomId = difficulty.concat('-', uuidv4());
      // client.join(chatRoomId);
      // rooms[roomId]['chatRoomId'] = chatRoomId;
      // console.log(`client [${client.id}] has created and joined chat room [${chatRoomId}]`);

      console.log(rooms);

      hasJoined = true;
      roomIdToQuestions[roomId] = questions;
      io.to(roomId).emit('connected', { roomId: roomId, connectedUser: 1 });
    }
  });

  client.on('sendMessage', ({ roomId, message, username }) => {
    rooms[roomId]['messages'].push({ username, message });
    console.log('Received message:' + message);
    io.to(roomId).emit('receiveMessage', { username, message });
  })

  client.on('endSession', ({ roomId }) => {
    // remove room maintained
    delete rooms[roomId];
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
