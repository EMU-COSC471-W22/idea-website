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
import { faTrash, faPalette, faUserTie } from '@fortawesome/free-solid-svg-icons';

function Gallery() {
    const [artPieces, setArtPieces] = useState([]);
    const [currentArtId, setCurrentArtId] = useState(-1);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
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
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/comments/${artId}`).then((response) => {
            setComments(response.data);
        });
    }
  
    useEffect(() => {

        /* On first render, this accesses all of the data from the artpieces table that have the 'accepted' status */
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/gallery`).then((response) => {
            setArtPieces(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShow(items);
        });

    }, []);

    const addComment = () => {
        if (newComment !== "") {
            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/comments`, 
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
                    const commentToAdd = {
                        comment_id: response.data[0].comment_id, 
                        comment_body: newComment, 
                        username: authState.username, 
                        first_name: authState.firstName, 
                        last_name: authState.lastName
                    };
                    setComments([...comments, commentToAdd]);
                    setNewComment("");
                }
            });
        }
    }

    const deleteComment = (id) => {
        axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/comments/${id}`, 
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
            {(artPieces.length === 0) ? <h1 className='text-center m-5'>There are currently no art pieces in the gallery...</h1> :
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
                                    <a href={value.art_url} rel="noreferrer" target="_blank"> <img width="100%" className="img-fluid border" src={value.art_url} alt="art gallery piece" /></a>
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
                                                    placeholder={"Comment as " + authState.username + "..."} 
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
                                                        <div className='col-md-5 col-sm-10'>
                                                            <p className='mb-1' >
                                                                <strong>{comment.first_name} {comment.last_name}</strong> @<em>{comment.username} </em>
                                                                {(comment.type === "admin") &&  <span><FontAwesomeIcon icon={faUserTie}/> </span>  }
                                                                {(comment.username === value.username) && <span><FontAwesomeIcon icon={faPalette} /></span> }
                                                            </p>
                                                        </div>
                                                        
                                                        {/* Option to delete comment made by the current logged in user or if they're an admin */}
                                                        {(comment.username === authState.username || authState.isAdmin) && 
                                                            <FontAwesomeIcon style={{cursor: "pointer"}} className='col-md-1 offset-md-6 col-sm-2 text-end' icon={faTrash} onClick={() => deleteComment(comment.comment_id)} />
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
            </Row>}
            </div>
        </div>
        
    );
}

export default Gallery;