import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Navbar() {
    return (
        <div>
            <nav>
                <h1>THE IDEA</h1>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/gallery'>Gallery</Link>
                    </li>
                    <li>
                        <Link to='/artists'>Artists</Link>
                    </li>
                    <li>
                        <Link to='/about'>About</Link>
                    </li>
                    <li>
                        <Link to='/contact'>Contact</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </div>
    );
}

export default Navbar;