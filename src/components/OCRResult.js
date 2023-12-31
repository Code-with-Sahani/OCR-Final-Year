import { Box, Button, Modal } from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const OCRResult = ({ ocrResult, open, handleModal}) => {
  return (<>
  <Modal
  open={open}
  // onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <h2 id="parent-modal-title">OCR Result</h2>
    <Button id = 'closeModal'variant="outlined" startIcon={<CloseIcon /> } onClick={() => {
    handleModal()
  }}></Button>
    <p id="parent-modal-description">
    {ocrResult}
    </p>
  </Box>
</Modal>
</>
  );
};

export default OCRResult;
