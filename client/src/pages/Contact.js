import React from 'react';

function Contact() {
    return (
        <div class="contact-container">
            <div >// style="text-align:center"
                <h2>Contact Us</h2>
                <p>Swing by for a cup of coffee, or leave us a message:</p>
            </div>
            <div class="row">
                <div class="column">
                    <img src="/w3images/map.jpg" alt="image"/>
                </div>
                <div class="column">
                    <form action="/action_page.php">
                        <label for="fname">First Name</label>
                        <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
                        <label for="lname">Last Name</label>
                        <input type="text" id="lname" name="lastname" placeholder="Your last name.."></input>
                        <label for="country">Country</label>
                        <select id="country" name="country">
                            <option value="usa">USA</option>
                            <option value="australia">Australia</option>
                            <option value="canada">Canada</option>
                        </select>
                        <label for="subject">Subject</label>
                        <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                        <input type="submit" value="Submit"></input>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;