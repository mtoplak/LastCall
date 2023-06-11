import { IDrink } from 'models/drink';
import React, { useEffect, useState } from 'react';
import api from 'services/api';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import HouseBox from 'components/ui/HouseBox';
import ImgContainer from 'components/ui/ImgContainer';
import InfoBox from 'components/ui/InfoBox';
import Image from 'components/ui/Image';

interface SellerProductsProps {
	sellerId: string;
}

const SellerProducts: React.FC<SellerProductsProps> = ({ sellerId }) => {
	const [products, setProducts] = useState<IDrink[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchSellerProducts = async () => {
			try {
				const response = await api.get(`/sellers/${sellerId}/products`);
				setProducts(response.data);
				//console.log(response.data);
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSellerProducts();
	}, [sellerId]);

	return (
		<Grid
			container
			spacing={2}
			sx={{
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap',
				mt: 2,
			}}
		>
			{isLoading ? (
				<CircularProgress color="inherit" />
			) : products.length > 0 ? (
				products.map((drink) => (
					<Box sx={{ mx: 1 }} key={drink._id}>
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
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									{drink.actualPrice !== drink.price ? (
										<>
											<Typography
												variant="body1"
												sx={{
													textDecoration:
														'line-through',
													color: 'text.secondary',
													mr: 1,
												}}
											>
												{drink.actualPrice.toFixed(2)} €
											</Typography>
											<Typography
												variant="body1"
												sx={{ color: 'error.main' }}
											>
												{drink.price.toFixed(2)} €
											</Typography>
										</>
									) : (
										<Typography variant="body1">
											{drink.actualPrice.toFixed(2)} €
										</Typography>
									)}
								</Box>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										width: '100%',
									}}
								></Box>
							</InfoBox>
						</HouseBox>
					</Box>
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
