import {
	Box,
	Button,
	Container,
	Grid,
	Typography,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	Divider,
	Alert,
	Select,
	MenuItem,
} from '@mui/material';
import NavbarB from './NavbarB';
import { useUserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { ICartItem } from 'models/cartItem';
import { Link } from 'react-router-dom';

function Cart() {
	const { user } = useUserAuth();
	const [cartItems, setCartItems] = useState<ICartItem[] | null>(null);

	useEffect(() => {
		if (!user) return;
		const fetchCart = async () => {
			const response = await api.post('/buyers/getcart', {
				email: user.email,
			});
			setCartItems(response.data.cart);
		};
		fetchCart();
	}, [user]);
	console.log(cartItems);

	useEffect(() => {
		document.title = 'Shopping Cart';
	}, []);

	const handleRemoveFromCart = async (id: string) => {
		const response = await api.post('/buyers/removefromcart', {
			email: user?.email,
			productId: id,
		});
		setCartItems(response.data.cart);
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<Typography variant="h4" component="h1" mt={4} mb={2}>
					Shopping Cart
				</Typography>
				{cartItems && cartItems.length > 0 ? (
					<Grid container spacing={2}>
						<Grid item xs={8}>
							{cartItems?.map((item: ICartItem) => (
								<Card
									key={item.product._id}
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
									}}
								>
									<Grid container spacing={2}>
										<Grid item xs={3}>
											<Link
												to={`/product/${item.product._id}`}
											>
												<CardMedia
													component="img"
													alt={item.product.title}
													image={item.product.picture}
												/>
											</Link>
										</Grid>
										<Grid item xs={6}>
											<CardContent>
												<Typography
													variant="subtitle1"
													component="h2"
												>
													<Link
														to={`/product/${item.product._id}`}
														className="blackLink"
													>
														{item.product.title}
													</Link>
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
												>
													Price:{' '}
													{item.product.price.toFixed(
														2
													)}{' '}
													€
												</Typography>
												{/* item.product.discount > 0 ? (
										<Alert severity="success">
										  There is currently a {item.product.discount}% discount for this item!{' '}
										</Alert>
									  ) : (
										''
									  ) */}
												<Alert severity="success">
													There is currently a 10%
													discount for this item!{' '}
												</Alert>
											</CardContent>
										</Grid>
										<Grid item xs={3}>
											<CardActions>
												<Select
													value={item.quantity}
													variant="outlined"
													size="small"
												>
													{Array.from(
														{ length: 100 },
														(_, index) => (
															<MenuItem
																key={index + 1}
																value={
																	index + 1
																}
															>
																{index + 1}
															</MenuItem>
														)
													)}
												</Select>
												<Button
													variant="text"
													size="large"
													color="error"
													onClick={() =>
														handleRemoveFromCart(
															item.product._id
														)
													}
												>
													X
												</Button>
											</CardActions>
										</Grid>
									</Grid>
								</Card>
							))}
						</Grid>
						<Grid item xs={4}>
							<Card>
								<CardContent>
									<Typography
										variant="h6"
										component="h2"
										mb={2}
									>
										Total Amount
									</Typography>
									<Divider />
									<Typography
										variant="body1"
										color="text.secondary"
										mb={2}
										sx={{ mt: 2, mb: 2 }}
									>
										Subtotal:{' '}
										{cartItems
											?.reduce(
												(total: number, item: any) =>
													total + item.price,
												0
											)
											.toFixed(2)}{' '}
										€
										<br />
										Delivery & Handling: Free
										<hr />
										Total: 7€
									</Typography>
									<Divider />
									<Button
										variant="contained"
										color="primary"
										sx={{
											mt: 2,
											backgroundColor: '#0F1B4C',
											color: '#FFFFFF',
											border: '2px solid #0F1B4C',
											'&:hover': {
												backgroundColor: '#FFFFFF',
												color: '#0F1B4C',
											},
										}}
									>
										Checkout
									</Button>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				) : (
					<Typography variant="body1" mb={4}>
						Your cart is empty. &#128549;
					</Typography>
				)}
			</Container>
		</Box>
	);
}

export default Cart;
