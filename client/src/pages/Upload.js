import React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { Formik, Form, Field, ErrorMessage } from 'formik'

function Upload() {
    const [imageSelected, setImageSelected] = useState("");
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
        const formData = new FormData();
        let artURL = "";
        formData.append("file", imageSelected);
        formData.append("upload_preset", "theideapreset");

        axios.post("https://api.cloudinary.com/v1_1/theidea/image/upload", formData).then((response) => {
            console.log(response);
            artURL = response.data.secure_url; 
            axios.post("http://localhost:3001/upload", {title: inputs.title, description: inputs.description, artistName: inputs.artistName, artURL: artURL});
        });
    }

    return (
        <div>
            <h1>New Post</h1>
            <form onSubmit={handleSubmit}>
                <label>Enter your title:
                    <input
                        type="text"
                        name="title" 
                        value={inputs.title || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Enter your description:
                    <input
                        type="text"
                        name="description" 
                        value={inputs.description || ""}
                        onChange={handleChange}
                    />
                </label>
                <label>Enter your name:
                    <input
                        type="text"
                        name="artistName" 
                        value={inputs.artistName || ""}
                        onChange={handleChange}
                    />
                </label>
            </form>
            <input type="file" onChange={(event) => (setImageSelected(event.target.files[0]))} accept="image/"/>
            <button type="submit" onClick={handleSubmit}>Request Art Post</button>
            {/* <Formik intialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <label>Title</label>
                    <Field 
                        id="inputCreatePost"
                        name="title"
                        placeholder="(Ex. Title)"
                    />
                    <label>Post</label>
                    <Field 
                        id="inputCreatePost"
                        name="postText"
                        placeholder="(Ex. Post)"
                    />
                    <label>Username</label>
                    <Field 
                        id="inputCreatePost"
                        name="username"
                        placeholder="(Ex. John123)"
                    />
                </Form>
            </Formik> */}
        </div>
    );
}
export default Upload;