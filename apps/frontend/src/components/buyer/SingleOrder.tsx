import React, { useEffect, useState } from 'react';
import {
	Typography,
	Grid,
	Box,
	Container,
	Card,
	Divider,
	CardMedia,
} from '@mui/material';
import { IOrder } from 'models/order';
import { IDrink } from 'models/drink';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import { ISeller } from 'models/seller';

function SingleOrder() {
	const [order, setOrder] = useState<IOrder>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/orders/' + id);
				//console.log(response.data);
				setOrder(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'Order placed':
				return 'primary';
			case 'In-Transit':
				return 'orange';
			case 'Delivered':
				return 'green';
			case 'Cancel':
				return 'error';
			default:
				return 'inherit';
		}
	};
	
	function formatDate(date: Date): string {
		const options = {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		} as Intl.DateTimeFormatOptions;
		return date.toLocaleDateString(undefined, options);
	}

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<Typography
					variant="h4"
					component="h1"
					mt={4}
					mb={2}
				></Typography>
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
										Thank you for your order! Check out the
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
										sx={{ color: 'text.secondary' }}
									>
										<b>ORDER STATUS:</b>
									</Typography>
									<Typography
										color={getStatusColor(order.status)}
										sx={{ mb: 2 }}
									>
										<b>{order.status}</b>
									</Typography>
									<Typography variant="h6" sx={{ mb: 4 }}>
										<b>Order ID:</b> {order.uid}
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
												Date of Purchase:{' '}
												{formatDate(
													new Date(
														order.dateOfPurchase
													)
												)}
											</Typography>
											<Typography>
												Date of Delivery:{' '}
												{formatDate(
													new Date(
														order.lastDateOfDelivery
													)
												)}
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
										SubTotal:{' '}
										{order.totalPrice -
											order.seller.deliveryCost}{' '}
										€
									</Typography>
									<Typography
										sx={{ color: 'text.secondary' }}
									>
										Delivery: {order.seller.deliveryCost} €
									</Typography>
									<Typography
										sx={{ mt: 1, color: 'text.secondary' }}
									>
										<b>Total: {order.totalPrice} €</b>
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
										{order.products.map((orderProduct) => (
											<>
											<Grid
												container
												key={orderProduct.product._id}
												spacing={2}
												sx={{
													mb: 2,
													color: 'text.secondary',
												}}
											>
												<Grid item xs={6} md={2}>
													<Card>
														<CardMedia
															component="img"
															image={
																orderProduct
																	.product
																	.picture
															}
															sx={{
																maxHeight: 200,
															}}
														/>
													</Card>
												</Grid>
												<Grid item xs={6} md={10} sx={{my: 4}}>
													<Typography>
														<b>Product ID:</b>{' '}
														{
															orderProduct.product
																._id
														}
													</Typography>
													<Typography>
														<b>Name:</b>{' '}
														{
															orderProduct.product
																.title
														}
													</Typography>
													<Typography>
														<b>Price:</b>{' '}
														{
															orderProduct.product
																.price
														} €
													</Typography>
													<Typography>
														<b>Quantity:</b>{' '}
														{
															orderProduct.quantity
														}
													</Typography>
												</Grid>
												
											</Grid>
											<Divider sx={{my: 2 }} />
											</>
										))}
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
