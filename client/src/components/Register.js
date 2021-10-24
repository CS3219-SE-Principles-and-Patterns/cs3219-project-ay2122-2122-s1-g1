import "./Register.css";

import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import { axiosService } from '../service/axiosService'
import { useHistory } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
    
  function handleSubmitForm(event) {
    event.preventDefault();
    console.log("Register clicked")

    axiosService.post('auth/signup', {
      username: email,
      password: password,
      isAdmin: false
    }).then((response) => {
      console.log(response);
      history.push('/dashboard')
    
    }, (error) => {
      console.log(error);
    });
  }
  const history = useHistory();

  return (
    <div className="Register main-login bg-dark">
      <div className="bg-dark my-5 h-100 flex-column">
        <h4>PeerPrep</h4>
        <br />

        <Form onSubmit={handleSubmitForm}>
          <Form.Group size="lg" controlId="email">
            <Form.Control
              autoFocus
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
        </Form>

        <br />

        <div class="login-a">
          Have an account? <a href="/login">Sign in</a>
        </div>
      </div>

    </div>
  );
}

export default Register;