import { Box, styled } from '@mui/material';

const InfoBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: theme.spacing(2),
}));

export default InfoBox;
