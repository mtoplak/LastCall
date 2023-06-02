import { Box, styled } from '@mui/material';

const HouseBox = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(0), // Set borderRadius to 0 for hard edges
  maxWidth: 300,
  backgroundColor: 'white',
  color: 'black',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  margin: theme.spacing(2),
  overflow: 'hidden', // Ensure the image is contained within the box
  padding: theme.spacing(2), // Add padding around the image
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('md')]: {
    margin: theme.spacing(2, 0),
  },
}));

export default HouseBox;
