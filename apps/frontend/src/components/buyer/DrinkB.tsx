import { Typography, IconButton } from '@mui/material';
import React from 'react';
import InfoBox from 'components/ui/InfoBox';
import Image from 'components/ui/Image';
import ImgContainer from 'components/ui/ImgContainer';
import HouseBox from 'components/ui/HouseBox';

interface DrinkProps {
	name: string;
	img: string;
	price: number;
}

const DrinkB: React.FC<DrinkProps> = ({ name, img, price }) => {
	return (
		<HouseBox>
			<ImgContainer>
				<Image src={img} alt="housePhoto" />
			</ImgContainer>

			<InfoBox>
				<Typography variant="h6" sx={{ fontWeight: '700' }}>
					{name}
				</Typography>
				<Typography variant="body1" sx={{ my: 1 }}>
					Cena: {price}€
				</Typography>
			</InfoBox>
		</HouseBox>
	);
};

export default DrinkB;
