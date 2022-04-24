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
        axios.get("http://localhost:3001/admin/all").then((response) => {
            setArtToDisplay(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShow(items);
        });
    }, []);

    /* Modal Controls */
    const [show, setShow] = useState([]);

    /* Close modal by setting show[index] to false */
    const handleClose = (index) => {
        let items = [...show];
        items[index] = false;
        setShow(items);
    }

    /* Open modal by seting show[index] to true */
    const handleShow = (index) => {
        let items = [...show];
        items[index] = true;
        setShow(items);
    }

    /* Updates database to change the status of specified art piece */ 
    const changeStatus = (newStatus, affectedArtId) => {
        
        axios.put("http://localhost:3001/admin/changestatus", {status: newStatus, artId: affectedArtId});

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
    
        axios.get(`http://localhost:3001/admin/${newView}`).then((response) => {
            setArtToDisplay(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShow(items);
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
                                        <td><Button variant="dark" onClick={() => handleShow(index)}>Review</Button></td>
                                    </tr>

                                    {/* Modal appears when 'Review' button has been clicked for specific row */}
                                    <Modal centered size="lg" backdrop="static" show={show[index]} onHide={() => handleClose(index)}>
                                        <Modal.Header closeButton>
                                            <Modal.Title>Art Piece #{value.art_id}</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <img className='img-fluid' src={value.art_url} alt=""/>
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
                                            <Button variant="secondary" onClick={() => handleClose(index)}>Close</Button>
                                            <Button variant="success" onClick={() => changeStatus(accepted, value.art_id)}>Accept</Button>
                                            <Button variant="danger" onClick={() => changeStatus(declined, value.art_id)}>Decline</Button>
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