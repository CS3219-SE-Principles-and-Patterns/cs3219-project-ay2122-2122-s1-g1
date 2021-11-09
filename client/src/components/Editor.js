import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import { axiosService } from '../service/axiosService'
import Chat from "./Chat";
import './Editor.css';
import CollaborativeEditor from './CollaborativeEditor';

  // 1. need to be able to send the end answer back to be saved to DB
  // 2. need to be able to send the roomId to CollaborativeEditor

function Editor() {
  const [text, setText] = useState('');
  const timeStamp = 'no timestamp yet';
  // const textarea = document.getElementById('textarea');

  const history = useHistory();
  const location = useLocation();
  const question = location.state.question;
  const username = sessionStorage.getItem('username');

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

  const updateUsersQuestionDone = async (username, difficulty, number, answer) => {
    const expireTime = localStorage.getItem('expireTime')
    if (Date.now() >= expireTime) {
      await fetchToken();
    }

    const token = localStorage.getItem('accessToken')
    const data = {
      "userName": username,
      "difficulty": difficulty,
      "number": number,
      "answer": answer
    }
    console.log(token);
    console.log(data);
    fetch(`https://peerprep-330010.as.r.appspot.com/db-data/updateUser`, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-auth-token': token
      }),
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    // const textarea = document.getElementById('textarea');
    // textarea.addEventListener('keyup', function (e) {
    //   e.preventDefault();
    //   if (textarea.value) {
    //     const roomId = sessionStorage.getItem('roomId');
    //     socket.emit('editorUpdate', { roomId: roomId, message: textarea.value });
    //   }
    // });

    // socket.on('editorUpdate', (text) => {
    //   console.log(text);
    //   textarea.value = text;
    //   setText(text);
    // });

    socket.on('disconnectAll', () => {
      history.push('/dashboard');
    })
  });
  
  const endSession = () => {
    updateUsersQuestionDone(username, question.difficulty, question.questionNumber, "");
    socket.emit('endSession', { roomId: location.state.roomId });
  }

  const toggleChat = () => {
    if (document.getElementById("myChat").style.display == "none") {
      document.getElementById("myChat").style.display = "block";
    } else {
      document.getElementById("myChat").style.display = "none";
    }
  }

  return (
    <div class="main-editor bg-dark">
      <div className="editor bg-dark h-100 flex-column">
        <div class="container">
          <div class="row">
            <span class="span-filler-editor">
            </span>
          </div>

          <div class="row">
            <div class="col-lg-5">
              <h3>{question.questionNumber}. {question.questionName}</h3>
              <h6>{question.difficulty.toUpperCase()}</h6>
              <div class="my-4">
                <p>
                  {question.questionDescription}
                </p>
              </div>

              <div class="my-5">
                <p>Sample Input</p>
                <p class="code-text">{question.sampleInput}</p>
              </div>

              <div class="my-5">
                <p>Sample Output</p>
                <p class="code-text">{question.sampleOutput}</p>
              </div>


              <div class="my-5">
                <p>Sample Explanation</p>
                <p class="code-text">{question.sampleExplanation}</p>
              </div>
            </div>

            <div class="col-lg-7">
              <h3>
                Answer:
              </h3>
              <div id="myEditor">
                <CollaborativeEditor roomId={location.state.roomId}/>
              </div>
              
              {/* <textarea class="form-control" id="textarea" rows="15"></textarea>
              <ul id="messages"></ul> */}
              <div class="col end-session">
                <button type="button" class="btn btn-primary chat-button" onClick={toggleChat}>Toggle chat</button>
                <button type="button" class="btn btn-danger end-session-button" onClick={endSession}>End session</button>
              </div>
              
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="chat-popup" id="myChat">
                <Chat roomId={location.state.roomId} />
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  );
}

export default Editor;

