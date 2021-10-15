import { io } from 'socket.io-client';
const socket = io('http://localhost:8000/');

// export function subscribeToTimer(callback) {
//   socket.on('timer', timestamp => callback(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }

export function chatMessage(callback, textarea) {
  textarea.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (textarea.value) {
      socket.emit('chatMessage', textarea.value);
    }
  });

  socket.on('chatMessage', function (text) {
    callback(null, text);
  });
}