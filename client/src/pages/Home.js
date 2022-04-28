import React from 'react';
import Logo from '../images/theidealogo_transparent.png';

function Home() {
    return (
        <div className="home-section">
            <div className="container">
                <div className="row my-5">
                    <div className="col-sm-12 col-lg-6 align-self-center text-center">
                        <h1 className="home-header" >Explore Your IDEA...</h1>
                    </div>
                    <div className="col-sm-12 col-lg-6 text-center">
                        <img className='img-fluid' src={ Logo } alt="IDEA logo"/>
                    </div>
                </div>
                <div className='row my-5 p-lg-5 p-4 text-center home-info'>
                    <h2><a href="/gallery">Visit our gallery</a></h2>
                    <div className='fs-5'>
                        <p>Please take a moment to admire what many talented artists from around the globe have been able to create.</p>
                        <p>Our collection consists of carefully selected art pieces from artists that we felt showed true passion in their craft.</p>
                    </div>
                    
                </div>
                <div className='row my-5 p-lg-5 p-4 text-center home-info'>
                    <h2><a href="/upload"> Request your own art</a></h2>
                    <div className='fs-5'>
                        <p>Here at the IDEA, we value all works of art from all artists. If you are interested in submitting your own art to the gallery, please fill out a form!</p>
                        <p>We would love to review your work to determine if it will be fitting for the gallery! </p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Home;