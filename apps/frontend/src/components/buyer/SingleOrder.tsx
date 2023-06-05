import React, { useEffect, useState } from 'react';
import {
	Typography,
	Grid,
	Box,
	Container,
	Card,
	Divider,
	CardMedia,
	Button,
	Modal,
	Rating,
} from '@mui/material';
import { IOrder } from 'models/order';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import { formatDate } from 'utils/formatDate';
import { getOrderStatusColor } from 'utils/getOrderStatusColor';
import { useUserAuth } from 'context/AuthContext';
import NavbarS from 'components/seller/NavbarS';
import { OrderStatus } from 'enums/order.enum';
import { style } from 'assets/styles/styles';
import { IRating } from 'models/rating';
import Page404 from 'components/404/Page404';

function SingleOrder() {
	const [order, setOrder] = useState<IOrder>();
	const [fetchError, setFetchError] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { role, user } = useUserAuth();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [score, setScore] = React.useState<number>(1); // Set initial value as a number
	const [error, setError] = useState('');
	const [rated, setRated] = useState(false);

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
				setRated(!!response.data?.score); // Check if score exists and set `rated` accordingly
				setScore(parseFloat(response.data?.score) || 1);
			} catch (error) {
				setFetchError(true);
				throw error;
			}
		};

		fetchOrder();
	}, [id, user]);

	useEffect(() => {
		if (!order) return;
		document.title = `Order ${order?.uid} details`;
	}, [order?.uid, order]);

	if (fetchError) {
		return <Page404 notFound="Order" />;
	}

	const handleRating = async () => {
		if (score === null) {
			return;
		}
		try {
			await api.post(
				`/rating`,
				{
					score: score,
					seller: order?.seller.email,
					order: order?._id,
					buyer: user.email,
				},
				{
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				}
			);
			handleClose();
			console.log(score);
			console.log(user.email);
			console.log(order?._id);
			setRated(true);
		} catch (error: any) {
			setError(error.response.data.message);
		}
	};
/*
	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await api.get(`/rating/order/${order?._id}`);
				console.log(response.data);

				if (response.data) {
					setScore(response.data.score);
				}
			} catch (error: any) {
				setError(error.response.data.message);
			}
		};

		if (order?._id && !rated) {
			fetchRating();
		}
	}, [order?._id, rated]);

	const getRating = async () => {
		try {
			await api.get(`/rating/order/${order?._id}`);
		} catch (error: any) {
			setError(error.response.data.message);
		}
	};
*/
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
									<Button
										sx={{ mb: 4 }}
										onClick={handleOpen}
										disabled={rated}
									>
										{rated ? (
											<>
												You already rated this seller:{' '}
												<Rating
													name="read-only"
													value={score}
													readOnly
												/>
											</>
										) : (
											<>Rate the seller</>
										)}
									</Button>
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
													OrderStatus.DELIVERED && (
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
										Subtotal:{' '}
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
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Rate your experience with this seller
					</Typography>
					<Rating
						name="simple-controlled"
						value={score}
						onChange={(event, newValue) => {
							if (newValue) {
								setScore(newValue);
							}
						}}
					/>{' '}
					<Button onClick={handleRating}>Confirm</Button>
				</Box>
			</Modal>
		</Box>
	);
}

export default SingleOrder;
