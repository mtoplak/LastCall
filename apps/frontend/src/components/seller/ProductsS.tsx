import {
	Box,
	Button,
	Container,
	IconButton,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Drink from './DrinkS';
import { ChangeEvent, useState, useEffect } from 'react';
import api from 'services/api';
import { IDrink } from 'models/drink';
import drink1 from '../../assets/images/cocacola.jpg';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import DrinkContainer from 'components/ui/DrinkContainer';
import PropertiesBox from 'components/ui/PropertiesBox';
import { style } from 'assets/styles/styles';

const initialState = {
	title: '',
	drinkCategory: '',
	packaging: '',
	size: '',
	price: 0,
	stock: 0,
	seller: '645d45c444ddfe8a7fef8986',
};

const ProductsS = () => {
	const [newProduct, setNewProduct] = useState(initialState);
	const [drinks, setDrinks] = useState<IDrink[]>([]);
	const [isOpen, setIsOpen] = useState(false);

	const handleFormSubmit = async () => {
		try {
			const response = await api.post('/products', newProduct);
			console.log(response.data);
			setNewProduct(initialState);
		} catch (error) {
			console.error(error);
		}
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		setNewProduct((prevnewProduct) => ({
			...prevnewProduct,
			[name]: value,
		}));
	};

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

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', py: 10 }}>
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
						<IconButton onClick={() => setIsOpen(!isOpen)}>
							<AddCircleOutlineIcon />
						</IconButton>
						<Modal
							open={isOpen}
							onClose={() => setIsOpen(false)}
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
										value={newProduct.title}
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
										value={newProduct.drinkCategory}
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
										value={newProduct.packaging}
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
										value={newProduct.size}
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
										value={newProduct.price}
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
										value={newProduct.stock}
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
						drinks.map((drink, index) => (
							<DrinkContainer key={index}>
								<Drink
									id={drink._id}
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
