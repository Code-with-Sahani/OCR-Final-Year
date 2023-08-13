import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import OCRResult from './components/OCRResult';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';

function App() {
  const [ocrResult, setOCRResult] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [handleOcrModal,setHandleOcrModal] = useState(false);
  const [fileNotUploaded,setFileNotUploaded] = useState('');
  const [isloading,setIsloading] = useState(false);

  const handleReset = async () => {
    setOCRResult('');
    setUploadedImage(null);
    setHandleOcrModal(false)
    setFileNotUploaded('')
    window.location.reload(false);
  }
  const handleOCR = async () => {
    if(uploadedImage){
      setIsloading(true)
      const worker = await createWorker({
        logger: (m) => console.log(m), // Optional: Enable Tesseract.js logging
      });
  
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
  
      const { data: { text } } = await worker.recognize(uploadedImage);
  
      setOCRResult(text);
  
      await worker.terminate();
      setIsloading(false)
      setHandleOcrModal(true)
    }
    else
    {
      setFileNotUploaded('No File Uploaded Yet Please Upload The Image');
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageData = await readFileAsDataURL(file);
      setUploadedImage(imageData);
      // handleOCR(imageData);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (event) => {
        reject(event.error);
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="App">
      <h1 className='header'>OCR App</h1>
      <label htmlFor="upload-button" className="file-label"></label>
      <div className='inputDiv'>
      <input className='inputImage' type="file" id="upload-button" accept="image/*" onChange={handleImageChange} />
      {uploadedImage && <img src={uploadedImage} alt="Uploaded" className="uploaded-image" />}
      {isloading?<CircularProgress />:null}
      {ocrResult?<OCRResult ocrResult = {ocrResult} open = {handleOcrModal} handleModal = {setHandleOcrModal}/>:<p>{fileNotUploaded}</p>}
      <Button className='actionButton' variant="contained" onClick={() => {
    handleOCR()
  }}>Click to perform OCR</Button>
   <Button className='actionButton' variant="contained" onClick={() => {
    handleReset()
  }}>Click to Reset</Button>
      </div>
    </div>
  );
}

export default App;
