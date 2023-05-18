import { Box, styled } from '@mui/system';

const HouseBox = styled(Box)(({ theme }) => ({
	borderRadius: theme.spacing(1),
	maxWidth: 350,
	backgroundColor: '#E6F0FF',
	color: 'black',
	boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
	transition: 'transform 0.3s ease-in-out',
	margin: theme.spacing(2),
	'&:hover': {
		transform: 'scale(1.05)',
	},
	[theme.breakpoints.down('md')]: {
		margin: theme.spacing(2, 0),
	},
}));

export default HouseBox;
