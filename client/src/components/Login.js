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
    <div className="Login jumbotron jumbotron-main bg-dark">
        <div className="bg-dark my-5 h-100 flex-column">
            <Form onSubmit={handleSubmitForm}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    placeholder = "Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    placeholder = "Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button block type="submit" disabled={!validateForm()} onClick={() => history.push('/dashboard')}>
                Login
                </Button>
            </Form>
        </div>
        
    </div>
    );
}

export default Login;