import { styled, Container } from '@mui/material';

const CustomContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-around',
	gap: theme.spacing(5),
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'column',
		textAlign: 'center',
	},
}));

export default CustomContainer;
