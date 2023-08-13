import React, { useState } from 'react';
import './ImageUpload.css'

const ImageUpload = ({ onOCR }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    onOCR(file);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} className='img-btn' />
      {selectedImage && <img src={selectedImage} alt="Selected" />}
    </div>
  );
};

export default ImageUpload;
