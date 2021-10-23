import React, { useEffect } from 'react';
import './Loading.css';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";

import * as api from '../api';
import { socket } from '../service/socket';

function Loading() {
  const history = useHistory();

  useEffect(() => {
    const roomId = location.state.roomId;

    socket.on('matched', ({ roomId, connectedUser }) => {
      let path = `/editor`;
      history.push(path);

      // let path = `/editor`;
      // history.push(path);
    })
  });

  const location = useLocation();
  console.log(location.state);

  return (
    <div class="container my-5 h-100">
      <p class="loading-text">Waiting at room [${location.state.roomId}]...</p>
    </div>
  );
}

export default Loading;