import React, { useState } from "react";
import ReactCrop from "react-image-crop";

import 'react-image-crop/dist/ReactCrop.css';

const Cropper = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        //setFile(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({
        aspect: 16 / 9
    });
    const [cropped_image, setCroppedImage] = useState(null);

    function getCroppedImg() {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.Height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width = scaleX,
            crop.height = scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        const base64Image = canvas.toDataURL('image/jpeg');
        setCroppedImage(base64Image);
    }

    return (
        <div className="container">
            Hello Pallbe Saha
            <input type="file" accept="image/*" onChange={handleFileChange} />

            {file &&
                <>
                    <ReactCrop  onImageLoaded={setImage} crop={crop} onChange={setCrop}>
                        <img src={file} />
                    </ReactCrop>
                    <button type="button" onClick={getCroppedImg}>Crop Image</button>
                </>
            }
            {cropped_image && 
                <img src={cropped_image} alt="Cropped Image" />
            }
        </div>
        
    )
}

export default Cropper;