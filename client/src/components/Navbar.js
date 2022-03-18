import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li> <Link className='nav-item' to='/'>THE IDEA</Link> </li>
                    <li> <Link className='nav-item' to='/gallery'>Gallery</Link> </li>
                    <li> <Link className='nav-item' to='/artists'>Artists</Link> </li>
                    <li> <Link className='nav-item' to='/about'>About</Link> </li>
                    <li> <Link className='nav-item' to='/contact'>Contact</Link> </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;