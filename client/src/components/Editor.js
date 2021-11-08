import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import Chat from "./Chat";
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

  const toggleChat = () => {
    if (document.getElementById("myChat").style.display == "block") {
      document.getElementById("myChat").style.display = "none";
    } else {
      document.getElementById("myChat").style.display = "block";
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
              <h2>
                Answer:
              </h2>
              <textarea class="form-control" id="textarea" rows="15"></textarea>
              <ul id="messages"></ul>
              <div class="col end-session">
                <button type="button" class="btn btn-primary chat-button" onClick={toggleChat}>Toggle chat</button>
                <button type="button" class="btn btn-danger end-session-button" onClick={endSession}>End session</button>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="chat-popup" id="myChat">
                <Chat />
              </div>
            </div>
          </div>
        </div>

        {/* <button class="open-button" onClick={openChat}>Chat</button>
        <div class="chat-popup" id="myChat">
          <form action="/action_page.php" class="form-container">
            <label for="msg"><b>Title</b></label>
            <p>text1</p>
            <p>text1</p>
            <p>text1</p>
            <textarea placeholder="Type message.." name="msg" required></textarea>

            <button type="submit" class="btn">Send</button>
            <button type="button" class="btn cancel" onClick={closeChat}>Close</button>
          </form>
        </div> */}
      </div>

    </div>

  );
}

export default Editor;

