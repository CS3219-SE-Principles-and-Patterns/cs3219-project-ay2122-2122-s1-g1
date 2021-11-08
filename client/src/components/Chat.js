import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { socket } from '../service/socket';
import './Chat.css';

function Chat() {
  return (
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="panel panel-primary">
            <div class="panel-heading">
              <div class="btn-group pull-right">
                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-chevron-down"></span>
                </button>
              </div>
            </div>
            <div class="panel-body">
              <ul class="chat">
                <li class="left clearfix">
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Jack Sparrow</strong>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                      dolor, quis ullamcorper ligula sodales.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="pull-right primary-font">Bhaumik Patel</strong>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                      dolor, quis ullamcorper ligula sodales.
                    </p>
                  </div>
                </li>
                <li class="left clearfix">
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="primary-font">Jack Sparrow</strong>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                      dolor, quis ullamcorper ligula sodales.
                    </p>
                  </div>
                </li>
                <li class="right clearfix">
                  <div class="chat-body clearfix">
                    <div class="header">
                      <strong class="pull-right primary-font">Bhaumik Patel</strong>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                      dolor, quis ullamcorper ligula sodales.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="panel-footer">
              <div class="input-group">
                <input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here..." />
                <span class="input-group-btn">
                  <button class="btn btn-warning" id="btn-chat">
                    Send</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

