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
	const { cartProducts, setCartProducts } = useCartContext();
	const [isLoading, setIsLoading] = useState(false);
	const [checkEligibility, setCheckEligibility] = useState(false);
	const [checkOutAll, setCheckOutAll] = useState(false);

	useEffect(() => {
		if (!user) return;
		const fetchCart = async () => {
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
		};
		if (user) fetchCart();
	}, [user]);

	const groupProductsBySeller = (cart: any) => {
		const groupedProducts: SellerGroup = {};

		for (const item of cart) {
			const seller = item.product.seller._id;
			if (!groupedProducts[seller]) {
				groupedProducts[seller] = [];
			}
			groupedProducts[seller].push(item);
		}

		return groupedProducts;
	};

	useEffect(() => {
		document.title = 'Shopping Cart';
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

		if (checkOutAll) {
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

			setCheckEligibility(eligibility);
		} else {
			// Check out selected seller only
			try {
				const response = await api.post('/distance/coordinates', {
					sellerEmail: selectedSeller?.email,
					orderCoordinates: coordinates,
				});
				//console.log(response);
				if (response.data === true) {
					setCheckEligibility(true);
				} else {
					setCheckEligibility(false);
					setError("Order address is outside the seller's maximum distance.")
				}
			} catch (error: any) {
				setError(error.message);
			}
		}
	};

	const handleCheckMinPrice = async (e: any, selectedSeller: any) => {
		e.preventDefault();
		if (checkOutAll) {
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
		const totalPrice =
			groupedProducts[selectedSeller!._id].reduce((accumulator, item) => {
				const itemTotalPrice = item.quantity * item.product.price;
				return accumulator + itemTotalPrice;
			}, 0) + selectedSeller!.deliveryCost;

		const order = groupedProducts[selectedSeller!._id].map((item) => {
			return {
				productId: item.product._id,
				quantity: item.quantity,
			};
		});
		setIsLoading(true);
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
		} catch (error: any) {
			setError(error.response.data.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCheckoutAll = async () => {
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

					const order = products.map((item) => {
						return {
							productId: item.product._id,
							quantity: item.quantity,
						};
					});

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
		} catch (error: any) {
			setError(error.response?.data?.message || 'An error occurred');
		} finally {
			setCheckOutAll(false);
			setIsLoading(false);
		}
	};

	// Calculate subtotal price
	const subtotal = Object.values(groupedProducts).reduce(
		(sum, sellerGroup) => {
			return (
				sum +
				sellerGroup.reduce((groupSum, groupedProduct) => {
					const productPrice = groupedProduct.product.price;
					const productQuantity = groupedProduct.quantity;
					return groupSum + productPrice * productQuantity;
				}, 0)
			);
		},
		0
	);

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
			<Grid container spacing={2} key={seller}>
				<Grid item xs={8}>
					<Typography variant="h6" component="h2" mb={2}>
						Seller: {products[0].product.seller.title}
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
								<Grid item xs={3}>
									<Link to={`/product/${item.product._id}`}>
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
											{item.product.price.toFixed(2)} €
										</Typography>
										{item.product?.discount !== 0 && (
									<Alert severity="success" sx={{ mb: 2 }}>
										There is currently a {item.product?.discount} %
										discount for this product!
										<br />
									</Alert>
								)}
									</CardContent>
								</Grid>
								<Grid item xs={3}>
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
				<Grid item xs={4} mt={6}>
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
											item.product.price * item.quantity,
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
											item.product.price * item.quantity,
										0
									) + products[0].product.seller.deliveryCost
								).toFixed(2)}{' '}
								€
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
										e,
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
					{cartItems && cartItems.length > 0 ? (
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
													setCheckOutAll(true);
													setCheckEligibility(false);
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
					<Button
						color="primary"
						variant="contained"
						fullWidth
						onClick={handleCheckEligibility}
					>
						Check if eligible for delivery
					</Button>
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
						<Alert severity="error">
							<b>{error}</b>
						</Alert>
					)}
					{isLoading && <LinearProgress color="inherit" />}
					<Typography sx={{ mt: 2 }}>
						<Button
							sx={{ mt: 2 }}
							color="primary"
							variant="contained"
							fullWidth
							disabled={!checkEligibility}
							onClick={
								checkOutAll ? handleCheckoutAll : handleCheckout
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
