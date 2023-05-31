import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
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

function Sales() {
	const [products, setProducts] = useState<IDrink[]>([]);
	const [checked, setChecked] = useState<IDrink[]>([]);
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

	//add value={discount amount} for textfield
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
						<Grid item xs={12} md={2}>
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
										<FormControl>
											<TextField
												sx={{ mb: 2 }}
												label="Discount"
												placeholder="Enter discount amount"
												fullWidth
											></TextField>
											<Button
												variant="contained"
												color="primary"
												fullWidth
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
										>
											Remove sale
										</Button>
									</Box>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} md={10}>
							{products.map((product) => (
								<Card sx={{ mb: 3 }} key={product._id}>
									<Grid container spacing={2} sx={{mt:2, mb: 2}}>
										<Grid item xs={1} sx={{ mt: 6 }}>
											<Checkbox
												checked={checked.some(
													(checkedProduct) =>
														checkedProduct._id ===
														product._id
												)}
												onChange={handleToggle(product)}
												inputProps={{
													'aria-label':
														'select order',
												}}
											/>
										</Grid>
                                        <Grid item xs={3}>
											<CardMedia
												component="img"
												image={
													product.picture
												}
												sx={{
													maxHeight: 150,
                                                    maxWidth: 150,
												}}
											/>
										</Grid>
										<Grid item xs={5}>
											<CardContent>
												<Typography
													variant="subtitle1"
													component="h2"
												>
													<b>
														PRODUCT: {product.title}
													</b>
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
													Original price: €
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
													Size: {product.size},{' '}
													{product.packaging}
												</Typography>
											</CardContent>
										</Grid>
										<Grid item xs={3}>
											<CardContent>
												Current discount:
												<Typography>
													<b>discount%</b>
												</Typography>
                                                <Divider sx={{mt:2, mb: 2}}/>
                                                Price with discount:
												<Typography>
													<b>price</b>
												</Typography>
											</CardContent>
										</Grid>
									</Grid>
								</Card>
							))}
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}
export default Sales;
