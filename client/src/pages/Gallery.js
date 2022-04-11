import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Gallery() {
    const [artPieces, setArtPieces] = useState([]);
    const [currentArtId, setCurrentArtId] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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
    }
  
    useEffect(() => {
        axios.get("http://localhost:3001/gallery").then((response) => {
            setArtPieces(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShow(items);
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/comments/${currentArtId}`).then((response) => {
            setComments(response.data);
        })
    }, [currentArtId])

    const addComment = () => {
        axios.post("http://localhost:3001/comments", {commentBody: newComment, artId: currentArtId}).then((response) => {
            
        });
        const commentToAdd = {commentBody: newComment};
        setComments([...comments, commentToAdd]);
        setNewComment("");
    }

    return (
        <div>
            <h1>Gallery Page</h1>
            {artPieces.map((value, index) => {
                return (
                    <div>
                        <Card key={index} onClick={() => handleShow(index, value.artId)}>
                            <Card.Img src={value.artURL}/>
                            <Card.Body>
                                <Card.Title> {value.title} </Card.Title>
                                <Card.Text>
                                    <h3> {value.username} </h3>
                                    <p> {value.description} </p>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <Modal centered size="lg" backdrop="static" show={show[index]} onHide={() => handleClose(index)} >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                <Image src={value.artURL} fluid/>
                                <h1> {value.title} </h1>
                                <p> {value.username} </p>
                                <p> {value.description} </p>
                                <Stack direction='horizontal' gap={2} >
                                    <input 
                                        type="text" 
                                        value={newComment} 
                                        className="me-auto" 
                                        placeholder="Add your comment here..." 
                                        onChange={(event) => {
                                            setNewComment(event.target.value)
                                        }}
                                    />
                                    <Button onClick={addComment}>Send</Button>
                                </Stack>
                                <br />
                                <Stack gap={2} className='comments'>
                                    {comments.length > 0 && comments.map((comment, index) => {
                                        return (
                                            <div key={index} className="bg-light border">{comment.commentBody}</div>
                                        );
                                    })}
                                </Stack>
                            </Modal.Body>
                        </Modal>
                    </div>
                    
                )
            })}
        </div>
        
    );
}

export default Gallery;