import React from "react";
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div class="navbar navbar-expand navbar-dark footer fixed-bottom bg-dark">
      <div class="container">

        <Link class="navbar-brand" to="/">
          &copy; CS3219 Group 1
        </Link>

        <div>
          <ul class="navbar-nav ml-auto">
            <li class='nav-item'>
              <Link class="nav-link" to="/">Help Center</Link>
            </li>
            <li class='nav-item'>
              <Link class="nav-link" to="/">Terms</Link>
            </li>
            <li class='nav-item'>
              <Link class="nav-link" to="/">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;