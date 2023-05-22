import { IDrink } from 'models/drink';
import React, { useEffect, useState } from 'react';
import api from 'services/api';
import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';

interface SellerProductsProps {
	sellerId: string;
}

const SellerProducts: React.FC<SellerProductsProps> = ({ sellerId }) => {
	const [products, setProducts] = useState<IDrink[]>([]);

	useEffect(() => {
		const fetchSellerProducts = async () => {
			const response = await api.get(`/sellers/${sellerId}/products`);
			//console.log(response.data);
			setProducts(response.data);
		};

		fetchSellerProducts();
	}, []);

	return (
		<Grid container spacing={2}>
			{products.length > 0 ? (
				products.map((product) => (
					<Grid item xs={12} sm={6} md={4} key={product._id}>
						<Card>
							<CardMedia
								component="img"
								height="250"
								image={product.picture}
								alt={product.title}
								style={{ objectFit: 'cover' }}
							/>
							<CardContent style={{ textAlign: 'center' }}>
								<Typography variant="h6">
									{product.title}
								</Typography>
								<Typography variant="h6">
									{product.price} €
								</Typography>
							</CardContent>
						</Card>
					</Grid>
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
