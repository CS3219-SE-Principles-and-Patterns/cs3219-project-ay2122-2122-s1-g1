import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import './Editor.css';

function Editor() {
  const [text, setText] = useState('');
  const timeStamp = 'no timestamp yet';
  const textarea = document.getElementById('textarea');

  const history = useHistory();
  const location = useLocation();
  const question = location.state.question;

  useEffect(() => {
    const textarea = document.getElementById('textarea');
    textarea.addEventListener('keyup', function (e) {
      e.preventDefault();
      if (textarea.value) {
        const roomId = sessionStorage.getItem('roomId');
        socket.emit('chatMessage', { roomId: roomId, message: textarea.value });
      }
    });

    socket.on('chatMessage', (text) => {
      textarea.value = text;
      setText(text);
    });

    socket.on('disconnectAll', () => {
      history.push('/dashboard');
    })
  });

  const endSession = () => {
    socket.emit('endSession', { roomId: location.state.roomId });
  }

  return (
    <div class="main-editor bg-dark">
      <div className="editor bg-dark my-5 h-100 flex-column">
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
              <h2>
                Answer:
              </h2>
              <textarea class="form-control" id="textarea" rows="15"></textarea>
              <ul id="messages"></ul>
            </div>
          </div>

          <div class="row">
            <div class="col end-session">
              <button type="button" class="btn btn-danger end-session-button" onClick={endSession}>End session</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Editor;

