import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';

/* React Bootstrap Components */
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* Font Awesome Components */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPalette } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
    const [artPieces, setArtPieces] = useState([]);
    const [currentArtId, setCurrentArtId] = useState(-1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const { authState } = useContext(AuthContext);

    /* Modal Controls */
    const [show, setShow] = useState([]);

    /* Close modal by setting show[index] to false */
    const handleClose = (index) => {
        let items = [...show];
        items[index] = false;
        setShow(items);
    }

    /* Open modal by seting show[index] to true */
    const handleShow = (index, artId) => {
        let items = [...show];
        items[index] = true;
        setShow(items);
        setCurrentArtId(artId);
        axios.get(`http://localhost:3001/comments/${artId}`).then((response) => {
            setComments(response.data);
        });
    }
  
    useEffect(() => {

        /* On first render, this accesses all of the data from the artpieces table that have the 'accepted' status */
        axios.get("http://localhost:3001/gallery").then((response) => {
            setArtPieces(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShow(items);
        });

        /* This will grab the user info if they are logged in. This will determine if the user is logged in and can make comments. */
        axios.get("http://localhost:3001/auth/info", { headers: { accessToken: localStorage.getItem("accessToken") }}).then((response) => {
            
            if (response.data.error) {
                console.log(response.data.error);
            } else {
                // Data used for comments
                setUsername(response.data[0].username);
                setFirstName(response.data[0].first_name);
                setLastName(response.data[0].last_name);
            }
        });

    }, []);

    const addComment = () => {
        if (newComment !== "") {
            axios.post("http://localhost:3001/comments", 
            {
                commentBody: newComment, 
                artId: currentArtId
            }, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken")
                }
            }).then((response) => {
                /* response should return the information about the new comment */
                if (response.data.error) {
                    alert(response.data.error);
                } else {
                    /* Optimistic rendering of the new comment being added to the comment section */
                    const commentToAdd = {comment_id: response.data[0].comment_id, comment_body: newComment, username: username, first_name: firstName, last_name: lastName};
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
        }
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:3001/comments/${id}`, 
        {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(() => {
            /* Optimistic rendering of the comment being deleted from the comment section */
            setComments(comments.filter((value) => {
                return value.comment_id !== id;
            }))
        });
    }

    return (
        <div  >
            <h1 className='text-center m-5'>Gallery</h1>
            <div style={{ margin: 'auto', width: '80%', paddingTop: '3%' }}>
            <Row xs={1} sm={1} md={2} lg={3} className="g-4">
                {artPieces.map((value, index) => {
                    return (
                        <Col>
                            {/* The card displayed in the gallery */}
                            <Card style={{ display: "inlineBlock", cursor: "pointer" }} key={index} onClick={() => handleShow(index, value.art_id)}>
                                <Image className='m-2' fluid src={value.art_url} alt="art gallery piece"/>
                                <Card.Body className='mt-2'>
                                    <Card.Title style={{fontSize: "2rem"}}><strong>{value.title}</strong></Card.Title>
                                    <Card.Text>
                                        <p>by {value.first_name} {value.last_name}</p>
                                        <p> {value.description.substring(0, 100)} ...</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>

                            {/* Modal for each art piece after the user clicks on it */}
                            <Modal className='modal-dialog-scrollable"' centered size="lg" backdrop="static" show={show[index]} onHide={() => handleClose(index)} >
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    <img width="100%" className="img-fluid border" src={value.art_url} alt="art gallery piece" />
                                    <p className='mt-3'><strong>{value.title}</strong></p>
                                    <p>by {value.first_name} {value.last_name} </p>
                                    <p> {value.description} </p>
                                    <hr />

                                    {/* New comment input field */}
                                    <div className='container'>
                                        {!authState.status ? <p>Please <a href="/login">log in</a> or <a href="/registration">sign up</a> to post a comment</p> :
                                        <div className='row align-items-center'>
                                            <div className='col-sm-10'>
                                                <textarea
                                                    value={newComment} 
                                                    style={{ resize: "vertical",  overflow: "auto"}}
                                                    className="form-control" 
                                                    placeholder={"Comment as " + username + "..."} 
                                                    onChange={(event) => {
                                                        setNewComment(event.target.value)
                                                    }}
                                                />
                                            </div>
                                            <div className='ps-1 col-sm-2'>
                                                <button className='btn btn-primary' onClick={addComment}>Send</button>
                                            </div>
                                        </div>
                                        }
                                    </div>
                                    <br />

                                    {/* Comment section */}
                                    <Stack style={{overflowY: "auto", height: "20rem"}} gap={2} className='comments'>
                                        {comments.length > 0 && comments.map((comment, index) => {
                                            return (
                                                <div key={index} className="bg-light border p-2">
                                                    <div className='row my-1' >
                                                    
                                                        {/* Displays first name, last name, username, and artist icon if the comment was made by the artist of the current art piece */}
                                                        <p className='col-md-5 mb-1'>
                                                            <strong>{comment.first_name} {comment.last_name}</strong> @<em>{comment.username} </em>
                                                            {(comment.username === value.username) && <FontAwesomeIcon icon={faPalette} />}
                                                        </p>
                                                        
                                                        {/* Option to delete comment made by the current logged in user or if they're an admin */}
                                                        {(comment.username === username || authState.isAdmin) && 
                                                            <FontAwesomeIcon style={{cursor: "pointer"}} className='col-md-1 offset-md-6 text-end' icon={faTrash} onClick={() => deleteComment(comment.comment_id)} />
                                                        }
                                                    </div>
                                                    <p className='my-1'>{comment.comment_body}</p>
                                                </div>
                                            );
                                        })}
                                    </Stack>
                                </Modal.Body>
                            </Modal>
                        </Col>
                )})}
            </Row>
            </div>
        </div>
        
    );
}

export default Gallery;