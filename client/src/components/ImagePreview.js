import React, { useState } from 'react';

/* This component is used for the request form after the user chooses an image */
function ImagePreview(props) {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(props.file);
    reader.onload = () => {
        setPreview(reader.result);
    }

    return (
        <div>
            {preview ? <img className='img-fluid' src={preview} alt="preview" /> : <p className='m-3' >loading...</p>}
        </div>
    )
}

export default ImagePreview;