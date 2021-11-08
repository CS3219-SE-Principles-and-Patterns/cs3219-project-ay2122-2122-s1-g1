import React, { PureComponent } from "react";
import './Message.css';

const isOwnMessage = (username) => {
  return sessionStorage.getItem('username') === username ? "is-own-message" : "";
};

class Message extends PureComponent {
  render() {
    return <div class={isOwnMessage(this.props.username)}>
      <strong class="primary-font">{this.props.username}</strong>
      <p>{this.props.message}</p>
    </div>;
  }
}

export default Message;