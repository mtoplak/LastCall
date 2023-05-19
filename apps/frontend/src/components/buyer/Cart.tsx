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
} from '@mui/material';
import drink from '../../assets/images/cocacola.jpg';
import NavbarB from './NavbarB';

const cartItems = [
	{
		id: 1,
		name: 'Product 1',
		price: 29.99,
		image: drink,
		quantity: 1,
		discount: 10,
	},
	{
		id: 2,
		name: 'Product 2',
		price: 39.99,
		image: drink,
		quantity: 1,
		discount: 0,
	},
];

function Cart() {
	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<Typography variant="h4" component="h1" mt={4} mb={2}>
					Shopping Cart
				</Typography>
				{cartItems.length === 0 ? (
					<Typography variant="body1" mb={4}>
						Your cart is empty.
					</Typography>
				) : (
					<Grid container spacing={2}>
						<Grid item xs={8}>
							{cartItems.map((item) => (
								<Card
									key={item.id}
									sx={{
										py: 2,
										alignItems: 'flex-start',
										mb: 2,
									}}
								>
									<Grid container spacing={2}>
										<Grid item xs={3}>
											<CardMedia
												component="img"
												alt={item.name}
												image={item.image}
											/>
										</Grid>
										<Grid item xs={6}>
											<CardContent>
												<Typography
													variant="subtitle1"
													component="h2"
												>
													{item.name}
												</Typography>
												<Typography
													variant="body2"
													color="text.secondary"
												>
													Price: €
													{item.price.toFixed(2)}
												</Typography>
												{item.discount > 0 ? (
													<Alert severity="success">
														There is currently a{' '}
														{item.discount}%
														discount for this item!{' '}
													</Alert>
												) : (
													''
												)}
											</CardContent>
										</Grid>
										<Grid item xs={3}>
											<CardActions>
												<Button
													variant="text"
													size="small"
													color="error"
												>
													x
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
										{/* Calculate and display the total amount */}
										Total:{' '}
										{cartItems
											.reduce(
												(total, item) =>
													total + item.price,
												0
											)
											.toFixed(2)}{' '}
										€
										<br />
										Delivery & Handling: Free
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
				)}
			</Container>
		</Box>
	);
}

export default Cart;
