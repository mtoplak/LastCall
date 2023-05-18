import { Box, styled } from '@mui/material';

const SellerContainer = styled(Box)(({ theme }) => ({
	flex: '0 0 25.33%', // Set the width to one-third of the container
	marginBottom: theme.spacing(4), // Add some margin between the products
}));

export default SellerContainer;