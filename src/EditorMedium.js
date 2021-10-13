import React, { Component } from 'react';
class EditorMedium extends Component {
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
      </div>
    );
  }
}
export default EditorMedium;