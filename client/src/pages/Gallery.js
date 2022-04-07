import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';

function Gallery() {
    const [artPieces, setArtPieces] = useState([]);
  
    useEffect(() => {
        axios.get("http://localhost:3001/gallery").then((response) => {
            setArtPieces(response.data);
        });
    }, []);
    
    return (
        <div>
            <h1>Gallery Page</h1>
            {artPieces.map((value, key) => {
                return (
                    <div key={key}>
                        <img src={value.artURL} alt="gallery piece" />
                        <h2>{value.title}</h2>
                        <h3>{value.username}</h3>
                        <p>{value.description}</p>
                        <hr />
                    </div>
                )
            })}
        </div>
        
    );
}

export default Gallery;