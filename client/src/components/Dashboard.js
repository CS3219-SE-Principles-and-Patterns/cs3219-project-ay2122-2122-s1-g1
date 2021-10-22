
import React, { useState } from "react";
// import styled from "styled-components";
// import { __DATA__ } from "./DashboardData";
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

import { socket } from '../service/socket';
import { rooms } from '../service/rooms';

function Dashboard() {
  const history = useHistory();

  const createRoom = () => {
    socket.emit('join', 'EASY');

    // socket.on('disconnect', console.log('disconnected'))

    socket.on('connected', (roomId) => {
      document.cookie = `roomId=${roomId}`;
      let path = `/editor`;
      history.push(path);
    })
  }

  return (
    <div class="jumbotron jumbotron-main bg-dark">
      <div className="dashboard my-5 h-100 flex-column">
        <div class="container">

          <div class="row">
            <span class="span-filler-dashboard">
            </span>
          </div>
          <div class="row align-items-center my-5">
            <div class="col-lg-7 dashboard-visuals">
              <p>Dashboard Visuals</p>
            </div>

            <div class="col-lg-5 dashboard-description">
              <h1 class="font-weight-light">Join a new session!</h1>
              <h4>Choose question difficulty</h4>

              <br />

              <button class="btn btn-lg btn-easy btn-success rounded-pill" size="lg" onClick={createRoom}>
                Easy
              </button>

              {/* <button class="btn btn-lg btn-medium btn-warning rounded-pill" size="lg" onClick={() => history.push('/editor')}>
                Medium
              </button>
              
              <button class="btn btn-lg btn-hard btn-danger rounded-pill" size="lg" onClick={() => history.push('/editor')}>
                Hard
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;