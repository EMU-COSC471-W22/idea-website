import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Login() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [name]: value}));
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        axios.post("http://localhost:3001/auth/login", { email: inputs.email, password: inputs.password}).then((response) => {
            // navigate('/');
            console.log(response.data);
        });
    }

    return(
        <div className='border container mt-5' >
            <h2 className='mt-4'>Log In</h2>
            <Form.Group as={Row} className="mb-3">
                <Form.Label style={{marginTop: 0}} column sm={2}>Email</Form.Label>
                <Col sm={10}>
                    <Form.Control 
                        required
                        type="email"
                        name="email"
                        value={inputs.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Form.Label style={{marginTop: 0}} column sm={2}>Password</Form.Label>
                <Col sm={10}>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        value={inputs.password}
                        placeholder="Enter your password"
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">Please enter a valid password</Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Button className="mb-3 row justfify-content-center" onClick={handleSubmit}>Log In</Button>
        </div>
    );
}

export default Login;