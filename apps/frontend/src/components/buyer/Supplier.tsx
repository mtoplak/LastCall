import { Card, CardMedia, Grid, Rating, Typography } from '@mui/material';
import HouseBox from 'components/ui/HouseBox';
import InfoBox from 'components/ui/InfoBox';
import { ISeller } from 'models/seller';
import React, { useEffect, useState } from 'react';
import winery from '../../assets/images/wine.png';
import brewery from '../../assets/images/beer.png';
import { SellerType } from '../../enums/seller.enum';
import api from 'services/api';

interface SupplierProps {
	seller: ISeller;
}

const Supplier: React.FC<SupplierProps> = ({ seller }) => {
	const [rating, setRating] = useState<number | null>(null);
	const companyTypeImage =
		seller.companyType === SellerType.WINERY ? winery : brewery;

	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await api.get(
					'sellers/average-score/' + seller._id
				);
				setRating(response.data);
			} catch (error) {
				console.error('Error fetching rating:', error);
			}
		};

		fetchRating();
	}, [seller._id]);

	return (
		<>
			<Card sx={{ mt: 5, mb: 2 }}>
				<Grid container spacing={1} sx={{ my: 3, mx: 1 }}>
					<Grid item xs={6} md={3}>
						<CardMedia
							component="img"
							image={companyTypeImage}
							sx={{
								maxHeight: 150,
								maxWidth: 150,
								mx: 4,
							}}
						/>
					</Grid>
					<Grid item xs={6} sx={{ my: 4 }} md={7}>
						<Typography variant="h4" component="h2">
							{seller.title}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{seller.address}, {seller.city}, {seller.country}
						</Typography>
						<Typography variant="body1" color="text.secondary">
							{seller.companyType}
						</Typography>
					</Grid>
					<Grid item xs={12} md={2} sx={{ my: 1 }}>
						<Typography component="legend">Rating: </Typography>
						<Rating
							name="read-only"
							precision={0.5}
							value={rating}
							readOnly
							sx={{ ml: 1 }}
						/>
					</Grid>
				</Grid>
			</Card>
		</>
	);
};

export default Supplier;
