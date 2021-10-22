import { socket } from '../service/socket';

export function chatMessage(callback, textarea) {
  textarea.addEventListener('keyup', function (e) {
    e.preventDefault();
    if (textarea.value) {
      const roomId = document.cookie.split('=')[1];
      socket.emit('chatMessage', { roomId: roomId, message: textarea.value });
    }
  });

  socket.on('chatMessage', (text) => {
    callback(null, text);
  });
}
