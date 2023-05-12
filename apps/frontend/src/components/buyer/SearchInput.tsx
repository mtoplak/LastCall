import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const SearchInput = () => {
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      Naziv, tip, lokacija:
      <TextField fullWidth label="naziv, tip, lokacija" id="fullWidth" />
    </Box>
  );
}

export default SearchInput;
