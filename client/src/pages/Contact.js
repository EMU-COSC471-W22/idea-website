import React from 'react';

/* Import the logo image */
import Logo from '../images/theidealogo_transparent.png'

function Contact() {
    return (
        <div class="contact-container container-sm my-5">
            <div>
                <h2 className='margin-right mt-3'>Contact Us</h2>
            </div>
            <div class="row">
                <div class="column">
                    <img className='margin-right img-fluid' src={ Logo } alt="the IDEA logo"/>
                </div>
                <div class="column">
                    <form action="https://formsubmit.co/ideawebsite2022@gmail.com" method='POST'>
                        <label className='form-label'>First Name</label>
                        <input type="text" className="form-control" name="firstname" placeholder="Your name..." required></input>
                        <label className='form-label'>Last Name</label>
                        <input type="text" className="form-control" name="lastname" placeholder="Your last name..." required></input>
                        <label className='form-label'>Email</label>
                        <input type="email" className="form-control" name="email" placeholder="Your email..." required></input>
                        <label className='form-label'>Subject</label>
                        <textarea className="form-control" style={{ resize: "vertical",  overflow: "auto"}} name="subject" placeholder="Write something..." required></textarea>
                        <input type="hidden" name='_template' value="table" />
                        <input type="hidden" name='_subject' value="Contact Form Submission" />
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;