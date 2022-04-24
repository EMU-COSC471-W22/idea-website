import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

/* React Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavigationBar() {
    const { authState } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);

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

    return (
        <div>
            <Navbar collapseOnSelect className='navbar' bg='light' variant='light' expand='lg'>
                <Navbar.Brand> <Link className='logo' to='/'>THE IDEA</Link> </Navbar.Brand>
                <Navbar.Toggle className='navbar-toggle-padding' aria-controls='responsive-navbar-nav'/>
                <Container className='nav-items' expand='lg'>
                    <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
                        <Nav>
                            <Link className='nav-item' to='/gallery'>Gallery</Link>
                            <Link className='nav-item' to='/upload'>Request</Link>
                            <Link className='nav-item' to='/about'>About</Link>
                            <Link className='nav-item' to='/contact'>Contact</Link>
                            {isAdmin && <Link className='nav-item' to='/admin'>Admin</Link>}
                            {!authState ? <>
                                <Link className='nav-item' to='/login'>Login</Link>
                                <Link className='nav-item' to='/registration'>Sign Up</Link>
                            </> : <Link className='nav-item' to="/">Logout</Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default NavigationBar;