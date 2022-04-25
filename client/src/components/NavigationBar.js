import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';

/* React Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavigationBar() {
    const { authState, setAuthState } = useContext(AuthContext);
    // const [isAdmin, setIsAdmin] = useState(false);
    // const [username, setUsername] = useState("");

    // useEffect(() => {
    //     axios.get("http://localhost:3001/admin/verification", 
    //     { 
    //         headers: { 
    //             accessToken: localStorage.getItem("accessToken") 
    //         }
    //     }).then((response) => {
    //         console.log(response.data);
    //         if(response.data.error) {
    //             setIsAdmin(false)
    //         } 
    //         if (response.data.authorized) {
    //             setIsAdmin(true);
    //         }
    //     });

    //     axios.get("http://localhost:3001/auth/info", {headers: {
    //         accessToken: localStorage.getItem("accessToken")
    //     }}).then((response) => {
            
    //         if (response.data.error) {
    //             console.log(response.data.error);
    //         } else {
    //             setUsername(response.data[0].username);
    //         }
    //     });
    // }, []);

    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({status: false, isAdmin: false});
        // setIsAdmin(false);
    }

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
                            {authState.isAdmin && <Link className='nav-item' to='/admin'>Admin</Link>}
                            {!authState.status ? <>
                                <Link className='nav-item' to='/login'>Login</Link>
                                <Link className='nav-item' to='/registration'>Sign Up</Link>
                            </> : <>
                                <Link className='nav-item' to="/" onClick={logout} >Logout</Link>
                                <Link className='nav-item' to="/">Hello {authState.username}!</Link>
                            </> 
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