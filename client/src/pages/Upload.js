import React from 'react';
import { useNavigate } from 'react-router'
import { useState, setState } from 'react';
import axios from 'axios';

/* React Bootstrap Components */
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Upload() {
    const navigate = useNavigate();
    const [imageSelected, setImageSelected] = useState("");
    const [inputs, setInputs] = useState({
        title: "",
        description: "",
    });
    const [validated, setValidated] = useState(false);
    const [formerrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        console.log(
            "handleChange -> " + event.target.name + " : " + event.target.value
        );
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = (event) => {
        const formData = new FormData();
        let artURL = "";
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log(validated);
        }

        setValidated(true);

        formData.append("file", imageSelected);
        formData.append("upload_preset", "theideapreset");

        if (validated === true) {
            axios.post("https://api.cloudinary.com/v1_1/theidea/image/upload", formData).then((response) => {
                console.log(response);
                artURL = response.data.secure_url; 
                axios.post("http://localhost:3001/upload", {title: inputs.title, description: inputs.description, artistName: inputs.artistName, artURL: artURL});
        });
            
        alert("Your file is being uploaded!");
        navigate('/');
            
        } 
    }

    return (
        <div>
            <Form className="outline" noValidate validated={validated} onSubmit={handleSubmit}>
            <h2 className="artist-information">Art Information</h2>
                <Row className="mb-3">
                    <Form.Group md="4" controlId="validationCustom01"> 
                        <Form.Label>Artist name: </Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="artistName" 
                                value={inputs.artistName || ""}
                                onChange={handleChange}
                            />
                    </Form.Group>
                    <Form.Group md="4">
                        <Form.Label>Art title: </Form.Label>
                            <Form.Control 
                                required
                                type="text"
                                name="title" 
                                value={inputs.title}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter A Title.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="d-grid gap-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Art description: </Form.Label>
                            <Form.Control as="textarea" aria-label="With textarea" 
                                required
                                type="text"
                                name="description" 
                                value={inputs.description}
                                onChange={handleChange}
                                rows={10}
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please Enter A Description.</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <div className="d-grid gap-2">
                    <Form.Control required type="file" onChange={(event) => (setImageSelected(event.target.files[0]))} accept="image/"/>
                    <Button className='upload-button' type="submit">Request Art</Button>
                </div>
                
            </Form>
        </div>
    );
}
export default Upload;