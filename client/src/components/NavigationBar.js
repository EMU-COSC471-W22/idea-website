import React, { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import { Outlet, Link } from 'react-router-dom';
import Logo from '../images/theidealogo_icon_only.png';

/* React Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavigationBar() {
    const { authState, setAuthState } = useContext(AuthContext);

    /* Removes access token and resets the authState after logging out */
    const logout = () => {
        localStorage.removeItem("accessToken");
        setAuthState({status: false, isAdmin: false});
    }

    return (
        <div>
            <Navbar collapseOnSelect className='navbar' bg='light' variant='light' expand='md' sticky="top">
                <Navbar.Brand><Link className='logo' to='/'><img className='img-fluid' src={Logo} alt="The IDEA logo" />THE IDEA</Link> </Navbar.Brand>
                <Navbar.Toggle className='navbar-toggle-padding' aria-controls='responsive-navbar-nav'/>
                <Container className='nav-items'>
                    <Navbar.Collapse className='justify-content-end' id='responsive-navbar-nav'>
                        <Nav>
                            <Link className='nav-item' to='/gallery'>Gallery</Link>
                            <Link className='nav-item' to='/upload'>Request</Link>
                            <Link className='nav-item' to='/about'>About</Link>
                            <Link className='nav-item' to='/contact'>Contact</Link>

                            {/* Only shows the 'Admin' link if the user is an admin */}
                            {authState.isAdmin && <Link className='nav-item' to='/admin'>Admin</Link>}

                            {/* Only shows the login/sign up if user is not logged in */}
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