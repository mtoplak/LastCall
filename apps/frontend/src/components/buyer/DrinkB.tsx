import { Typography, IconButton } from '@mui/material';
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
	return (
		<HouseBox>
			<ImgContainer>
				<Image src={drink.picture} alt="housePhoto" />
			</ImgContainer>
			<InfoBox>
				<Typography variant="h6" sx={{ fontWeight: '700' }}>
					{drink.title}
				</Typography>
				<Typography variant="body1" sx={{ my: 1 }}>
					Price: {drink.price}€
				</Typography>
			</InfoBox>
		</HouseBox>
	);
};

export default DrinkB;
