import { Box, styled, Typography, IconButton } from '@mui/material';
import React from 'react';

interface DrinkProps {
	title: string;
	city: string;
	country: string;
	tip: string;
}

const Supplier: React.FC<DrinkProps> = ({ title, city, country, tip }) => {
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

	const InfoBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: theme.spacing(2),
	}));

	return (
		<HouseBox>
			<InfoBox>
				<Typography variant="h6" sx={{ fontWeight: '700' }}>
					{title}
				</Typography>
				<Typography variant="body1" sx={{ my: 1 }}>
					Location: {city + ', ' + country}
				</Typography>
				{tip}
			</InfoBox>
		</HouseBox>
	);
};

export default Supplier;
