import React, { useState } from 'react';

function ImagePreview(props) {
    const [preview, setPreview] = useState(null);

    const reader = new FileReader();
    reader.readAsDataURL(props.file);
    reader.onload = () => {
        setPreview(reader.result);
    }

    return (
        <div>
            {preview ? <img className='img-fluid' src={preview} alt="preview" /> : "loading..."}
        </div>
    )
}

export default ImagePreview;