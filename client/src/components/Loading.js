import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import loading from '../assets/img/loading.gif';
import './Loading.css';

function Loading() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const roomId = location.state.roomId;

    socket.on('matched', ({ roomId }) => {
      history.push({ pathname: '/editor', state: { roomId: roomId } });
    })
  });

  return (
    <div class="container my-5 h-100 loading-container">
      <img src={loading} />
      <h3 class="loading-text">Waiting for another user at room:</h3>
      <p class="loading-room-id">[${location.state.roomId}]</p>
    </div>
  );
}

export default Loading;