import { styled, Typography } from '@mui/material';

const Title = styled(Typography)(({ theme }) => ({
	fontSize: '64px',
	color: '#262626',
	fontWeight: 'bold',
	margin: theme.spacing(4, 0, 4, 0),
	[theme.breakpoints.down('sm')]: {
		fontSize: '40px',
	},
}));

export default Title;
