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
	Paper,
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

	const CustomBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'center',
		gap: theme.spacing(5),
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
		},
	}));

	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
			<NavbarB />
			<Container>
				<CustomBox>
					<Box sx={{ flex: '1.25' }}>
						<img
							src={productImage}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '10rem' }}
						/>
					</Box>
					<Box
						sx={{
							flex: '1',
							marginTop: '10rem',
							minHeight: '52vh',
						}}
					>
						<Card>
							<CardContent>
								<Typography
									variant="h4"
									component="h2"
									gutterBottom
								>
									Product title
								</Typography>
								<Typography color="textSecondary" gutterBottom>
									Price: $number
								</Typography>
								<Divider />
								<br />
								<Typography
									variant="h6"
									component="h4"
									sx={{ flex: '1' }}
								>
									Description:
									<List>
										<ListItem>
											<ListItemText primary="Size: size" />
										</ListItem>
										<ListItem>
											<ListItemText primary="Packaging: packaging" />
										</ListItem>
										<ListItem>
											<ListItemText primary="Drink category: category" />
										</ListItem>
									</List>
								</Typography>
								<Divider />
								<br />
								<Typography>
									<Alert severity="info">
										There is currently no discount for this
										item!{' '}
									</Alert>
									<Alert severity="success">
										There is currently a discountNumber%
										discount for this item!{' '}
									</Alert>
								</Typography>
								<br />
								<Divider />
								<br />
								<Typography
									variant="h6"
									component="h4"
									sx={{ flex: '1' }}
								>
									Add to basket:
									<Box
										display="flex"
										alignItems="center"
										gap={2}
									>
										<Box flex="1">
											<TextField
												label="Add number of wanted articles"
												placeholder="1"
												type="number"
												fullWidth
											/>
										</Box>
										<Box>
											<Button>Add product</Button>
										</Box>
									</Box>
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
