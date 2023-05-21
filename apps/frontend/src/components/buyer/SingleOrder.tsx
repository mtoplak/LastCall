import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Container, Card, Divider } from '@mui/material';
import { IOrder } from 'models/order';
import { IDrink } from 'models/drink';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';

function SingleOrder() {
	const [order, setOrder] = useState<IOrder>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/orders/' + id);
				console.log(response.data);
				setOrder(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<Typography variant="h4" component="h1" mt={4} mb={2}>
					Past Orders
				</Typography>
				<Grid container spacing={2}>
					{order && (
						<>
							<Grid item xs={12}>
								<Card
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
										px: 2,
									}}
								>
									<Typography variant="h5" sx={{ mb: 2 }}>
										Order Details
									</Typography>
									<Typography
										sx={{ mb: 2, color: 'text.secondary' }}
									>
										Thanks for your order! Check out the
										details below.
									</Typography>
								</Card>
								<Card
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
										px: 2,
									}}
								>
									<Typography
										sx={{ mb: 2, color: 'text.secondary' }}
									>
										<b>ORDER STATUS:</b> 
									</Typography>
									<Typography variant="h6" sx={{ mb: 4 }}>
										<b>Order ID:</b> {order._id}
									</Typography>
									<Divider />
									<Typography
										variant="h6"
										sx={{ mt: 2, mb: 2 }}
									>
										Delivery Details
									</Typography>
									<Grid
										container
										sx={{ mb: 4, color: 'text.secondary' }}
									>
										<Grid item xs={6}>
											<Typography>
												Address: {order.address}
											</Typography>
											<Typography>
												City: {order.city}
											</Typography>
											<Typography>
												Country: {order.country}
											</Typography>
										</Grid>
										<Grid item xs={6}>
											<Typography>
												Date of Purchase: date
											</Typography>
											<Typography>
												Date of Delivery: date
											</Typography>
										</Grid>
									</Grid>
									<Divider />
									<Typography
										variant="h6"
										sx={{ mt: 2, mb: 2 }}
									>
										Order Total
									</Typography>
									<Typography
										sx={{ color: 'text.secondary' }}
									>
										SubTotal: {order.totalPrice}€
									</Typography>
									<Typography
										sx={{ color: 'text.secondary' }}
									>
										Delivery: delivery€
									</Typography>
									<Typography
										sx={{ mt: 1, color: 'text.secondary' }}
									>
										<b>Total: total€</b>
									</Typography>
								</Card>
								<Card
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
										px: 2,
									}}
								>
									<Grid item xs={12}>
										<Typography variant="h6" sx={{ mb: 2 }}>
											Products
										</Typography>
										{order.products.map(
											(product: IDrink) => (
												<Grid
													container
													key={product._id}
													spacing={2}
													sx={{
														mb: 2,
														color: 'text.secondary',
													}}
												>
													<Grid item xs={12}>
														<Typography>
															<b>Product ID:</b>{' '}
															{product._id}
														</Typography>
														<Typography>
															<b>Name:</b>{' '}
															{product.title}
														</Typography>
														<Typography>
															<b>Price:</b>{' '}
															{product.price}
														</Typography>
														<Divider
															sx={{ mt: 2 }}
														/>
													</Grid>
												</Grid>
											)
										)}
									</Grid>
								</Card>
							</Grid>
						</>
					)}
				</Grid>
			</Container>
		</Box>
	);
}

export default SingleOrder;
