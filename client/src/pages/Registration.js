import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Registration() {

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

        axios.post("http://localhost:3001/auth", {
            newFirstName: inputs.fName, 
            newLastName: inputs.lName, 
            newUsername: inputs.username, 
            newEmail: inputs.email, 
            newPassword: inputs.password}).then((response) => {
                navigate('/');
            });
    }

    return (
        <div className='border container mt-5 ml-3' >
            <h2 className='mt-4' >Registration</h2>
            <Form noValidate validated={validated}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label   column sm={2}>First Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            name="fName"
                            value={inputs.fName}
                            placeholder="First name"
                            onChange={handleChange}
                            className="mb-1"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please enter your first name</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Last Name</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required
                            type="text"
                            name="lName"
                            value={inputs.lName}
                            placeholder="Last name"
                            onChange={handleChange}
                            className="mb-1"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please enter your last name</Form.Control.Feedback>
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>Username</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required
                            type="text"
                            name="username"
                            value={inputs.username}
                            placeholder="Create a username"
                            onChange={handleChange}
                            className="mb-1"
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please enter a username</Form.Control.Feedback>
                    </Col> 
                </Form.Group>
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
                    <Form.Label style={{marginTop: 0}} column sm={2}>Create a Password</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="password"
                            name="password"
                            value={inputs.password}
                            placeholder="Enter a password"
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">Please create a password</Form.Control.Feedback>
                    </Col>
                </Form.Group>
                <Button className="mb-3 row justfify-content-center" onClick={handleSubmit}>Register</Button>   
            </Form>
        </div>
    );
}

export default Registration;