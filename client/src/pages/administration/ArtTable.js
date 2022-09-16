import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

/* React Bootstrap Components */
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function ArtTable() {
    
    /* Holds state of current art to be displayed in the table */
    const [artToDisplay, setArtToDisplay] = useState([]);

    /* The allowed routes to change view of type of art based on status */
    const all = "all"; 
    const accepted = "accepted";
    const declined = "declined";
    const pending = "pending";

    /* 'Radio' buttons for table filtering */
    const [radioValue, setRadioValue] = useState('1');
    const radios = [
    { name: "All", value: '1', status: all },
    { name: "Accepted", value: '2', status: accepted },
    { name: "Declined", value: '3', status: declined },
    { name: "Pending", value: '4', status: pending }
  ];

    /* Initializes table view to show all art pieces in the database */
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/admin/art/view/all`).then((response) => {
            setArtToDisplay(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShowReview(items);
            setShowDelete(items);
        });
    }, []);

    /* Modal Controls */
    const [showReview, setShowReview] = useState([]);
    const [showDelete, setShowDelete] = useState([]);

    /* Close modal by setting show[index] to false */
    const handleReviewClose = (index) => {
        let items = [...showReview];
        items[index] = false;
        setShowReview(items);
    }

    /* Open modal by seting show[index] to true */
    const handleReviewShow = (index) => {
        let items = [...showReview];
        items[index] = true;
        setShowReview(items);
    }

    /* Confirm delete modal operations */
    const handleDeleteClose = (index) => {
        let items = [...showDelete];
        items[index] = false;
        setShowDelete(items);
    }

    const handleDeleteShow = (index) => {
        let items = [...showDelete];
        items[index] = true;
        setShowDelete(items);
    }

    /* Updates database to change the status of specified art piece */ 
    const changeStatus = (newStatus, affectedArtId) => {
        
        axios.put(`${process.env.REACT_APP_BACKEND_API_URL}/admin/art/changestatus`, {status: newStatus, artId: affectedArtId});

        /* Updates artToDisplay state with changed status */
        setArtToDisplay(artToDisplay.map((value, key) => {
            return value.art_id === affectedArtId ? 
            { 
                art_id: value.art_id, 
                art_url: value.art_url, 
                title: value.title,
                description: value.description, 
                status: newStatus,
                username: value.username,
                email: value.email,
                first_name: value.first_name,
                last_name: value.last_name
            } : value;
        }));
    }

    /* Updates the view of the art table based on status */
    const switchView = (newView) => {
    
        axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/admin/art/view/${newView}`).then((response) => {
            setArtToDisplay(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShowReview(items);
        })
    }

    const deleteArt = (affectedArtId, index) => {

        handleDeleteClose(index);
        handleReviewClose(index);
        axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/admin/art/remove/${affectedArtId}`).then(() => {
            setArtToDisplay(artToDisplay.filter((value) => {
                return value.art_id !== affectedArtId;
            }));
        })
    }
    
    return (
        <div>
            {/* Button options to view All, Accepted, Declined, or Pending art */}
            <ButtonGroup>
                {radios.map((radio, index) => (
                    <ToggleButton
                        key={index}
                        id={`radio-${index}`}
                        type="radio"
                        variant="outline-secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                        onClick={() => switchView(radio.status)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>

            <br /> <br />

            {/* Table Render of specified view */}
            <div className='table-responsive'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Image URL</th>
                            <th>Title</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {artToDisplay.map((value, index) => {
                            return(
                                <>
                                    <tr key={index}>
                                        <td>{value.art_id}</td>
                                        <td><a href={value.art_url} rel="noreferrer" target="_blank">{value.art_url.substring(0, 20)}</a>...</td>
                                        <td>{value.title}</td>
                                        <td>{value.username}</td>
                                        <td>{value.email}</td>
                                        <td>{value.description.substring(0, 20) + "..."}</td>
                                        <td>{value.status}</td>
                                        <td><Button variant="dark" onClick={() => handleReviewShow(index)}>Review</Button></td>
                                    </tr>

                                    {/* Modal appears when 'Review' button has been clicked for specific row */}
                                    <Modal centered size="lg" backdrop="static" show={showReview[index]} onHide={() => handleReviewClose(index)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Art Piece #{value.art_id}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <img className='img-fluid' style={{width: "100%"}} src={value.art_url} alt=""/>
                                            <br /> <br />
                                            <div>
                                                <p><strong>Title</strong>: {value.title}</p>
                                                <p><strong>Description</strong></p>
                                                <p>{value.description}</p>
                                                <hr />
                                                <p><strong>Artist</strong>: {value.first_name} {value.last_name}</p>
                                                <p><strong>Username</strong>: @<em>{value.username}</em></p>
                                                <p><strong>Email</strong>: {value.email}</p>
                                                <p><strong>Status</strong>: {value.status}</p>
                                            </div>
                                            
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <FontAwesomeIcon style={{cursor: "pointer"}} className='col-md-1 offset-md-7 text-end' icon={faTrash} onClick={() => handleDeleteShow(index)} />
                                            <Button variant="secondary" onClick={() => handleReviewClose(index)}>Close</Button>
                                            <Button variant="success" onClick={() => changeStatus(accepted, value.art_id)}>Accept</Button>
                                            <Button variant="danger" onClick={() => changeStatus(declined, value.art_id)}>Decline</Button>
                                        </Modal.Footer>
                                    </Modal>

                                    {/* Confirm Deletion of Art Piece */}
                                    <Modal centered backdrop="static" show={showDelete[index]} onHide={() => handleDeleteClose(index)} >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Are you sure you want to delete this art piece?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p><strong>Title:</strong> {value.title}</p>
                                            <p><strong>First Name:</strong> {value.first_name}</p>
                                            <p><strong>Last Name:</strong> {value.last_name}</p>
                                            <p><strong>Username:</strong> {value.username}</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-secondary' onClick={() => handleDeleteClose(index)}>Cancel</button>
                                            <button className='btn btn-danger' onClick={() => deleteArt(value.art_id, index)}>Confirm Delete</button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
        
    );
}

export default ArtTable;