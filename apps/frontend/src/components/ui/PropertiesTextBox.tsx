import { Box, styled } from '@mui/material';

const PropertiesTextBox = styled(Box)(({ theme }) => ({
	[theme.breakpoints.down('md')]: {
		textAlign: 'center',
	},
}));

export default PropertiesTextBox;
