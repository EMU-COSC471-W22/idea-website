import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../helpers/AuthContext';

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

function AccountsTable() {

    const { authState } = useContext(AuthContext);
    const [accounts, setAccounts] = useState([]);

    const [showChangeType, setShowChangeType] = useState([]);
    const [newType, setNewType] = useState("");
    const [showDeleteAccount, setShowDeleteAccount] = useState([]);

    /* Close modal by setting show[index] to false */
    const closeDeleteModal = (index) => {
        let items = [...showDeleteAccount];
        items[index] = false;
        setShowDeleteAccount(items);
    }

    const closeTypeModal = (index) => {
        let items = [...showChangeType];
        items[index] = false;
        setShowChangeType(items);
        setNewType("");
    }

    /* Open modal by seting show[index] to true */
    const showDeleteModal = (index) => {
        let items = [...showDeleteAccount];
        items[index] = true;
        setShowDeleteAccount(items);
    }

    const showTypeModal = (index) => {
        let items = [...showChangeType];
        items[index] = true;
        setShowChangeType(items);
    }

    useEffect(() => {
        axios.get("http://localhost:3001/admin/accounts").then((response) => {
            setAccounts(response.data);
            let items = []
            for (var i = 0; i < response.data.length; i++) {
                items.push(false);
            }
            setShowDeleteAccount(items);
            setShowChangeType(items);
        })
    }, []);

    const changeType = (affectedUsername, index) => {
        if (newType.replace(/\s+/g, "") !== "") {
            axios.put("http://localhost:3001/admin/account/changetype", {type: newType, username: affectedUsername});

            setAccounts(accounts.map((value, key) => {
                return value.username === affectedUsername ?
                {
                    username: value.username,
                    first_name: value.first_name,
                    last_name: value.last_name,
                    type: newType
                } : value;
            }));

            setNewType("");
            closeTypeModal(index);
        }
    }

    const deleteAccount = (affectedUsername, index) => {
        closeDeleteModal(index);
        alert(affectedUsername + " will be deleted");
        axios.delete(`http://localhost:3001/admin/account/remove/${affectedUsername}`).then(() => {
            setAccounts(accounts.filter((value) => {
                return value.username !== affectedUsername;
            }));
        });
        
    }

    return (
        <div>
            <div className='table-responsive'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Account Type</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody >
                        {accounts.map((value, index) => {
                            return(
                                <>
                                    <tr key={index}>
                                        <td>{value.username}</td>
                                        <td>{value.first_name}</td>
                                        <td>{value.last_name}</td>
                                        <td style={{cursor: "pointer"}}  onClick={() => showTypeModal(index)} >{value.type}</td>
                                        <td><button className='btn btn-danger' onClick={() => showDeleteModal(index)} >Delete Account?</button></td>
                                    </tr>

                                    {/* Change Type Modal */}
                                    <Modal centered backdrop="static" show={showChangeType[index]} onHide={() => closeTypeModal(index)} >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Edit Account Type of {value.username}?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p>Old Account Type: {value.type}</p>
                                            <label className='form-label'>New Account Type:</label>
                                            <input type="text" className='form-control' onChange={(e) => setNewType(e.target.value)} />
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-secondary' onClick={() => closeTypeModal(index)}>Cancel</button>
                                            {/* Condition avoids changing the account type of your own account */}
                                            {authState.username !== value.username && <button className='btn btn-warning' onClick={() => changeType(value.username, index)}>Change Account Type</button> }
                                        </Modal.Footer>
                                    </Modal>

                                    {/* Delete Account Modal */}
                                    <Modal centered backdrop="static" show={showDeleteAccount[index]} onHide={() => closeDeleteModal(index)} >
                                        <Modal.Header closeButton>
                                            <Modal.Title>Are you sure you want to delete {value.username}?</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <p><strong>Account Type:</strong> {value.type}</p>
                                            <p><strong>First Name:</strong> {value.first_name}</p>
                                            <p><strong>Last Name:</strong> {value.last_name}</p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <button className='btn btn-secondary' onClick={() => closeDeleteModal(index)}>Cancel</button>
                                            {/* Condition avoids deleting your own account */}
                                            {authState.username !== value.username && <button className='btn btn-danger' onClick={() => deleteAccount(value.username, index)}>Confirm Delete</button> }
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

export default AccountsTable;