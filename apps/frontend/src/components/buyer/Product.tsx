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
	styled,
} from '@mui/material';
import { IDrink } from 'models/drink';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import NavbarB from './NavbarB';
import productImage from '../../assets/images/fanta.jpg';
import CustomBox from 'components/ui/CustomBox';

function Product() {
	const [drink, setDrink] = useState<IDrink>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/products/' + id);
				console.log(response.data);
				setDrink(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<CustomBox>
					<Box sx={{ flex: '1.25' }}>
						<img
							src={productImage}
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
								<Alert severity="info">
									There is currently no discount for this
									item!{' '}
								</Alert>
								<Alert severity="success">
									There is currently a discountNumber%
									discount for this item!{' '}
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
												label="Quantity"
												placeholder="1"
												type="number"
												fullWidth
											/>
										</Box>
										<Box>
											<Button>Add to basket</Button>
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
