import { styled } from '@mui/material';

const FooterLink = styled('span')(({ theme }) => ({
	fontSize: '16px',
	color: '#7A7A7E',
	fontWeight: '300',
	cursor: 'pointer',
	'&:hover': {
		color: '#000',
	},
}));

export default FooterLink;
