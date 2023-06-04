import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import InfoBox from 'components/ui/InfoBox';
import Image from 'components/ui/Image';
import ImgContainer from 'components/ui/ImgContainer';
import HouseBox from 'components/ui/HouseBox';
import { IDrink } from 'models/drink';

interface DrinkProps {
	drink: IDrink;
}

const DrinkB: React.FC<DrinkProps> = ({ drink }) => {
	const showActualPrice = drink.actualPrice !== drink.price;
  
	return (
		<HouseBox>
		<ImgContainer>
		  <Image src={drink.picture} alt={drink.title} />
		</ImgContainer>
		<Divider />
		<InfoBox>
		  <Typography variant="h6" sx={{ fontWeight: '700' }}>
			{drink.title}
		  </Typography>
		  <Box sx={{ display: 'flex', alignItems: 'center' }}>
			{showActualPrice ? (
			  <>
				<Typography
				  variant="body1"
				  sx={{ textDecoration: 'line-through', color: 'text.secondary', mr: 1 }}
				>
				  {drink.actualPrice.toFixed(2)} €
				</Typography>
				<Typography variant="body1" sx={{ color: 'error.main' }}>
				  {drink.price.toFixed(2)} €
				</Typography>
			  </>
			) : (
			  <Typography variant="body1">
				{drink.actualPrice.toFixed(2)} €
			  </Typography>
			)}
		  </Box>
		</InfoBox>
	  </HouseBox>
	);
};

export default DrinkB;
