import React, { Component } from 'react';
class TextEdit extends Component {
  render() {
    return (
      <div>
        <h3>
          Here's the TextEdit component.
        </h3>
        <textarea
          rows="10" cols="50"
          placeholder="Write something here..."
          >
        </textarea>
        {/* <textarea class="form-control" id="textarea" rows="3"></textarea>
        <ul id="messages"></ul>
        <form id="form" class="form-inline" action="">
          <div class="form-group">
            <input type="text" class="form-control" id="input" value=""> </input>
          </div>
          <button type="submit" class="btn btn-primary">Send</button>
        </form> */}
      </div>
    );
  }
}

export default TextEdit;