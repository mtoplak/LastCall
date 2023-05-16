import {
	Box,
	Button,
	Container,
	Icon,
	IconButton,
	Modal,
	styled,
	TextField,
	Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { drinks } from '../data/data';
import Drink from './DrinkS';
import React, { ChangeEvent, useState, useEffect } from 'react';
import api from 'services/api';
import { IDrink } from 'models/drink';
import drink1 from '../../assets/images/cocacola.jpg';

const ProductsS = () => {
	//post
	const [formData, setFormData] = useState({
		title: '',
		drinkCategory: '',
		packaging: '',
		size: '',
		price: 0,
		stock: 0,
		seller: '645d45c444ddfe8a7fef8986',
	});

	const handleFormSubmit = async () => {
		try {
			const response = await api.post('/products', formData);
			console.log(response.data);
			setFormData({
				title: '',
				drinkCategory: '',
				packaging: '',
				size: '',
				price: 0,
				stock: 0,
				seller: '645d45c444ddfe8a7fef8986',
			});
		} catch (error) {
			// Handle the error
			console.error(error);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};
	//...

	//get
	const [drinks2, setDrinks] = useState<IDrink[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/products');
				console.log(response.data);
				setDrinks(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, []);
	//...

	const PropertiesBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap', // Allow products to wrap to the next line
		marginTop: theme.spacing(5),
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	}));

	const DrinkContainer = styled(Box)(({ theme }) => ({
		flex: '0 0 25.33%', // Set the width to one-third of the container
		marginBottom: theme.spacing(4), // Add some margin between the products
	}));

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
	};

	const PropertiesTextBox = styled(Box)(({ theme }) => ({
		[theme.breakpoints.down('md')]: {
			textAlign: 'center',
		},
	}));

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Box sx={{ mt: 5, backgroundColor: 'white', py: 10 }}>
			<Container>
				<PropertiesTextBox>
					<Typography
						sx={{
							color: '#000339',
							fontSize: '35px',
							fontWeight: 'bold',
						}}
					>
						My products
						<IconButton onClick={handleOpen}>
							<AddCircleOutlineIcon />
						</IconButton>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box component="form" sx={style}>
								<Typography
									id="modal-modal-title"
									variant="h6"
									component="h2"
								>
									Add product
								</Typography>
								<Typography
									id="modal-modal-description"
									sx={{ mt: 2 }}
								>
									<TextField
										label="Title"
										placeholder="Enter title"
										type="text"
										fullWidth
										required
										name="title"
										value={formData.title}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
									<TextField
										label="Drink category"
										placeholder="Enter drink category"
										type="text"
										fullWidth
										required
										name="drinkCategory"
										value={formData.drinkCategory}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
									<TextField
										label="Packaging"
										placeholder="Enter packaging"
										type="text"
										fullWidth
										required
										name="packaging"
										value={formData.packaging}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
									<TextField
										label="Size"
										placeholder="Enter size"
										type="text"
										fullWidth
										required
										name="size"
										value={formData.size}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
									<TextField
										label="Price"
										placeholder="Enter price"
										type="number"
										fullWidth
										required
										name="price"
										value={formData.price}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
									<TextField
										label="Stock"
										placeholder="Enter stock"
										type="number"
										fullWidth
										required
										name="stock"
										value={formData.stock}
										onChange={handleInputChange}
										sx={{ mb: 2 }}
									/>
								</Typography>
								<Typography sx={{ mt: 2 }}>
									<Button
										color="primary"
										variant="contained"
										fullWidth
										onClick={handleFormSubmit}
									>
										Add
									</Button>
								</Typography>
							</Box>
						</Modal>
					</Typography>
					<Typography
						sx={{ color: '#5A6473', fontSize: '16px', mt: 1 }}
					>
						All the items in my inventory.
					</Typography>
				</PropertiesTextBox>

				<PropertiesBox>
					{drinks &&
						drinks2.map((drink, index) => (
							<DrinkContainer key={index}>
								<Drink
									id={drink.id}
									name={drink.title}
									img={drink1}
									price={drink.price}
								/>
							</DrinkContainer>
						))}
				</PropertiesBox>
			</Container>
		</Box>
	);
};

export default ProductsS;
