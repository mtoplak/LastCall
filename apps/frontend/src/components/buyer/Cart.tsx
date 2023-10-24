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
	TextField,
	Modal,
	AlertTitle,
	IconButton,
	LinearProgress,
	CircularProgress,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import NavbarB from './NavbarB';
import { useUserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import api from 'services/api';
import { ICartItem } from 'models/cartItem';
import { Link } from 'react-router-dom';
import { IDrink } from 'models/drink';
import { checkoutButton, style } from 'assets/styles/styles';
import { getCurrentDate } from '../../utils/getCurrentDate';
import { ISeller } from 'models/seller';
import { useCartContext } from 'context/CartContext';
import payments from '../../assets/images/payments.jpg';
import { groupProductsBySeller } from 'utils/groupProductsBySeller';

interface GroupedProduct {
	product: IDrink;
	quantity: number;
}

interface SellerGroup {
	[seller: string]: GroupedProduct[];
}

function Cart() {
	const { user } = useUserAuth();
	const [cartItems, setCartItems] = useState<ICartItem[] | null>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [error, setError] = useState('');
	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [lastDateOfDelivery, setLastDateOfDelivery] = useState<string | Date>(
		getCurrentDate()
	);
	const [selectedSeller, setSelectedSeller] = useState<ISeller>();
	const [groupedProducts, setGroupedProducts] = useState<SellerGroup>({});
	const [isShownAlert, setIsShownAlert] = useState(false);
	const { setCartProducts } = useCartContext();
	const [isLoading, setIsLoading] = useState(false);
	const [checkEligibility, setCheckEligibility] = useState(false);
	const [isCheckoutAll, setIsCheckoutAll] = useState(false);
	const [isLoadingCart, setIsLoadingCart] = useState(true);

	useEffect(() => {
		if (!user) return;
		const fetchCart = async () => {
			setIsLoadingCart(true);
			try {
				const response = await api.post(
					'/cart/get',
					{ email: user.email },
					{
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					}
				);
				setCartItems(response.data.cart);
				setGroupedProducts(groupProductsBySeller(response.data.cart));
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoadingCart(false);
			}
		};
		if (user) fetchCart();
	}, [user]);

	useEffect(() => {
		document.title = 'Shopping Cart';
		window.scrollTo(0, 0);
	}, []);

	const handleRemoveFromCart = async (id: string) => {
		const response = await api.delete(`/cart/${user.email}/${id}`);
		setCartItems(response.data.cart);
		setCartProducts(response.data.cart);
		setGroupedProducts(groupProductsBySeller(response.data.cart));
	};

	const handleQuantityChange = async (id: string, quantity: number) => {
		const response = await api.post(
			`/cart/quantity`,
			{
				email: user.email,
				cart: {
					productId: id,
					quantity: quantity,
				},
			},
			{
				headers: {
					Authorization: user?.stsTokenManager?.accessToken,
				},
			}
		);
		setCartItems(response.data.cart);
		setGroupedProducts(groupProductsBySeller(response.data.cart));
	};

	const handleCheckEligibility = async () => {
		let coordinates: number[];
		try {
			const mapResponse = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${
					address + ' ' + city + ' ' + country
				}&addressdetails=1&limit=1&polygon_svg=1`
			);
			const mapData = await mapResponse.json();
			if (mapData.length === 0) {
				setError('Address not found');
				return;
			} else {
				coordinates = [Number(mapData[0].lat), Number(mapData[0].lon)];
			}
		} catch (error: any) {
			setError(error.response.data.message);
			return;
		}

		if (isCheckoutAll) {
			// Check out all sellers
			const sellerIds = Object.keys(groupedProducts);
			const requests = sellerIds.map(async (sellerId) => {
				const seller = groupedProducts[sellerId][0].product.seller;
				try {
					const response = await api.post('/distance/coordinates', {
						sellerEmail: seller.email,
						orderCoordinates: coordinates,
					});
					return response.data === true;
				} catch (error: any) {
					setError(error.response.data.message);
					//console.error(`Error occurred for seller ${sellerId}: ${error}`);
					return false;
				}
			});
			const results = await Promise.all(requests);
			const eligibility = results.every((result) => result); // Check if all sellers are eligible
			//console.log(eligibility);
			return eligibility;
		} else {
			// Check out selected seller only
			try {
				const response = await api.post('/distance/coordinates', {
					sellerEmail: selectedSeller?.email,
					orderCoordinates: coordinates,
				});
				//console.log(response.data);
				if (response.data === true) {
					return true;
				} else {
					setError(
						"Order address is outside the seller's maximum distance."
					);
					return false;
				}
			} catch (error: any) {
				setError(error.message);
			}
		}
	};

	const handleCheckMinPrice = async (
		selectedSeller?: any,
		isCheckoutAll?: boolean
	) => {
		if (isCheckoutAll) {
			const promises = Object.entries(groupedProducts).map(
				async ([sellerId, products]) => {
					const order = products.map((item: any) => ({
						productId: item.product._id,
						quantity: item.quantity,
					}));
					const response = await api.post('/orders/checkPrice', {
						seller: sellerId,
						products: order,
					});
					return response.data.meetsMinPriceRequirements;
				}
			);
			const results = await Promise.all(promises);
			const allMeetMinPrice = results.every((result) => result === true);
			if (allMeetMinPrice) {
				setCheckEligibility(true);
			} else {
				setError(
					'Order from one or more sellers does not meet minimum price requirement.'
				);
				setCheckEligibility(false);
			}
		} else {
			const order = groupedProducts[selectedSeller._id].map(
				(item: any) => ({
					productId: item.product._id,
					quantity: item.quantity,
				})
			);
			const response = await api.post('/orders/checkPrice', {
				seller: selectedSeller._id,
				products: order,
			});
			if (response.data.meetsMinPriceRequirements === true) {
				setCheckEligibility(true);
			} else {
				setError('Order does not meet the minimum price requirement.');
				setCheckEligibility(false);
			}
		}
	};

	const handleCheckout = async () => {
		const eligibibleDistance = await handleCheckEligibility();
		if (!eligibibleDistance) {
			return;
		}
		setIsLoading(true);
		const totalPrice =
			groupedProducts[selectedSeller!._id].reduce((accumulator, item) => {
				const itemTotalPrice = parseFloat(
					(
						item.quantity *
						parseFloat(item.product.price.toFixed(2))
					).toFixed(2)
				);
				return accumulator + itemTotalPrice;
			}, 0) + parseFloat(selectedSeller!.deliveryCost.toFixed(2));

		const order = groupedProducts[selectedSeller!._id].map((item) => {
			return {
				productId: item.product._id,
				quantity: item.quantity,
			};
		});
		try {
			const mapResponse = await fetch(
				`https://nominatim.openstreetmap.org/search?format=json&q=${
					address + ' ' + city + ' ' + country
				}&addressdetails=1&limit=1&polygon_svg=1`
			);
			const mapData = await mapResponse.json();
			if (mapData.length === 0) {
				setError('Address not found');
				return;
			} else {
				const coordinates = [mapData[0].lat, mapData[0].lon];
				await api.post(
					'/orders',
					{
						seller: selectedSeller?.email,
						buyer: user.email,
						address: address,
						city: city,
						country: country,
						lastDateOfDelivery: lastDateOfDelivery,
						products: order,
						totalPrice: totalPrice.toFixed(2),
						coordinates: coordinates,
					},
					{
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					}
				);
			}
			setIsOpenModal(false);
			setAddress('');
			setCity('');
			setCountry('');
			setLastDateOfDelivery(getCurrentDate());
			const updatedCartItems = cartItems!.filter(
				(item) => item.product.seller._id !== selectedSeller!._id
			);
			setCartProducts(updatedCartItems);
			setCartItems(updatedCartItems);
			setIsShownAlert(true);
			const updatedGroupedProducts = Object.fromEntries(
				Object.entries(groupedProducts).filter(
					([key]) => key !== selectedSeller!._id
				)
			);
			setGroupedProducts(updatedGroupedProducts);
			window.scrollTo(0, 0);
		} catch (error: any) {
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCheckoutAll = async () => {
		const maxDistance = await handleCheckEligibility();
		if (!maxDistance) {
			setError(
				"Order address is outside of one or more seller's maximum distance delivery."
			);
			return;
		}
		setIsLoading(true);
		try {
			const orders = Object.entries(groupedProducts).map(
				([sellerId, products]) => {
					const totalPrice =
						products.reduce((accumulator, item) => {
							const itemTotalPrice =
								item.quantity * item.product.price;
							return accumulator + itemTotalPrice;
						}, 0) + products[0].product.seller.deliveryCost;

					const order = products.map((item) => ({
						productId: item.product._id,
						quantity: item.quantity,
					}));

					return {
						seller: products[0].product.seller.email,
						buyer: user.email,
						address: address,
						city: city,
						country: country,
						lastDateOfDelivery: lastDateOfDelivery,
						products: order,
						totalPrice: totalPrice.toFixed(2),
						coordinates: products[0].product.seller.coordinates,
					};
				}
			);
			await Promise.all(
				orders.map((order) =>
					api.post('/orders', order, {
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					})
				)
			);
			setGroupedProducts({});
			setIsOpenModal(false);
			setAddress('');
			setCity('');
			setCountry('');
			setLastDateOfDelivery(getCurrentDate());
			setCartProducts([]);
			setCartItems([]);
			setIsShownAlert(true);
			await api.delete(`/cart/${user.email}`);
			window.scrollTo(0, 0);
		} catch (error: any) {
			setError(error.response?.data?.message || 'An error occurred');
		} finally {
			setIsCheckoutAll(false);
			setIsLoading(false);
		}
	};

	// Calculate subtotal price
	let subtotal = Object.values(groupedProducts).reduce((sum, sellerGroup) => {
		return (
			sum +
			sellerGroup.reduce((groupSum, groupedProduct) => {
				const productPrice = parseFloat(
					groupedProduct.product.price.toFixed(2)
				);
				const productQuantity = groupedProduct.quantity;
				return groupSum + productPrice * productQuantity;
			}, 0)
		);
	}, 0);

	subtotal = parseFloat(subtotal.toFixed(2));

	// Get unique sellers from groupedProducts
	const sellers = new Set(Object.keys(groupedProducts));

	// Calculate delivery and handling costs
	const deliveryCosts = Array.from(sellers).reduce((sum, sellerId) => {
		const sellerGroup = groupedProducts[sellerId];
		const sellerDeliveryCost = sellerGroup[0].product.seller.deliveryCost;
		return sum + sellerDeliveryCost;
	}, 0);

	const renderGroupedProducts = (groupedProducts: SellerGroup) => {
		return Object.entries(groupedProducts).map(([seller, products]) => (
			<Grid container spacing={2} key={seller} sx={{ mt: 5 }}>
				<Grid item xs={12} md={8}>
					<Typography variant="h6" component="h2">
						Seller: {products[0].product.seller.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Minimum price for delivery:{' '}
						{products[0].product.seller.minPrice} €
					</Typography>
					<Typography variant="body2" color="text.secondary" mb={2}>
						Maximum distance for delivery:{' '}
						{products[0].product.seller.maxDistance} km
					</Typography>
					{products.map((item) => (
						<Card
							key={item.product._id}
							sx={{
								py: 2,
								alignItems: 'flex-start',
								mb: 2,
							}}
						>
							<Grid container spacing={2}>
								<Grid item xs={12} md={3}>
									<Link to={`/product/${item.product._id}`}>
										<CardMedia
											component="img"
											alt={item.product.title}
											image={item.product.picture}
										/>
									</Link>
								</Grid>
								<Grid item xs={12} md={6}>
									<CardContent>
										<Typography variant="h6" component="h2">
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
											{item.product.price.toFixed(2)} €
										</Typography>
										{item.product?.discount !== 0 && (
											<Alert severity="info">
												There is currently a{' '}
												{item.product?.discount}%
												discount on this product!
												<br />
											</Alert>
										)}
									</CardContent>
								</Grid>
								<Grid item xs={12} md={3}>
									<CardActions>
										<Select
											value={item.quantity}
											variant="outlined"
											size="small"
											onChange={(event) =>
												handleQuantityChange(
													item.product._id,
													Number(event.target.value)
												)
											}
										>
											{Array.from(
												{ length: 500 },
												(_, index) => (
													<MenuItem
														key={index + 1}
														value={index + 1}
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
				<Grid item xs={12} md={4} sx={{ mt: 6, mb: 8 }}>
					<Card>
						<CardContent>
							<Typography variant="h6" component="h2" mb={2}>
								Total Amount
							</Typography>
							<Typography
								variant="body1"
								color="text.secondary"
								mb={2}
								sx={{ mt: 2, mb: 2 }}
							>
								Subtotal:{' '}
								{products
									.reduce(
										(total: number, item: any) =>
											total +
											item.product.price.toFixed(2) *
												item.quantity,
										0
									)
									.toFixed(2)}{' '}
								€<br />
								Delivery & Handling:{' '}
								{products[0].product.seller.deliveryCost} €
							</Typography>
							<Divider />
							<Typography
								variant="body1"
								color="text.secondary"
								mb={2}
								sx={{ mt: 2, mb: 2 }}
							>
								Total:{' '}
								{(
									products.reduce(
										(total: number, item: any) =>
											total +
											parseFloat(
												item.product.price.toFixed(2)
											) *
												item.quantity,
										0
									) + products[0].product.seller.deliveryCost
								).toFixed(2) + ' €'}
							</Typography>
							<Divider />
							<Button
								variant="contained"
								color="primary"
								sx={checkoutButton}
								onClick={(e) => {
									setIsOpenModal(true);
									setCheckEligibility(false);
									setSelectedSeller(
										products[0].product.seller
									);
									handleCheckMinPrice(
										products[0].product.seller
									);
								}}
							>
								Checkout
							</Button>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		));
	};

	return (
		<>
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<NavbarB />
				<Container>
					<Typography variant="h4" component="h1" mt={4} mb={2}>
						Shopping Cart
					</Typography>
					{isShownAlert && (
						<Alert
							severity="success"
							style={{ marginTop: '1rem' }}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={(e) => setIsShownAlert(false)}
								>
									<CloseOutlinedIcon fontSize="inherit" />
								</IconButton>
							}
						>
							<AlertTitle>Order placed!</AlertTitle>
							Go to{' '}
							<Link to="/orders">
								<span className="blackLink">orders</span>
							</Link>{' '}
							to see details.
						</Alert>
					)}
					{isLoadingCart ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
						>
							<CircularProgress color="inherit" />
						</Grid>
					) : cartItems && cartItems.length > 0 ? (
						<>
							{renderGroupedProducts(
								groupProductsBySeller(cartItems)
							)}
							{Object.keys(groupedProducts).length > 1 && (
								<Box sx={{ width: '100%' }} marginTop={'1rem'}>
									<Card>
										<CardContent>
											<Typography
												variant="h6"
												component="h2"
												mb={2}
											>
												Cart Summary
											</Typography>
											<Typography
												variant="body1"
												color="text.secondary"
												mb={2}
												sx={{ mt: 2, mb: 2 }}
											>
												Subtotal: {subtotal.toFixed(2)}{' '}
												€
												<br />
												Delivery & Handling:{' '}
												{deliveryCosts.toFixed(2)} €
											</Typography>
											<Divider />
											<Typography
												variant="body1"
												color="text.secondary"
												mb={2}
												sx={{ mt: 2, mb: 2 }}
											>
												Total:{' '}
												{(
													subtotal + deliveryCosts
												).toFixed(2)}{' '}
												€
											</Typography>
											<Divider />
											<Button
												variant="contained"
												color="primary"
												sx={checkoutButton}
												onClick={() => {
													setIsOpenModal(true);
													setIsCheckoutAll(true);
													setCheckEligibility(false);
													handleCheckMinPrice(
														undefined,
														true
													);
													setIsCheckoutAll(true);
												}}
											>
												Checkout All
											</Button>
										</CardContent>
									</Card>
								</Box>
							)}
						</>
					) : (
						<Typography variant="body1" mb={4}>
							Your cart is empty. &#128549;
						</Typography>
					)}
				</Container>
				<br />
			</Box>
			<Modal
				open={isOpenModal}
				onClose={() => {
					setIsOpenModal(false);
					setError('');
					setIsCheckoutAll(false);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="form" sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Order Details
					</Typography>
					<br />
					<TextField
						label="Address"
						placeholder="Enter address"
						type="text"
						fullWidth
						required
						name="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						label="City"
						placeholder="Enter city"
						type="text"
						fullWidth
						required
						name="city"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						label="Country"
						placeholder="Enter country"
						type="text"
						fullWidth
						required
						name="country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						sx={{ mb: 2 }}
					/>
					<TextField
						sx={{ mt: 2, mb: 2 }}
						id="date"
						label="Last day of delivery"
						type="date"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						value={lastDateOfDelivery}
						onChange={(e) => setLastDateOfDelivery(e.target.value)}
					/>
					{error !== '' && (
						<>
							<Alert severity="error">
								<b>{error}</b>
							</Alert>
							<br />
						</>
					)}
					{isLoading && <LinearProgress color="inherit" />}
					<Typography sx={{ mt: 2 }}>
						<img
							src={payments}
							alt="heroImg"
							style={{ width: '100%' }}
						/>
						<Button
							sx={{ mt: 2 }}
							color="primary"
							variant="contained"
							fullWidth
							disabled={!checkEligibility}
							onClick={
								isCheckoutAll
									? handleCheckoutAll
									: handleCheckout
							}
						>
							Buy
						</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	);
}

export default Cart;
