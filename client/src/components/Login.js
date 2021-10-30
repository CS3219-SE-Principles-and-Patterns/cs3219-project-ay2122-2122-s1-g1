import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosService } from '../service/axiosService'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import "./Login.css";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    axiosService.post('auth/login', {
      username: username,
      password: password,
    }).then((response) => {
      dispatch(login());
      history.push('/dashboard');
    }, (error) => {
      console.log(error);
    });
  }


  return (
    <div className="Login main-login bg-dark">
      <div className="bg-dark my-5 h-100 flex-column">
        <h4>PeerPrep</h4>
        <br />

        <Form onSubmit={handleSubmitForm}>
          <Form.Group size="lg" controlId="username">
            <Form.Control
              autoFocus
              placeholder="Username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <br />
          <Form.Group size="lg" controlId="password">
            <Form.Control
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <button class="btn btn-primary my-4" block type="submit" disabled={!validateForm()}>
            Login
          </button>
        </Form>

        <br />

        <div class="sign-up-a">
          <a href="/register">Sign up</a>
        </div>
      </div>

    </div>
  );
}

export default Login;