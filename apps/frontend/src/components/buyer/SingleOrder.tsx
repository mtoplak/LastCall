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
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import { formatDate } from 'utils/formatDate';
import { getOrderStatusColor } from 'utils/getOrderStatusColor';
import { useUserAuth } from 'context/AuthContext';
import NavbarS from 'components/seller/NavbarS';

function SingleOrder() {
	const [order, setOrder] = useState<IOrder>();
	const { id } = useParams<{ id: string }>();
	const { role, user } = useUserAuth();

	useEffect(() => {
		if (!user) return;
		const fetchOrder = async () => {
			try {
				const response = await api.get('/orders/' + id, {
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				});
				setOrder(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchOrder();
	}, [id, user]);

	useEffect(() => {
		document.title = `Order ${order?.uid} details`;
	}, [order?.uid]);

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			{role === 'seller' ? <NavbarS /> : <NavbarB />}
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
										color={getOrderStatusColor(
											order.status
										)}
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
												Estimated Date of Delivery:{' '}
												{formatDate(
													new Date(
														order.lastDateOfDelivery
													)
												)}
											</Typography>
											<Typography>
												{order.status ===
													'Delivered' && (
													<>
														Date of Delivery:{' '}
														{formatDate(
															new Date(
																order.actualDateOfDelivery
															)
														)}
													</>
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
										{(
											order.totalPrice -
											order.seller.deliveryCost
										).toFixed(2)}{' '}
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
											<React.Fragment
												key={orderProduct.product._id}
											>
												<Grid
													container
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
													<Grid
														item
														xs={6}
														md={10}
														sx={{ my: 4 }}
													>
														<Typography>
															<b>Product ID:</b>{' '}
															{
																orderProduct
																	.product._id
															}
														</Typography>
														<Typography>
															<b>Name:</b>{' '}
															{
																orderProduct
																	.product
																	.title
															}
														</Typography>
														<Typography>
															<b>Price:</b>{' '}
															{orderProduct.product.price.toFixed(
																2
															)}{' '}
															€
														</Typography>
														<Typography>
															<b>Quantity:</b>{' '}
															{
																orderProduct.quantity
															}
														</Typography>
													</Grid>
												</Grid>
												<Divider sx={{ my: 2 }} />
											</React.Fragment>
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
