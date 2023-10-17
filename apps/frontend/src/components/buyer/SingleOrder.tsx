import React, { useEffect, useState } from 'react';
import {
	Typography,
	Grid,
	Box,
	Container,
	Card,
	Divider,
	CardMedia,
	Link,
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
import Page404 from 'components/404/Page404';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function SingleOrder() {
	const [order, setOrder] = useState<IOrder>();
	const [isFetchError, setIsFetchError] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { role, user } = useUserAuth();
	const [error, setError] = useState('');
	const [score, setScore] = useState<number | null>(null);
	const [isRated, setIsRated] = useState(false);

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
				setIsFetchError(true);
				throw error;
			}
		};
		fetchOrder();
	}, [id, user]);

	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await api.get(`/rating/order/${order?._id}`);
				setScore(response.data);
				setIsRated(!!response.data);
			} catch (error: any) {
				setError(error.response.data.message);
			}
		};
		if (order?.score) {
			fetchRating();
		}
	}, [order]);

	useEffect(() => {
		if (!order) return;
		document.title = `Order ${order?.uid} details`;
		window.scrollTo(0, 0);
	}, [order?.uid, order]);

	if (isFetchError) {
		return <Page404 notFound="Order" />;
	}

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
									<Grid container spacing={2}>
										<Grid item xs={12} md={6}>
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
											<Typography
												variant="h6"
												sx={{ mb: 2 }}
											>
												<b>Order ID:</b> {order.uid}
											</Typography>
										</Grid>

										<Grid
											item
											xs={12}
											md={6}
											sx={{ mt: { xs: 0, md: 5 } }}
										>
											{role !== 'seller' && isRated ? (
												<Rating
													value={score!}
													readOnly
												/>
											) : null}
										</Grid>
									</Grid>
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
										<Grid
											item
											xs={12}
											md={6}
											sx={{ mb: 1 }}
										>
											<Typography>
												Name: {order.buyer.name}{' '}
												{order.buyer.surname}
											</Typography>
											<Typography>
												Address: {order.address}
											</Typography>
											<Typography>
												Location: {order.city},{' '}
												{order.country}
											</Typography>
										</Grid>
										<Grid item xs={12} md={6}>
											<Typography>
												Date of Purchase:{' '}
												{formatDate(
													new Date(
														order.dateOfPurchase
													)
												)}
											</Typography>
											<Typography>
												Estimated Delivery Date:{' '}
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
										<b>
											Total: {order.totalPrice.toFixed(2)}{' '}
											€
										</b>
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
													<Grid
														item
														xs={12}
														sm={4}
														md={3}
													>
														<Card
															sx={{
																maxWidth: {
																	xs: 400,
																	sm: 200,
																	md: 200,
																},
															}}
														>
															<CardMedia
																component="img"
																image={
																	orderProduct
																		.product
																		.picture
																}
															/>
														</Card>
													</Grid>
													<Grid
														item
														xs={12}
														sm={8}
														md={9}
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
								<Card
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
										px: 2,
									}}
								>
									<Grid
										container
										sx={{ mb: 4, color: 'text.secondary' }}
									>
										{' '}
										<Grid
											item
											xs={12}
											sm={6}
											sx={{ mb: 2 }}
										>
											<Typography
												variant="h6"
												color="black"
												sx={{ mb: 2 }}
											>
												Seller details
											</Typography>
											<Typography sx={{ mb: 1 }}>
												<b>{order.seller.title}</b>
											</Typography>
											<Typography sx={{ mb: 1 }}>
												{order.seller?.address}
											</Typography>
											<Typography>
												{order.seller?.city},{' '}
												{order.seller?.country}
											</Typography>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Typography
												variant="h6"
												color="black"
												sx={{ mb: 2 }}
											>
												Seller contact information
											</Typography>
											<Grid item>
												<Typography
													sx={{
														fontSize: '15px',
														color: 'gray',
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<EmailIcon
														sx={{
															marginRight:
																'0.5rem',
															mb: 1,
														}}
													/>
													<Link
														href={`mailto:${order.seller?.email}`}
														color="inherit"
														underline="none"
													>
														{order.seller?.email}
													</Link>
												</Typography>
											</Grid>
											<Grid item sx={{ ml: 0 }}>
												<Typography
													variant="body2"
													sx={{
														fontSize: '15px',
														color: 'gray',
														display: 'flex',
														alignItems: 'center',
													}}
												>
													<PhoneIcon
														sx={{
															marginRight:
																'0.5rem',
															mb: 1,
														}}
													/>
													<Link
														href={`tel:${order.seller?.phone}`}
														color="inherit"
														underline="none"
													>
														{order.seller?.phone}
													</Link>
												</Typography>
											</Grid>
											<Grid item>
												<Link
													href={order.seller?.website}
													underline="none"
												>
													<Typography
														variant="body2"
														sx={{
															fontSize: '15px',
															color: 'gray',
															display: 'flex',
															alignItems:
																'center',
														}}
													>
														<LanguageIcon
															sx={{
																marginRight:
																	'0.5rem',
															}}
														/>
														{order.seller?.website}
													</Typography>
												</Link>
											</Grid>
										</Grid>
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
