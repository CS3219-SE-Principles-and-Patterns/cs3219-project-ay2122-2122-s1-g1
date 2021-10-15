import React from "react";
import { Link, withRouter } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div class="container">

          <Link class="navbar-brand" to="/">
            PeerPrep
          </Link>

          <div>
            <ul class="navbar-nav ml-auto">
              <li class='nav-item'>
                <Link class="nav-link" to="/">Home</Link>
              </li>
              <li class='nav-item'>
                <Link class="nav-link" to="/about">About</Link>
              </li>
              <li class='nav-item'>
                <Link class="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);