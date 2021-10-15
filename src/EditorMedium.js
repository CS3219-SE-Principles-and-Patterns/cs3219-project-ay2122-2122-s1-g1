
import React, { Component } from 'react';
import * as api from './api'
import TextEdit from './components/TextEdit.js';

class EditorMedium extends Component {
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
    this.setState({text})
  }, document.getElementById('textarea'));
  // api.chatMessage((err, text) => this.setState({
  //   text
  // }), document.getElementById('textarea'));
  api.subscribeToTimer((err, timestamp) => this.setState({
    timestamp
  }));
  // var textarea = document.getElementById('textarea');
  // textarea.value = this.state.text;
}
render() {
  return (
    <div className="editormedium">
      <div class="container">
        <div class="row align-items-center my-0">
          <div class="col-lg-6">
            <h2>
              Here's the QuestionContainer.
            </h2>
          </div>
          <div class="col-lg-6">
            <h2>
              Here's the TextEditContainer.
            </h2>
            <p>
              {/* Time: {this.state.timestamp ? new Date(this.state.timestamp).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
                timeZoneName: 'short'
              }) : "no date yet"} */}
              This is the timer value: {this.state.timestamp}
            </p>
            {/* <TextEdit
              text={this.state.text}
            /> */}
            <textarea class="form-control" id="textarea" rows="3"></textarea>
            <ul id="messages"></ul>
          </div>
          
        </div>
      </div>
    </div>
    
    );
  }
}
export default EditorMedium;

