import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	CircularProgress,
	Container,
	Divider,
	FormControl,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { useUserAuth } from 'context/AuthContext';
import { IDrink } from 'models/drink';
import { useEffect, useState } from 'react';
import api from 'services/api';
import NavbarS from './NavbarS';
import { getDiscountColor } from 'utils/getDiscountColor';
import { Link } from 'react-router-dom';

function Sales() {
	const [products, setProducts] = useState<IDrink[]>([]);
	const [checked, setChecked] = useState<IDrink[]>([]);
	const [discountAmount, setDiscountAmount] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUserAuth();

	useEffect(() => {
		if (!user) return;
		const fetchProducts = async () => {
			try {
				const response = await api.get(
					`/sellers/productsbyemail/${user.email}`
				);
				setProducts(response.data);
			} catch (error) {
				// Handle error
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [user]);

	const handleToggle = (product: IDrink) => () => {
		const isChecked = checked.some(
			(checkedProduct) => checkedProduct._id === product._id
		);
		const newChecked = isChecked
			? checked.filter(
					(checkedProduct) => checkedProduct._id !== product._id
			  )
			: [...checked, product];

		setChecked(newChecked);
	};

	const handleAddSale = async () => {
		try {
			const productIds = checked.map((product) => product._id);
			const response = await api.post('/products/sale', {
				productIds,
				discount: parseFloat(discountAmount),
			});
			const updatedProducts = products.map((product) => {
				// Check if the current product ID exists in the updated product data
				const updatedProduct = response.data.find(
					(updatedProduct: { _id: string }) =>
						updatedProduct._id === product._id
				);
				// If the updated product is found, return it; otherwise, return the original product
				return updatedProduct ? updatedProduct : product;
			});
			setProducts(updatedProducts);
			setChecked([]);
			setDiscountAmount('');
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveSale = async () => {
		try {
			const productIds = checked.map((product) => product._id);
			const response = await api.post('/products/sale', {
				productIds,
				discount: 0,
			});
			// Update the products state with the removed sale information
			const updatedProducts = products.map((product) => {
				// Check if the current product ID exists in the updated product data
				const updatedProduct = response.data.find(
					(updatedProduct: { _id: string }) =>
						updatedProduct._id === product._id
				);
				// If the updated product is found, return it with the discount removed; otherwise, return the original product
				return updatedProduct
					? { ...updatedProduct, discount: 0 }
					: product;
			});
			setProducts(updatedProducts);
			setChecked([]);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		document.title = 'Sales';
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<NavbarS />
				<Container>
					<Typography
						variant="h4"
						component="h1"
						sx={{ mt: 6, mb: 4 }}
					>
						Product List
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<Card sx={{ mb: 3 }}>
								<CardContent>
									<Typography
										variant="h6"
										component="h2"
										mb={2}
									>
										Change sale
									</Typography>
									<Divider />
									<Box my={2}>
										<FormControl
											sx={{
												display: 'flex',
												flexDirection: 'column',
											}}
										>
											<TextField
												sx={{ mb: 2 }}
												label="Discount"
												placeholder="Enter discount percent"
												fullWidth
												value={discountAmount}
												onChange={(event) => {
													let value =
														event.target.value;
													// Remove any non-digit characters
													value = value.replace(
														/\D/g,
														''
													);
													// Ensure the value is within the specified range
													if (value === '') {
														setDiscountAmount('');
													} else {
														const numericValue =
															parseInt(value, 10);
														if (numericValue < 1) {
															setDiscountAmount(
																'1'
															);
														} else if (
															numericValue > 99
														) {
															setDiscountAmount(
																'99'
															);
														} else {
															setDiscountAmount(
																numericValue.toString()
															);
														}
													}
												}}
												inputProps={{
													min: 1,
													max: 99,
												}}
												InputProps={{
													endAdornment: '%',
												}}
											/>
											<Button
												variant="contained"
												color="primary"
												fullWidth
												onClick={handleAddSale}
											>
												Add sale
											</Button>
										</FormControl>
									</Box>
									<Divider />
									<Box mt={2}>
										<Button
											variant="contained"
											color="error"
											fullWidth
											onClick={handleRemoveSale}
										>
											Remove sale
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Grid>

						<Grid item xs={12} md={9}>
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
								products.map((product) => (
									<Card sx={{ mb: 3 }} key={product._id}>
										<Grid
											container
											spacing={2}
											sx={{ mt: 2, mb: 2 }}
										>
											<Grid item xs={1} sx={{ mt: 6 }}>
												<Checkbox
													checked={checked.some(
														(checkedProduct) =>
															checkedProduct._id ===
															product._id
													)}
													onChange={handleToggle(
														product
													)}
													inputProps={{
														'aria-label':
															'select order',
													}}
												/>
											</Grid>
											<Grid item xs={3}>
												<Link
													to={`/product/${product._id}`}
												>
													<CardMedia
														component="img"
														image={product.picture}
														sx={{
															maxHeight: 150,
															maxWidth: 150,
														}}
													/>
												</Link>
											</Grid>
											<Grid item xs={5}>
												<CardContent>
													<Typography
														variant="h6"
														component="h2"
													>
														<Link
															to={`/product/${product._id}`}
															className="blackLink"
														>
															<b>
																{product.title}
															</b>
														</Link>
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
													>
														ID: {product._id}
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
													>
														Original price:{' '}
														{product.actualPrice} €
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
													>
														Stock: {product.stock}
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
													>
														Size:{' '}
														{product.packaging},{' '}
														{product.size}
													</Typography>
												</CardContent>
											</Grid>
											<Grid item xs={3}>
												{product.discount !== 0 ? (
													<CardContent>
														Current discount:
														<Typography
															color={getDiscountColor(
																product.discount
															)}
														>
															<b>
																{
																	product.discount
																}
																%
															</b>
														</Typography>
														<Divider
															sx={{
																mt: 2,
																mb: 2,
															}}
														/>
														Price with discount:
														<Typography
															color={getDiscountColor(
																product.discount
															)}
														>
															<b>
																{product.price.toFixed(
																	2
																)}{' '}
																€
															</b>
														</Typography>
													</CardContent>
												) : (
													<CardContent>
														No discount
														<Divider
															sx={{
																mt: 2,
																mb: 2,
															}}
														/>
														Original price:
														<Typography
															color={getDiscountColor(
																product.discount
															)}
														>
															<b>
																{product.actualPrice.toFixed(
																	2
																)}{' '}
																€
															</b>
														</Typography>
													</CardContent>
												)}
											</Grid>
										</Grid>
									</Card>
								))
							)}
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

export default Sales;
