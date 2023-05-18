import {
	Box,
	styled,
} from '@mui/material';

const PropertiesBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap', // Allow products to wrap to the next line
	marginTop: theme.spacing(5),
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default PropertiesBox;
