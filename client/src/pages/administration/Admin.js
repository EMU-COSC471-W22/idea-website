import React from 'react';
import ArtTable from './ArtTable';

/* React Bootstrap Components */
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

function Admin() {
    return(
        <div>
            <h1>Admin Page</h1>
            <Tabs defaultActiveKey="art-pieces" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="art-pieces" title="Art Pieces">
                    <ArtTable />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Admin;