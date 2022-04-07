import React from 'react';
import { useState } from 'react';
import Axios from 'axios';

function Upload() {

    const [imageSelected, setImageSelected] = useState("");

    const uploadImage = () => {
        const formData = new FormData()
        formData.append("file", imageSelected)
        formData.append("upload_preset", "theideapreset")

        Axios.post("https://api.cloudinary.com/v1_1/theidea/image/upload", formData).then((response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <h1>New Post</h1>
            <div>
                <input type="file" onChange={(event) => (setImageSelected(event.target.files[0]))} multiple accept="image/"/>
                <button onClick={uploadImage}>Request Art Post</button>
                {/* <label>
                    Image: &nbsp;
                    <input type="file"  onChange={this.onFileChange} multiple accept="image/"/>
                </label>
                <br />
                <label>
                    <textarea rows="25" cols="100" placeholder="Write something to post..." className='inform' value={this.state.content} onChange={this.handleContentChange} />
                </label>
                <br />
                <input type="submit" value="Post" onClick={this.handleSubmit} /> */}
            </div>
        </div>
    );
}
export default Upload;