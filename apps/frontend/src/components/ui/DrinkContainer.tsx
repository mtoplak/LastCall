import { styled, Box } from '@mui/material';

const DrinkContainer = styled(Box)(({ theme }) => ({
	flex: '0 0 25.33%', // Set the width to one-third of the container
	marginBottom: theme.spacing(4), // Add some margin between the products
}));

export default DrinkContainer;
