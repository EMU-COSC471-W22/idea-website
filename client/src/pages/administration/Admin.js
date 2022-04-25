import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import ArtTable from './ArtTable';
import AccountsTable from './AccountsTable';
import axios from 'axios';

/* React Bootstrap Components */
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const { authState } = useContext(AuthContext);
    
    useEffect(() => {
        axios.get("http://localhost:3001/admin/verification", 
        { 
            headers: { 
                accessToken: localStorage.getItem("accessToken") 
            }
        }).then((response) => {
            console.log(response.data);
            if(response.data.error) {
                setIsAdmin(false)
            } 
            if (response.data.authorized) {
                setIsAdmin(true);
            }
        });
    }, []);

    return(
        <div>
        {!authState.isAdmin ? 
            <div className='text-center m-5'>
                <h1 >You do not have authorized access to this page</h1>
                <FontAwesomeIcon className='p-5' icon={faLock} style={{ fontSize: "10rem" }} />
            </div> :
            <div className='container'>
                <h1 className='m-5' style={{ textAlign: 'center' }}>Administration</h1>
                <Tabs defaultActiveKey="art-pieces" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="art-pieces" title="Art Pieces">
                        <ArtTable />
                    </Tab>
                    <Tab eventKey="accounts" title="Accounts">
                        <AccountsTable />
                    </Tab>
                </Tabs>
            </div>
        }
        </div>
    );
}

export default Admin;