import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	LinearProgress,
	MenuItem,
	Modal,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Drink from './DrinkS';
import { useState, useEffect } from 'react';
import api from 'services/api';
import { IDrink } from 'models/drink';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import DrinkContainer from 'components/ui/DrinkContainer';
import PropertiesBox from 'components/ui/PropertiesBox';
import { style } from 'assets/styles/styles';
import { MuiFileInput } from 'mui-file-input';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { useUserAuth } from 'context/AuthContext';
import { ProductCategory } from 'enums/product.enum';

const initialState = {
	title: '',
	drinkCategory: '',
	packaging: '',
	size: '',
	actualPrice: '',
	price: '',
	stock: '',
	seller: '',
	image: '',
};

interface Product {
	title: string;
	drinkCategory: ProductCategory;
	packaging: string;
	size: string;
	actualPrice: number;
	price: number;
	stock: number;
	seller: string;
	image: string;
}

const requiredFields: (keyof Product)[] = [
	'title',
	'drinkCategory',
	'packaging',
	'size',
	'actualPrice',
	'stock',
];

const ProductsS = () => {
	const [newProduct, setNewProduct] = useState(initialState);
	const [drinks, setDrinks] = useState<IDrink[]>([]);
	const [isOpenAdd, setIsOpenAdd] = useState(false);
	const [error, setError] = useState('');
	const [productImage, setProductImage] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingProduct, setIsLoadingProduct] = useState(false);
	const { user } = useUserAuth();

	const handleFormSubmit = async (imageURL: string) => {
		setError('');
		for (const field of requiredFields) {
			if (!newProduct[field]) {
				setError(
					`${
						field.charAt(0).toUpperCase() + field.slice(1)
					} is required`
				);
				return;
			}
		}
		setIsLoadingProduct(true);
		try {
			const updatedProduct = {
				...newProduct,
				seller: user.email,
				picture: imageURL,
			};
			const response = await api.post('/products', updatedProduct, {
				headers: {
					Authorization: user?.stsTokenManager?.accessToken,
				},
			});
			setNewProduct(initialState);
			setDrinks((prevDrinks) => [...prevDrinks, response.data]); // Add the new product to the existing drinks list
			setIsOpenAdd(false);
			setProductImage(null);
		} catch (error) {
			setError('Error adding product');
			console.error(error);
			setIsLoadingProduct(false);
		}
	};

	const handleInputChange = (event: any) => {
		event.preventDefault();
		const { name, value } = event.target;
		setNewProduct((prevnewProduct) => ({
			...prevnewProduct,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (!user) return;
		const fetchSellerProducts = async () => {
			try {
				const response = await api.get(
					`/sellers/productsbyemail/${user.email}`
				);
				setDrinks(response.data);
			} catch (error) {
				throw error;
			} finally {
				setIsLoading(false);
			}
		};
		fetchSellerProducts();
	}, [user]);

	const handleChange = (newFile: any) => {
		if (newFile) {
			if (newFile.type.startsWith('image/')) {
				// The uploaded file is an image
				setError('');
				setProductImage(newFile);
			} else {
				// The uploaded file is not an image
				setError('File is not an image');
				console.log(newFile.type);
			}
		} else {
			setError('No file uploaded');
		}
	};

	const uploadImage = async () => {
		if (!productImage) {
			setError('Image is required');
			return;
		}
		const storageRef = ref(storage, `images/${productImage.name + v4()}`);
		try {
			const uploadTask = uploadBytes(storageRef, productImage);
			const response = await uploadTask;
			const downloadURL = await getDownloadURL(response.ref);
			setNewProduct((prevNewProduct) => {
				const updatedProduct = {
					...prevNewProduct,
					image: downloadURL,
				};
				handleFormSubmit(downloadURL); // Call handleFormSubmit immediately after the state update
				return updatedProduct;
			});
		} catch (error: any) {
			setError(error);
		}
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', py: 10, minHeight: '80vh' }}>
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
						<IconButton onClick={() => setIsOpenAdd(!isOpenAdd)}>
							<AddCircleOutlineIcon />
						</IconButton>
						<Modal
							open={isOpenAdd}
							onClose={() => setIsOpenAdd(false)}
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
								<br />
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
								<FormControl fullWidth required sx={{ mb: 2 }}>
									<InputLabel
										id="drink-category-select"
										shrink
									>
										Drink category
									</InputLabel>
									<Select
										labelId="drink-category-select"
										id="drink-category-select"
										name="drinkCategory"
										value={newProduct.drinkCategory || ''}
										onChange={handleInputChange}
									>
										<MenuItem value="">
											Select drink category
										</MenuItem>
										{Object.values(ProductCategory).map(
											(category) => (
												<MenuItem
													key={category}
													value={category}
												>
													{category}
												</MenuItem>
											)
										)}
									</Select>
								</FormControl>
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
									name="actualPrice"
									value={newProduct.actualPrice}
									onChange={handleInputChange}
									sx={{ mb: 2 }}
									inputProps={{
										min: 0,
										pattern: '[0-9]*', // Allows only positive numbers
									}}
									InputProps={{
										endAdornment: '€',
									}}
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
									inputProps={{
										min: 1,
									}}
								/>
								<MuiFileInput
									value={productImage}
									onChange={handleChange}
									style={{ cursor: 'pointer' }}
								/>
								<br />
								<br />
								{error && (
									<Alert severity="error">
										<b>{error}</b>
									</Alert>
								)}
								{isLoadingProduct && (
									<LinearProgress color="inherit" />
								)}
								<Typography sx={{ mt: 2 }}>
									<Button
										color="primary"
										variant="contained"
										fullWidth
										onClick={uploadImage}
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
					{isLoading ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							style={{ minHeight: '200px' }}
						>
							<CircularProgress color="inherit" />
						</Grid>
					) : drinks.length === 0 ? (
						<>No products. &#128549;</>
					) : (
						drinks.map((drink: IDrink, index: number) => (
							<DrinkContainer key={index}>
								<Drink
									drink={drink}
									setDrinks={setDrinks}
									drinks={drinks}
								/>
							</DrinkContainer>
						))
					)}
				</PropertiesBox>
			</Container>
		</Box>
	);
};

export default ProductsS;
