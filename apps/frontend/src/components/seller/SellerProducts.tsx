import { IDrink } from 'models/drink';
import React, { useEffect, useState } from 'react';
import api from 'services/api';
import {
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DrinkContainer from 'components/ui/DrinkContainer';
import HouseBox from 'components/ui/HouseBox';
import ImgContainer from 'components/ui/ImgContainer';
import InfoBox from 'components/ui/InfoBox';
import Image from 'components/ui/Image';

interface SellerProductsProps {
	sellerId: string;
}

const SellerProducts: React.FC<SellerProductsProps> = ({ sellerId }) => {
	const [products, setProducts] = useState<IDrink[]>([]);

	useEffect(() => {
		const fetchSellerProducts = async () => {
			const response = await api.get(`/sellers/${sellerId}/products`);
			console.log(response.data);
			setProducts(response.data);
		};

		fetchSellerProducts();
	}, []);

	return (
		<Grid container spacing={2}>
			{products.length > 0 ? (
				products.map((drink) => (
					<DrinkContainer key={drink._id}>
						<HouseBox>
							<Link to={`/product/${drink._id}`}>
								<ImgContainer>
									<Image
										src={drink.picture}
										alt={drink.title}
									/>
								</ImgContainer>
							</Link>
							<InfoBox>
								<Link to={`/product/${drink._id}`}>
									<Typography
										variant="h6"
										sx={{ fontWeight: '700' }}
										style={{ color: 'black' }}
									>
										{drink.title}
									</Typography>
								</Link>
								<Typography variant="body1" sx={{ my: 1 }}>
									Price: {drink.price.toFixed(2)}€
								</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '100%',
									}}
								></Box>
							</InfoBox>
						</HouseBox>
					</DrinkContainer>
				))
			) : (
				<div>
					<Typography variant="body1">
						This seller has no products yet &#128549;. Please check
						back later.
					</Typography>
				</div>
			)}
		</Grid>
	);
};

export default SellerProducts;
