import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

/* React Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';


function NavigationBar() {
    return (
        <div>
            <Navbar collapseOnSelect className='navbar' bg='light' variant='light' expand='lg'>
                <Navbar.Brand> <Link className='logo' to='/'>THE IDEA</Link> </Navbar.Brand>
                <Navbar.Toggle className='navbar-toggle-padding' aria-controls='responsive-navbar-nav'/>
                <Container className='nav-items' expand='lg'>
                    <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
                        <Nav>
                            <Link className='nav-item' to='/gallery'>Gallery</Link>
                            <Link className='nav-item' to='/artists'>Artists</Link>
                            <Link className='nav-item' to='/upload'>Upload</Link>
                            <Link className='nav-item' to='/about'>About</Link>
                            <Link className='nav-item' to='/contact'>Contact</Link>
                        </Nav>
                        <NavDropdown className='dropdown-color' id="collasible-nav-dropdown" title={<FontAwesomeIcon className='account-icon' icon={faUser} />} >
                            <NavDropdown.Item href='/account'>Account</NavDropdown.Item>
                            <NavDropdown.Item href='/settings'>Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>Log Out</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />
        </div>
    );
}

export default NavigationBar;