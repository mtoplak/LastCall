import {
	Alert,
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Divider,
	List,
	ListItem,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { IDrink } from 'models/drink';
import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import CustomBox from 'components/ui/CustomBox';

function Product() {
	const [drink, setDrink] = useState<IDrink>();
	const [fetchError, setFetchError] = useState(false);
	const [quantity, setQuantity] = useState(1);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/products/' + id);
				//console.log(response.data);
				setDrink(response.data);
			} catch (error) {
				setFetchError(true);
				throw error;
			}
		};
		fetchData();
	}, [id]);

	if (fetchError) {
		return <>Product Not found</>;
	}

	if (!drink) {
		return null; // Render a loader or placeholder here if desired
	}

	const addToCart = async (event: MouseEvent<HTMLElement>) => {
		event.preventDefault();
		try {
			const response = await api.post(
				'/buyers/' + '646b8b1be037f416c093266f' + '/cart', //TODO: get user id
				{
					cart: [
						{
							productId: id,
							quantity: quantity,
						},
					],
				}
			);
			console.log(response);
			console.log(response.data);
		} catch (error: any) {
			console.error(error);
			throw error;
		}
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<CustomBox>
					<Box sx={{ flex: '1.25' }}>
						<img
							src={drink?.picture}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '7rem' }}
						/>
					</Box>
					<Box
						sx={{
							flex: '1',
							marginTop: '7rem',
							minHeight: '52vh',
							marginBottom: '10rem',
						}}
					>
						<Card>
							<CardContent>
								<Typography
									variant="h4"
									component="span"
									gutterBottom
								>
									{drink?.title}
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									Price: {drink?.price} €
								</Typography>
								<Divider />
								<br />
								<Typography
									variant="h6"
									component="span"
									sx={{ flex: '1' }}
								>
									Description:
									<List>
										<ListItem>
											<ListItemText
												primary={
													'Drink category: ' +
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

								<Alert severity="success">
									There is currently a 25% discount for this
									item!{' '}
								</Alert>
								<br />
								<Divider />
								<br />
								<Typography
									variant="h6"
									component="span"
									sx={{ flex: '1' }}
								>
									Add this product to basket:
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
														Number(e.target.value)
													)
												}
												label="Quantity"
												placeholder="1"
												type="number"
												fullWidth
											/>
										</Box>
										<Box>
											<Button onClick={addToCart}>
												Add to basket
											</Button>
										</Box>
									</Box>
									<p style={{ fontSize: '15px' }}>
										In stock: {drink?.stock}
									</p>
								</Typography>
							</CardContent>
						</Card>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
}

export default Product;
