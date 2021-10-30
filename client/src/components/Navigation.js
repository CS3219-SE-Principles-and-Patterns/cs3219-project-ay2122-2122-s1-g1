import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../redux/actions';

function Navigation(props) {

  const history = useHistory();
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  const loggedInBar = (
    <ul class="navbar-nav ml-auto">
      <li class='nav-item'>
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class='nav-item'>
        <Link class="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li class='nav-item'>
        <Link class="nav-link" onClick={logOut}>Logout</Link>
      </li>
    </ul>
  );

  const loggedOutBar = (
    <ul class="navbar-nav ml-auto">
      <li class='nav-item'>
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class='nav-item'>
        <Link class="nav-link" to="/login">Login</Link>
      </li>
    </ul>
  );

  function logOut(event) {
    event.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
    history.push('/');
  }

  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark fixed-top">
        <div class="container">
          <Link class="navbar-brand" to="/">
            PeerPrep
          </Link>
          <div>
            {isLogged ? loggedInBar : loggedOutBar}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);