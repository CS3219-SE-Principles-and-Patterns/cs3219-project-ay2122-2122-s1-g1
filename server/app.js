var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const { v4: uuidv4 } = require('uuid');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
const { Server } = require('engine.io');

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
    console.log(data);
    io.to(data.roomId).emit('chatMessage', data.message);
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
          io.to(key).emit('matched', { roomId: key, connectedUser: 2});
        }
      }
    }

    if (!hasJoined) {
      console.log('creating new room...');
      roomId = difficulty.concat('-', uuidv4());
      client.join(roomId);
      console.log(`client [${client.id}] has created and joined room [${roomId}]`);
      hasJoined = true;
      io.to(roomId).emit('connected', { roomId: roomId, connectedUser: 1});
    }
  });

  client.on('endSession', ({ roomId }) => {
    io.to(roomId).emit('disconnectAll');
  })
})

// server.listen(app.get('port'));

const port = 8000; // 8000 for SocketIo
io.listen(port);
console.log('SocketIo - listening on port: ', port);


app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

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


module.exports = app;
