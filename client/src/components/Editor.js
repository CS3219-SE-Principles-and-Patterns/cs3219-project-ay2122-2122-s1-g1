import React, { Component } from 'react';
import './Editor.css';
import * as api from '../api';

class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timestamp: 'no timestamp yet',
      text: 'a',
      textarea: document.getElementById('textarea'),
    };
  }

  componentDidMount() {
    api.chatMessage((err, text) => {
      var textarea = document.getElementById('textarea');
      textarea.value = text;
      console.log("A " + text);
      this.setState({ text });
    }, document.getElementById('textarea'));
  }

  render() {
    return (
      <div class="jumbotron jumbotron-main bg-dark">
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
                <p>This is the timer value: {this.state.timestamp}</p>
                <textarea class="form-control" id="textarea" rows="15"></textarea>
                <ul id="messages"></ul>
              </div>

            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default Editor;

