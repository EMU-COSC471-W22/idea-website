import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import ArtTable from './ArtTable';
import axios from 'axios';

/* React Bootstrap Components */
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

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
        {!isAdmin ? <p>You do not have authorized access to this page...</p> :
            <div className='container'>
                <h1 className='m-5' style={{ textAlign: 'center' }}>Administration</h1>
                <Tabs defaultActiveKey="art-pieces" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="art-pieces" title="Art Pieces">
                        <ArtTable />
                    </Tab>
                </Tabs>
            </div>
        }
        </div>
    );
}

export default Admin;