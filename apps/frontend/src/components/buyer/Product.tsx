import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
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
import { Link } from 'react-router-dom';
import { useUserAuth } from 'context/AuthContext';
import { useCartContext } from 'context/CartContext';
import { isProductInArray } from 'utils/isProductInArray';
import NavbarS from 'components/seller/NavbarS';
import Page404 from 'components/404/Page404';

function Product() {
	const [drink, setDrink] = useState<IDrink>();
	const [fetchError, setFetchError] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const [showAlert, setShowAlert] = useState(false);
	const [showWarning, setShowWarning] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams<{ id: string }>();
	const { user, role } = useUserAuth();
	const { cartProducts, setCartProducts } = useCartContext();

	useEffect(() => {
		const fetchProductData = async () => {
			try {
				const response = await api.get(`/products/${id}`);
				setDrink(response.data);
			} catch (error) {
				setFetchError(true);
				throw error;
			} finally {
				setIsLoading(false);
			}
		};
		fetchProductData();
	}, [id]);

	useEffect(() => {
		if (drink) {
			document.title = `Last Call | ${drink.title}`;
		}
		window.scrollTo(0, 0);
	}, [drink]);

	if (fetchError) {
		return <Page404 notFound="Product" />;
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
				if (drink) {
					setCartProducts([
						...cartProducts,
						{ product: drink, quantity: quantity },
					]);
				}
			}
		} catch (error: any) {
			console.error(error);
			throw error;
		}
	};

	return (
		<>
			{role === 'seller' ? <NavbarS /> : <NavbarB />}
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '80vh' }}>
				<Container style={{ paddingBottom: '3rem' }} sx={{ pt: 5 }}>
					{!(role === 'seller' || role === 'buyer') && (
						<Alert
							severity="error"
							style={{ marginBottom: '3rem' }}
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
					{isLoading ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							style={{ minHeight: '200px' }}
						>
							<CircularProgress color="inherit" />
						</Grid>
					) : (
						<Paper sx={{ mb: 2 }}>
							<Grid container spacing={2}>
								<Grid item md={5} xs={12} sm={12}>
									<Box
										sx={{
											my: '1rem',
											mx: 'auto',
											textAlign: 'center',
											maxWidth: '100%',
											'@media (max-width: 900px)': {
												maxWidth: '60%',
											},
										}}
									>
										<img
											src={drink?.picture}
											alt="heroImg"
											style={{
												width: '100%',
												height: 'auto',
											}}
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
											{drink?.actualPrice !==
											drink?.price ? (
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
														{' '}
														{drink?.actualPrice.toFixed(
															2
														)}{' '}
														€
													</Typography>
													<Typography
														variant="body1"
														sx={{
															color: 'error.main',
														}}
														gutterBottom
													>
														{drink?.price.toFixed(
															2
														)}{' '}
														€
													</Typography>
												</>
											) : (
												<Typography variant="body1">
													Price:{' '}
													{drink?.actualPrice.toFixed(
														2
													)}{' '}
													€
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
														primary={
															'Size: ' +
															drink?.size
														}
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
										{drink?.discount !== 0 && (
											<Alert
												severity="info"
												sx={{ mb: 2, mt: 1 }}
											>
												There is currently a{' '}
												{drink?.discount}% discount on
												this product!
												<br />
											</Alert>
										)}
										{role === 'buyer' && (
											<Box>
												<Divider />
												<Typography
													variant="h6"
													component="span"
													sx={{ flex: '1' }}
												>
													Add product to cart
													<Box
														display="flex"
														alignItems="center"
														sx={{ mt: 1 }}
														gap={10}
													>
														<Box flex="1">
															<TextField
																value={quantity}
																inputProps={{
																	min: 1,
																}}
																onChange={(
																	e
																) => {
																	let value =
																		Number(
																			e
																				.target
																				.value
																		);
																	if (
																		value <
																		1
																	) {
																		value = 1;
																	} else if (
																		value >
																		200
																	) {
																		setQuantity(
																			200
																		);
																	} else {
																		setQuantity(
																			Number(
																				value
																			)
																		);
																	}
																}}
																label="Quantity"
																placeholder="1"
																type="number"
																fullWidth
															/>
														</Box>
														<Box>
															<Button
																onClick={
																	addToCart
																}
															>
																Add to cart
															</Button>
														</Box>
													</Box>
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
										<Divider sx={{ mb: 1, mt: 2 }} />
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
					)}
				</Container>
			</Box>
		</>
	);
}

export default Product;
