
import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { __DATA__ } from "./DashboardData";
import { axiosService } from '../service/axiosService'
import { useHistory } from 'react-router-dom';
import './Dashboard.css';

import { socket } from '../service/socket';
import { Doughnut } from 'react-chartjs-2';
import Box from '@material-ui/core/Box';

function useTrait(initialValue) {
  const [trait, updateTrait] = useState(initialValue);

  let current = trait;

  const get = () => current;

  const set = newValue => {
     current = newValue;
     updateTrait(newValue);
     return current;
  }

  return {
     get,
     set,
  }
}

function Dashboard() {
  const history = useHistory();
  var allQuestionsDone = useTrait(false);
  var currDifficulty = useTrait("");

  const fetchUsersAvailableQuestion = (difficulty) => {
    return new Promise(async (resolve, reject) => {
      const tempData = [];
      const expireTime = localStorage.getItem('expireTime')
      if (Date.now() >= expireTime) {
        await fetchToken();
      }

      const token = localStorage.getItem('accessToken')

      console.log(token);
      var res = await fetch(`https://peerprep-330010.as.r.appspot.com/db-data/user/${difficulty}`, {
        method: "get",
        headers: new Headers({
          'x-auth-token': token
        })
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("Res: " + res);
          resolve(res.data);
        })
        .catch((err) => {
          console.error(err)
          reject(err);
        })
    })
  }

  const createRoom = async (difficulty) => {
    // socket.on('disconnect', console.log('disconnected'))
    currDifficulty.set(difficulty);

    // getting list of questions that the user has not done based on difficulty, change the argument passed here
    var listOfQuestions = await fetchUsersAvailableQuestion(difficulty).then(questions => {
      for (var index in questions) {
        console.log(questions[index]);
      }

      if (questions.length > 0) {
        allQuestionsDone.set(false);
        socket.emit('join', { difficulty: difficulty, questions: questions });
      } else {
        // can add popup?
        allQuestionsDone.set(true);
        console.log("all questions done, please try another difficulty")
      }
      
    });

    socket.on('connected', ({ roomId, connectedUser }) => {
      sessionStorage.setItem('roomId', roomId);
      // sessionStorage.setItem('chatRoomId', chatRoomId);
      if (connectedUser == 1) {
        history.push({ pathname: '/loading', state: { roomId: roomId } });
      }
    });

    socket.on('matched', ({ roomId, connectedUser, question }) => {
      sessionStorage.setItem('roomId', roomId);
      // sessionStorage.setItem('chatRoomId', chatRoomId);
      if (connectedUser == 2) {
        history.push({ pathname: '/editor', state: { roomId: roomId, question: question } });
      }
    });
  }


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

  const [userData, setUserData] = useState([]);

  const fetchData = async () => {
    const tempData = [];
    const expireTime = localStorage.getItem('expireTime')
    console.log(Date.now());
    console.log(expireTime);
    if (Date.now() >= expireTime) {
      console.log("AAA");
      await fetchToken();
    }

    const token = localStorage.getItem('accessToken')

    console.log(token);
    fetch(`https://peerprep-330010.as.r.appspot.com/db-data/user`, {
      method: "get",
      headers: new Headers({
        'x-auth-token': token
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        tempData[0] = res.data.easyQuestionsDone.length;
        tempData[1] = res.data.mediumQuestionsDone.length;
        tempData[2] = res.data.hardQuestionsDone.length;

        setUserData(tempData);

      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    fetchData();
  }, []);

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
                  //callback={fetchData()}
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

              <button class="btn btn-lg btn-easy btn-success rounded-pill" size="lg" onClick={() => createRoom('easy')}>
                Easy
              </button>

              <button class="btn btn-lg btn-medium btn-warning rounded-pill" size="lg" onClick={() => createRoom('medium')}>
                Medium
              </button>

              <button class="btn btn-lg btn-hard btn-danger rounded-pill" size="lg" onClick={() => createRoom('hard')}>
                Hard
              </button>
              { allQuestionsDone.get() === true && <p style={{color: "#fd5e53"}}>All {currDifficulty.get()} questions done</p>} 
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;