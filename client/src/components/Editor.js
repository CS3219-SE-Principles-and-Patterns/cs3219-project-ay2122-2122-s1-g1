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



  useEffect(() => {
    const loopUpdate = (text, roomId) => {
      setTimeout(function () {
        socket.emit('chatMessage', { roomId: roomId, message: text });
        loopUpdate();
      }, 2000);
    }

    const textarea = document.getElementById('textarea');
    const text = textarea.value ? textarea.value : '';
    const roomId = sessionStorage.getItem('roomId');
    loopUpdate(text, roomId);
    // textarea.addEventListener('keyup', function (e) {
    //   e.preventDefault();
    //   if (textarea.value) {
    //     const roomId = sessionStorage.getItem('roomId');
    //     socket.emit('chatMessage', { roomId: roomId, message: textarea.value });
    //   }
    // });

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
              <h3>1. Two Sum</h3>
              <h6>Easy</h6>
              <div class="my-4">
                <p>
                  Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                  You may assume that each input would have exactly one solution, and you may not use the same element twice.
                  You can return the answer in any order.
                </p>
              </div>

              <div class="my-4">
                <p>Input: nums = [2,7,11,15], target = 9</p>
                <p>Output: [0,1]</p>
                <p>Output: Because nums[0] + nums[1] == 9, we return [0, 1]</p>
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

