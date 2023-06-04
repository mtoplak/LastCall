import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IDrink } from 'models/drink';
import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import CustomBox from 'components/ui/CustomBox';
import { Link } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import { useCartContext } from 'context/CartContext';
import { isProductInArray } from 'utils/isProductInArray';
import NavbarS from 'components/seller/NavbarS';

function Product() {
	const [drink, setDrink] = useState<IDrink>();
	const [fetchError, setFetchError] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [showAlert, setShowAlert] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { user, role } = useUserAuth();
	const { cartProducts, setCartProducts } = useCartContext();

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const response = await api.get('/products/' + id);
				setDrink(response.data);
			} catch (error) {
				setFetchError(true);
				throw error;
			}
		};
		fetchProductData();
	}, [id]);

	useEffect(() => {
		if (drink) {
			document.title = `Last Call | ${drink.title}`;
		}
	}, [drink]);

	if (fetchError) {
		return <>Product Not found</>;
	}

	if (!drink) {
		return null; // Render a loader or placeholder here
	}

	const addToCart = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		if (!user || role !== 'buyer' || !user.emailVerified) {
			setShowWarning(true);
			return;
		}
		try {
			const response = await api.post(
				`/cart/add`,
				{
					email: user.email,
					cart: [
						{
							productId: id,
							quantity: quantity,
						},
					],
				},
				{
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				}
			);
			setShowAlert(true);
			if (!isProductInArray(cartProducts, id)) {
				setCartProducts([
					...cartProducts,
					{ product: drink, quantity: quantity },
				]);
			}
		} catch (error: any) {
			console.error(error);
			throw error;
		}
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2' }}>
			{role === 'seller' ? <NavbarS /> : <NavbarB />}
			<Container style={{ paddingBottom: '3rem' }} sx={{ mt: 5 }}>
				{!(role === 'seller' || role === 'buyer') && (
					<Alert
						severity="error"
						style={{ marginBottom: '3rem' }}
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setShowWarning(false);
								}}
							>
								<CloseOutlinedIcon fontSize="inherit" />
							</IconButton>
						}
					>
						<AlertTitle>
							You must be logged in to add items to cart.
						</AlertTitle>
						Go to{' '}
						<Link to="/buy/signin">
							<span className="blackLink">sign in</span>
						</Link>
						.
					</Alert>
				)}
				<Paper sx={{ mb: 2 }}>
					<Grid container spacing={2}>
						<Grid item md={5} xs={12}>
							<Box sx={{ my: '1rem', mx: '1rem' }}>
								<img
									src={drink?.picture}
									alt="heroImg"
									style={{ maxWidth: '100%' }}
								/>
							</Box>
						</Grid>
						<Divider orientation="vertical" flexItem />
						<Grid item md={6} xs={12} sx={{ my: '1rem' }}>
							<Box
								sx={{
									minHeight: '52vh',
									mx: '1rem',
								}}
							>
								<Typography
									variant="h4"
									component="span"
									gutterBottom
								>
									{drink?.title}
								</Typography>
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
												gutterBottom
											>
												Price:{' '}
												{drink.actualPrice.toFixed(2)} €
											</Typography>
											<Typography
												variant="body1"
												sx={{ color: 'error.main' }}
												gutterBottom
											>
												{drink.price.toFixed(2)} €
											</Typography>
										</>
									) : (
										<Typography variant="body1">
											Price:{' '}
											{drink.actualPrice.toFixed(2)} €
										</Typography>
									)}
								</Box>
								<Divider />
								<Typography
									variant="h6"
									component="span"
									sx={{ flex: '1' }}
								>
									<List>
										<ListItem>
											<ListItemText
												primary={
													'Category: ' +
													drink?.drinkCategory
												}
											/>
										</ListItem>
										<ListItem>
											<ListItemText
												primary={'Size: ' + drink?.size}
											/>
										</ListItem>
										<ListItem>
											<ListItemText
												primary={
													'Packaging: ' +
													drink?.packaging
												}
											/>
										</ListItem>
									</List>
								</Typography>
								<Divider />
								<br />
								{drink?.discount !== 0 && (
									<Alert severity="info" sx={{ mb: 2 }}>
										There is currently a {drink?.discount} %
										discount for this product!
										<br />
									</Alert>
								)}
								{role === 'buyer' && (
									<Box>
										<Typography
											variant="h6"
											component="span"
											sx={{ flex: '1' }}
										>
											Add product to cart
											<Box
												display="flex"
												alignItems="center"
												gap={10}
											>
												<Box flex="1">
													<TextField
														value={quantity}
														onChange={(e) =>
															setQuantity(
																Number(
																	e.target
																		.value
																)
															)
														}
														label="Quantity"
														placeholder="1"
														type="number"
														fullWidth
														inputProps={{
															min: 1,
														}}
													/>
												</Box>
												<Box>
													<Button onClick={addToCart}>
														Add to cart
													</Button>
												</Box>
											</Box>
											<p style={{ fontSize: '15px' }}>
												In stock: {drink?.stock}
											</p>
										</Typography>
									</Box>
								)}
								{showAlert && (
									<Alert
										severity="success"
										style={{
											marginTop: '1rem',
											marginBottom: '1rem',
										}}
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() =>
													setShowAlert(false)
												}
											>
												<CloseOutlinedIcon fontSize="inherit" />
											</IconButton>
										}
									>
										<AlertTitle>
											Product added to cart
										</AlertTitle>
										Go to{' '}
										<Link to="/cart">
											<span className="blackLink">
												cart
											</span>
										</Link>{' '}
										to checkout.
									</Alert>
								)}
								<Divider sx={{ mb: 1 }} />
								<Typography
									variant="h6"
									gutterBottom
									sx={{ ml: 1 }}
								>
									<Link
										to={`/supplier/${drink?.seller._id}`}
										className="blackLink"
									>
										{drink?.seller.title}
									</Link>
								</Typography>
								<Typography
									variant="subtitle1"
									gutterBottom
									sx={{ ml: 1 }}
								>
									{drink?.seller.address},{' '}
									{drink?.seller.city},{' '}
									{drink?.seller.country}
								</Typography>
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</Box>
	);
}

export default Product;
