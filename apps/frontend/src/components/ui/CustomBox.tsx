import { styled, Box } from '@mui/material';

const CustomBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	gap: theme.spacing(5),
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
	},
}));

export default CustomBox;
