import React from "react";
import logo from '../assets/img/peerprep.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import './Home.css';

function Home() {
  return (
    <div class="jumbotron jumbotron-main bg-dark">
      <div class="container-md my-5 h-100 flex-column">
        <div class="container">
          <div class="row">
            <span class="span-filler-home">
            </span>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <img src={logo} class="peerprep-logo img-fluid"></img>
            </div>
            <div class="col-lg-1">
            </div>
            <div class="col-lg-5 home-description">
              <div class="jumbotron">
                <br />
                <br />
                
                <h1>A Novel Way To Learn</h1>
                <p class="lead">PeerPrep is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.</p>
                
                <br />

                <div class='register-btn-div'>
                  <button type="button" class="btn btn-info btn-lg rounded-pill" href="#">Register</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;