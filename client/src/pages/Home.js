import React from 'react';
import Logo from '../images/theidealogo.png'

function Home() {
    return (
        <div className="home-section">
            <div className="home-container">
                <h1>Explore Your IDEA</h1>
                <h3>The International Digital Exhibit of Art </h3>
                <img src={ Logo } alt="Image"/>
            </div>
        </div>
    );
}

export default Home;