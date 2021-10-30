
import React, { useState } from "react";
// import styled from "styled-components";
// import { __DATA__ } from "./DashboardData";
import { axiosService } from '../service/axiosService'
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

import { socket } from '../service/socket';
import { Doughnut } from 'react-chartjs-2';
import Box from '@material-ui/core/Box';

function Dashboard() {
  const history = useHistory();

  const createRoom = () => {
    socket.emit('join', 'EASY');

    // socket.on('disconnect', console.log('disconnected'))

    socket.on('connected', ({ roomId, connectedUser }) => {
      // document.cookie = `roomId=${roomId}`;
      sessionStorage.setItem('roomId', roomId);
      console.log(`no of connected users: ${connectedUser}`);

      if (connectedUser == 1) {
        history.push({ pathname: '/loading', state: { roomId: roomId } });
      }
    });

    socket.on('matched', ({ roomId, connectedUser }) => {
      sessionStorage.setItem('roomId', roomId);
      if (connectedUser == 2) {
        history.push({ pathname: '/editor', state: { roomId: roomId } });
      }
    });
  }

  const userData = [0,0,0];

  const fetchToken = async () => {
    return new Promise(async (resolve, reject) => {
        const refreshToken = localStorage.getItem('refreshToken')
        await axiosService.post('auth/refresh_token', {
            refreshToken: refreshToken,
          }).then((response) => {
            console.log(response);
            resolve(response);
          }, (error) => {
            console.log(error);
            reject(error);
          });
      })
  }
  
  const fetchData = async () => {
    
    const expireTime = localStorage.getItem('expireTime')
    console.log(Date.now());
    console.log(Date.now());
    console.log(expireTime);
    if (Date.now() >= expireTime) {
      console.log("AAA");
      await fetchToken();
    }

    const token = localStorage.getItem('accessToken')

    console.log(token);
    fetch(`http://localhost:8080/db-data/user`, {
      method: "get",
      headers: new Headers({
        'x-auth-token': token
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        userData[0] = res.data.easyQuestionsDone.length;
        userData[1] = res.data.mediumQuestionsDone.length;
        userData[2] = res.data.hardQuestionsDone.length;
        console.log(userData);
      })
        .catch((err) => console.error(err))
  }

  const data = {
    labels: [
      'Easy',
      'Medium',
      'Hard'
    ],
    datasets: [{
      label: 'Number Of Questions Done',
      data: userData,
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };

  return (
    <div class="main-dashboard bg-dark">
      <div className="dashboard my-5 h-100 flex-column">
        <div class="container">
          <div class="row">
            <span class="span-filler-dashboard">
            </span>
          </div>
          <div class="row align-items-center">
            <div class="col-lg-1"></div>
            <div class="col-lg-4 dashboard-visuals">
              <Box 
              borderRadius="10"
              >
                <Doughnut
                  callback={fetchData()}
                  data={data}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: '#F2F2F2'
                        }
                      }
                    },
                    layout: {
                      padding: 5
                    }
                  }}
                />
              </Box>
            </div>
            <div class="col-lg-1"></div>

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