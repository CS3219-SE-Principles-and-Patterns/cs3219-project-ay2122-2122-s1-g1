import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmitForm(event) {
    event.preventDefault();
  }
  const history = useHistory();

  return (
    <div className="Login main-login bg-dark">
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
          
          <button class="btn btn-primary my-4" block type="submit" disabled={!validateForm()} onClick={() => history.push('/dashboard')}>
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