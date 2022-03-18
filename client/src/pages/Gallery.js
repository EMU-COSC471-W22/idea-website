import React from 'react';

function Gallery() {
    return (
        <div>
            <h1>Gallery Page</h1>
            <div class="gallery">
            <a target="_blank" href="img_5terre.jpg">
                <img src="img_5terre.jpg" alt="Cinque Terre" width="600" height="400"/>
            </a>
            <div class="desc">Add a description of the image here</div>
            </div>
        </div>
    );
}

export default Gallery;