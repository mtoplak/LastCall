import { Button, styled } from '@mui/material';
import React, { ChangeEvent } from 'react';

const FileInput = styled('input')({
  display: 'none',
});

interface CustomFileInputProps {
  onChange: (file: File | null) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <>
      <FileInput
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />
      <label htmlFor="file-input">
        <Button variant="contained" component="span">
          Upload Image
        </Button>
      </label>
    </>
  );
};

export default CustomFileInput;
