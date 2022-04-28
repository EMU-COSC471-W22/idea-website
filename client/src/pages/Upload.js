import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ImagePreview from '../components/ImagePreview';


function Upload() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
    
    const requestArt = (data) => {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("upload_preset", "theideapreset");

        /* First communicate with the Cloudinary API to store the image, and recieve the URL */
        axios.post("https://api.cloudinary.com/v1_1/theidea/image/upload", formData).then((response) => {
            console.log(response);
            let artURL = response.data.secure_url;

            axios.post("https://formsubmit.co/ajax/ideawebsite2022@gmail.com", {
                _subject: "New Art Request From " + authState.username + "!",
                _template: "table",    
                first_name: authState.firstName,
                last_name: authState.lastName,
                username: authState.username,    
                title: data.title,
                url: artURL,
                description: data.description,
                email: data.email
            });

            /* Next communicate with the database to insert new data to the artpieces table */
            axios.post("http://localhost:3001/upload", 
            { title: data.title, description: data.description, artURL: artURL, email: data.email},
            { headers: {accessToken: localStorage.getItem("accessToken")} }).then((response) => {
                console.log(response.data);
            });
            alert("Submission successful! Expect an email regarding the status of your submission.");
            navigate('/');
        });
    }

    /* Yup validation schema to ensure all information is correct before being able to submit */
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(2, 'Too Short!').max(50, "Too Long!").required("A title is required"),
        description: Yup.string().min(2, 'Too Short!').max(2200, "Max character limit: 2200 characters").required("A description is required"),
        email: Yup.string().email("Invalid email").required("An email is required"),
        emailConfirmation: Yup.string().email("Invalid email").oneOf([Yup.ref('email'), null], "Email does not match!").required("Please confirm your email address"),
        file: Yup
            .mixed()
            .nullable()
            .required("File is required")
            .test("FILE_SIZE", "The file is too large. Should be no more than 2MB", 
            (value) => {
                return !value || (value && value.size <= 2000000)
            })
            .test("FILE_FORMAT", "Uploaded file has unsupported format.",
            (value) => {
                return !value || (value && SUPPORTED_FORMATS.includes(value?.type))
            })
    })

    const initialValues = {
        title: "",
        description: "",
        email: "",
        emailConfirmation: "",
        file: null
    }

    return (
        <div className='outline container-sm my-5' style={{"maxWidth": "50rem"}}>
        
            {/* Request form will only show if the user is logged in. They are prompted to log in or sign up if they are not. */}
            {!authState.status ? <p>Please <a href="/login">log in</a> or <a href="/registration">sign up</a> to request an art piece for the gallery.</p> :
                <>
                    <h2>Art Request Form</h2>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={requestArt}
                        validationSchema={validationSchema}
                    >
                        {({ errors, touched, isValidating, values, setFieldValue }) => (
                            <Form>
                                <div className='mb-1'>
                                    <label className='form-label'>Title:</label>
                                    <Field name="title" className="form-control" placeholder="Please provide a title for your art piece..." />
                                    {errors.title && touched.title && <div className='text-danger'>{errors.title}</div>}
                                    {!errors.title && touched.title && <div className='text-success'>Looks good!</div>}
                                </div>
                                <div className='mb-1'>
                                    <label className='form-label'>Decription:</label>
                                    <Field as="textarea" rows={10} name="description" className="form-control" placeholder="Please provide a description for your art piece..." />
                                    {errors.description && touched.description && <div className='text-danger'>{errors.description}</div>}
                                    {!errors.description && touched.description && <div className='text-success'>Looks good!</div>}
                                </div>
                                <div className='mb-1'>
                                    <label className='form-label'>Contact Email:</label>
                                    <Field type="email" name="email" className="form-control" placeholder="Please enter an email for us to contact you about the status of your submission..." />
                                    {errors.email && touched.email && <div className='text-danger'>{errors.email}</div>}
                                    {!errors.email && touched.email && <div className='text-success'>Looks good!</div>}
                                </div>
                                <div className='mb-1'>
                                    <label className='form-label'>Confirm Email:</label>
                                    <Field type="email" name="emailConfirmation" className="form-control" placeholder="Please confirm your email..." />
                                    {errors.emailConfirmation && touched.emailConfirmation && <div className='text-danger'>{errors.emailConfirmation}</div>}
                                    {!errors.emailConfirmation && touched.emailConfirmation && <div className='text-success'>Looks good!</div>}
                                </div>
                                <div className='mb-1'> 
                                    <label className='form-label'>Upload Art:</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(event) => {
                                            setFieldValue("file", event.target.files[0]);
                                        }}
                                    />
                                    {errors.file && <div className='text-danger'>{errors.file}</div>}
                                    {!errors.file && touched.file && <div className='text-success'>Looks good!</div>}
                                </div>

                                {/* An image preview shows after the user has selected a file */}
                                {values.file && 
                                    <div>
                                        <label className='form-label'>Image Preview:</label>
                                        <ImagePreview file={values.file}/>
                                    </div> 
                                }
                                <div>
                                    <label className='form-label'>Submitting form as {authState.firstName} {authState.lastName} ({authState.username})</label>
                                </div>
                                <button type="submit" className="btn btn-primary my-3">Request Art</button>
                            </Form>
                        )}
                    </Formik>
                </>
            }
        </div>
    );
}
export default Upload;