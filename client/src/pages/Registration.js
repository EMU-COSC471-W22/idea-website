import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function Registration() {

    const navigate = useNavigate();
    const [isTaken, setIsTaken] = useState(false);

    const registerUser = (data) => {
        /* A successful registration will take you to the home page */
        axios.post("http://localhost:3001/auth", data).then(() => {
            console.log(data);
        });
        navigate('/login');
    }

    const validateUsername = (value) => {

        /* Checks to see if username is taken */
        axios.post("http://localhost:3001/auth/users", {username: value}).then((response) => {
            
            /* If the username does not exist in the table, it will return and empty array */
            if (response.data.length !== 0) {
                setIsTaken(true);
            } else {
                setIsTaken(false);
            }
            
        });
        
        let error;
        if (isTaken) {
            error = "Username is taken!"
        }
        return error;
        
    }

    /* Formik and Yup */
    const validationSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Too Short!').max(50, "Too Long!").required("First name is required"),
        lastName: Yup.string().min(2, 'Too Short!').max(50, "Too Long!").required("Last name is required"),
        username: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Username is required"),
        password: Yup.string().min(3, 'Too Short!').max(50, "Too Long!").required("Password is required"),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], "Passwords do not match!").required("Please confirm your password")
    })

    const initialValues = {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        passwordConfirmation: ""
    }

    return (
        <div className='outline container-sm my-5' style={{"maxWidth": "22rem"}}>
            <h2>Registration</h2>
            <Formik
                initialValues={initialValues}
                onSubmit={registerUser}
                validationSchema={validationSchema}
            >
                {({ errors, touched, isValidating }) => (
                    <Form>
                        <div className='mb-1'>
                            <label className='form-label'>First Name</label>
                            <Field name="firstName" className="form-control"/>
                            {errors.firstName && touched.firstName && <div className='text-danger'>{errors.firstName}</div>}
                            {!errors.firstName && touched.firstName && <div className='text-success'>Looks good!</div>}
                        </div>
                        <div className='mb-1'>
                            <label className='form-label'>Last Name</label>
                            <Field name="lastName" className="form-control"/>
                            {errors.lastName && touched.lastName && <div className='text-danger'>{errors.lastName}</div>}
                            {!errors.lastName && touched.lastName && <div className='text-success'>Looks good!</div>}
                        </div>
                        <div className='mb-1'>
                            <label className='form-label'>Create a username</label>
                            <Field name="username" validate={validateUsername} className="form-control"/>
                            {errors.username && touched.username && <div className='text-danger'>{errors.username}</div>}
                            {!errors.username && touched.username && <div className='text-success'>Username is valid!</div>}
                        </div>
                        <div className='mb-1'>
                            <label className='form-label'>Create a password</label>
                            <Field name="password" type="password" className="form-control"/>
                            {errors.password && touched.password && <div className='text-danger'>{errors.password}</div>}
                            {!errors.password && touched.password && <div className='text-success'>Password is valid!</div>}
                        </div>
                        <div className='mb-1'>
                            <label className='form-label'>Confirm password</label>
                            <Field name="passwordConfirmation" type="password" className="form-control"/>
                            {errors.passwordConfirmation && touched.passwordConfirmation && <div className='text-danger'>{errors.passwordConfirmation}</div>}
                            {!errors.passwordConfirmation && touched.passwordConfirmation && <div className='text-success'>Password matches!</div>}
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Register</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Registration;