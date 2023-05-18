import { Box, styled, Typography, IconButton } from '@mui/material';
import HouseBox from 'components/ui/HouseBox';
import InfoBox from 'components/ui/InfoBox';
import React from 'react';

interface DrinkProps {
	title: string;
	city: string;
	country: string;
	tip: string;
}

const Supplier: React.FC<DrinkProps> = ({ title, city, country, tip }) => {
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
