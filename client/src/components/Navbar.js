import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li> <Link className='logo' to='/'>THE IDEA</Link> </li>
                    <li> <Link className='nav-item' to='/gallery'>Gallery</Link> </li>
                    <li> <Link className='nav-item' to='/artists'>Artists</Link> </li>
                    <li> <Link className='nav-item' to='/about'>About</Link> </li>
                    <li> <Link className='nav-item' to='/contact'>Contact</Link> </li>
                    <li> <Link className='nav-item' to='/account'> <FontAwesomeIcon icon={faCoffee} /> </Link> </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;