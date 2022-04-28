import React from 'react';
import { useNavigate } from 'react-router'

/* Import the image portraits */
import Joseph from '../images/joseph.jpg';
import Brandon from '../images/brandon.jpg';
import Michaela from '../images/michaela.png';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About() {
    const navigate = useNavigate();

    const handleChange = () => {
        navigate('/contact')
    }

    return (
        <div>
            <div className="about-section">
                <h1>About Us Page</h1>
                <p>The International Digital Exhibit of Art located solely online has one of the largest and most significant art collections in the World. Art has the power to transform lives and build communities. At The IDEA, we are using our world-class collection to inspire curiosity, spark creativity, and to reimagine our collective future. Our founders’ commitment to art for the community, and their generosity of time and resources set the stage in The International Digital Exhibit of Art.</p>
            </div>
            
            <div>
                <h2 className="center-text my-4">Our Team</h2>
                <Row lg={3} md={2} sm={1}>
                <Col>
                    <div className="card">
                    <img src={ Brandon } alt="Brandon" />
                    <div className="container">
                        <h2 className="center-text">Brandon Jones</h2>
                        <p className="title">CEO & Founder</p>
                        <p>Brandon is one of the founders of The International Digital Exhibit of Art. The heart and soul each artist pours into the pieces they place into the care of The IDEA is cherished by every founder. In personal preference Brandon enjoys the surrealist art and works of nature. A passion for the arts has given them this drive to create such a space for other artists to express their works to audiences across the globe.</p>
                        <p>Email: bjone123@emich.edu</p>
                        <p><button className="button" onClick={handleChange}>Contact</button></p>
                    </div>
                    </div>
                </Col>
            

                <Col>
                    <div className="card">
                    <img src={ Michaela } alt="Michaela" />
                    <div className="container">
                        <h2 className="center-text">Michaela Gerweck</h2>
                        <p className="title">Founder & Director</p>
                        <p>Michaela is one of the founders of The International Digital Exhibit of Art. The heart and soul each artist pours into the pieces they place into the care of The IDEA is cherished by every founder. In personal preference Michaela enjoys the surrealist art and works of nature. A passion for the arts has given them this drive to create such a space for other artists to express their works to audiences across the globe.</p>
                        <p>Email: mgerwec1@emich.edu</p>
                        <p><button className="button" onClick={handleChange}>Contact</button></p>
                    </div>
                    </div>
                </Col>

                <Col>
                    <div className="card">
                    <img src={ Joseph } alt="Joseph" />
                    <div className="container">
                        <h2 className="center-text">Joseph Cognata</h2>
                        <p className="title">Founder & Archivist</p>
                        <p>Joseph is another founder of The International Digital Exhibit of Art. He has always been passionate about art and the way that art lets people express themselves. To allow for a platform where people can display these expressions and create a space for beautiful pieces of art, Joseph made it his mission to develope the website for The IDEA. Joseph has been exuberant and excited of the huge success the website is, since his goal was always to create a safe space for artists. </p>
                        <p>Email: jcognata@emich.edu</p>
                        <p><button className="button" onClick={handleChange}>Contact</button></p>
                    </div>
                    </div>
                </Col>
            </Row>
            </div>
        </div>
    );
}

export default About;