import React, { useState, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

/* React Bootstrap Components */
import Alert from 'react-bootstrap/Alert';

function Login() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [loginError, setLoginError] = useState("");
    const { setAuthState } = useContext(AuthContext);

    const login = (data) => {
        setShow(false);
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            
            if (response.data.error) {
                setLoginError(response.data.error);
                setShow(true);
            } else {
                localStorage.setItem("accessToken", response.data);
                setAuthState(true);
                navigate('/');
            }
        });
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter your username"),
        password: Yup.string().required("Please enter your password")
    })

    const initialValues = {
        username: "",
        password: ""
    }

    return(
        <div className='outline container-sm my-5' style={{"maxWidth": "22rem"}}>
            <h2>Log In</h2>
            <Alert show={show} variant="danger"> <p> {loginError} </p> </Alert>
            <Formik 
                initialValues={initialValues}
                onSubmit={login}
                validationSchema={validationSchema}
            >
                {({ errors, touched, isValidating }) => (
                    <Form>
                        <div className='mb-1'>
                            <label className='form-label'>Username</label>
                            <Field name="username" className="form-control" />
                            {errors.username && touched.username && <div className='text-danger'>{errors.username}</div>}
                        </div>
                        <div className='mb-1'>
                            <label className='form-label'>Password</label>
                            <Field name="password" className="form-control" type="password"/>
                            {errors.password && touched.password && <div className='text-danger'>{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary my-3">Log In</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;