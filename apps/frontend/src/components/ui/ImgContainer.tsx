import { Box, styled } from '@mui/material';

const ImgContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	borderTopLeftRadius: theme.spacing(1),
	borderTopRightRadius: theme.spacing(1),
	overflow: 'hidden',
}));

export default ImgContainer;
