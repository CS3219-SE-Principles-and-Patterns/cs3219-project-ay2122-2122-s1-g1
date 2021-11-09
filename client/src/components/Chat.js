import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import Message from "./Message";
import './Chat.css';

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const username = sessionStorage.getItem('username');

  useEffect(() => {
    const addMessage = ({ username, message }) => {
      setMessages([...messages, { username, message }]);
      const panel = document.getElementById("panel-body");
      panel.scrollTop = panel.scrollHeight;
    }

    socket.on('receiveMessage', addMessage);

    return () => {
      socket.off("receiveMessage", addMessage);
    };
  });


  const sendMessage = () => {
    const message = document.getElementById('message-input').value;
    document.getElementById('message-input').value = '';
    socket.emit('sendMessage', { roomId: props.roomId, message: message, username: username });
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  }

  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <div class="btn-group pull-right">
                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </button>
              </div>
            </div>
            <div class="panel-body" id="panel-body">
              <ul class="chat">
                {messages.map(({ username, message }) => (
                  <Message message={message} username={username} />
                ))}
              </ul>
            </div>
            <div class="panel-footer">
              <div>
                <input id="message-input" type="text" class="form-control" placeholder="Type your message here..." onKeyDown={handleKeyDown} />
                {/* <span class="input-group-btn">
                  <button type="submit" class="btn btn-warning" id="btn-chat" onClick={sendMessage}>Send</button>
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

