import {
	Box,
	Typography,
	Button,
	Modal,
	TextField,
	Alert,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Divider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import InfoBox from 'components/ui/InfoBox';
import ImgContainer from 'components/ui/ImgContainer';
import HouseBox from 'components/ui/HouseBox';
import Image from 'components/ui/Image';
import { style } from 'assets/styles/styles';
import { Link } from 'react-router-dom';
import { IDrink } from 'models/drink';
import { useUserAuth } from 'context/AuthContext';
import { ProductCategory } from 'enums/product.enum';

interface DrinkProps {
	drink: IDrink;
	setDrinks: React.Dispatch<React.SetStateAction<IDrink[]>>;
	drinks: IDrink[];
}

const initialState = {
	title: '',
	drinkCategory: '',
	packaging: '',
	size: '',
	actualPrice: 0,
	price: 0,
	stock: 0,
	seller: '',
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
}

const requiredFields: (keyof Product)[] = [
	'title',
	'drinkCategory',
	'packaging',
	'size',
	'actualPrice',
	'stock',
];

const DrinkS: React.FC<DrinkProps> = ({
	drink,
	setDrinks,
	drinks,
}: DrinkProps) => {
	const [productId, setProductId] = useState('');
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [selectedDrink, setSelectedDrink] = useState(initialState);
	const [error, setError] = useState('');
	const { user } = useUserAuth();

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setSelectedDrink((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleEditClick = async () => {
		setError('');
		for (const field of requiredFields) {
			if (!selectedDrink[field]) {
				setError(
					`${
						field.charAt(0).toUpperCase() + field.slice(1)
					} is required`
				);
				return;
			}
		}
		try {
			const response = await api.patch(
				`/products/${productId}`,
				selectedDrink,
				{
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				}
			);
			//console.log(response.data);
			const updatedDrinks = drinks.map((drink: any) => {
				if (drink._id === productId) {
					return response.data;
				}
				return drink;
			});
			setDrinks(updatedDrinks);
			setProductId('');
			setIsOpenEdit(false);
		} catch (error) {
			setError("Couldn't edit product");
		}
	};

	const handleDeleteClick = async () => {
		setError('');
		try {
			await api.delete(`/products/${productId}`, {
				headers: {
					Authorization: user?.stsTokenManager?.accessToken,
				},
			});
			//console.log('Drink deleted successfully');
			const updatedDrinks = drinks.filter(
				(drink: IDrink) => drink._id !== productId
			);
			//console.log(updatedDrinks);
			setDrinks(updatedDrinks);
			setIsOpenDelete(!isOpenDelete);
			setProductId('');
		} catch (error) {
			setError("Couldn't delete product");
			throw error;
		}
	};

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await api.get(`/products/${productId}`);
				setSelectedDrink(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchProduct();
	}, [productId]);

	const handleCloseModal = () => {
		setSelectedDrink(initialState);
		setIsOpenEdit(false);
		setIsOpenDelete(false);
	};

	return (
		<>
			<HouseBox sx={{ width: '300px', height: '450px' }}>
				<Link to={`/product/${drink._id}`}>
					<ImgContainer>
						<Image src={drink.picture} alt={drink.title} />
					</ImgContainer>
				</Link>
				<Divider />
				<InfoBox>
					<Link to={`/product/${drink._id}`}>
						<Typography
							variant="h6"
							sx={{ fontWeight: '700' }}
							style={{ color: 'black' }}
						>
							{drink.title}
						</Typography>
					</Link>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						{drink?.actualPrice !== drink?.price ? (
							<>
								<Typography
									variant="body1"
									sx={{
										textDecoration: 'line-through',
										color: 'text.secondary',
										mr: 1,
									}}
									gutterBottom
								>
									{' '}
									{drink?.actualPrice.toFixed(2)} €
								</Typography>
								<Typography
									variant="body1"
									sx={{ color: 'error.main' }}
									gutterBottom
								>
									{drink?.price.toFixed(2)} €
								</Typography>
							</>
						) : (
							<Typography variant="body1">
								{' '}
								{drink?.actualPrice.toFixed(2)} €
							</Typography>
						)}
					</Box>
					<Box>
						<Typography
							variant="body1"
							sx={{ color: 'text.secondary', mb: 1 }}
							gutterBottom
						>
							In stock: {drink?.stock}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
						}}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={(event) => {
								setProductId(drink._id);
								setIsOpenEdit(!isOpenEdit);
							}}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={(event) => {
								setProductId(drink._id);
								setIsOpenDelete(!isOpenDelete);
							}}
						>
							Delete
						</Button>
					</Box>
				</InfoBox>
			</HouseBox>
			<Modal
				open={isOpenDelete}
				onClose={() => setIsOpenDelete(!isOpenDelete)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						bgcolor: 'background.paper',
						border: '2px solid #000',
						boxShadow: 24,
						p: 4,
						textAlign: 'center',
					}}
				>
					<Typography
						variant="h6"
						id="modal-modal-title"
						component="h2"
					>
						Are you sure you want to delete the product{' '}
						<b>{selectedDrink.title}</b>?
					</Typography>
					<Typography variant="body1" id="modal-modal-description">
						{error && (
							<div>
								<br />
								<Alert severity="error">{error}</Alert>
							</div>
						)}
						<br />
						<Button
							variant="contained"
							onClick={() => setIsOpenDelete(!isOpenDelete)}
						>
							No
						</Button>
						<Button
							variant="contained"
							color="error"
							onClick={handleDeleteClick}
							sx={{ ml: 2 }}
						>
							Yes
						</Button>
					</Typography>
				</Box>
			</Modal>
			<Modal
				open={isOpenEdit}
				onClose={() => setIsOpenEdit(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="form" sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Edit product details of{' '}
						<b>{selectedDrink && selectedDrink.title}</b>
					</Typography>
					<br />
					<TextField
						label="Title"
						placeholder="Enter title"
						type="text"
						fullWidth
						required
						name="title"
						value={selectedDrink.title || ''}
						onChange={handleInputChange}
						sx={{ mb: 2 }}
					/>
					<FormControl fullWidth required sx={{ mb: 2 }}>
						<InputLabel id="drink-category-select" shrink>
							Drink category
						</InputLabel>
						<Select
							labelId="drink-category-select"
							id="drink-category-select"
							name="drinkCategory"
							value={selectedDrink.drinkCategory || ''}
							onChange={handleInputChange}
						>
							<MenuItem value="">Select drink category</MenuItem>
							{Object.values(ProductCategory).map((category) => (
								<MenuItem key={category} value={category}>
									{category}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<TextField
						label="Packaging"
						placeholder="Enter packaging"
						type="text"
						fullWidth
						required
						name="packaging"
						value={selectedDrink.packaging || ''}
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
						value={selectedDrink.size || ''}
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
						value={selectedDrink.actualPrice || 0}
						onChange={handleInputChange}
						sx={{ mb: 2 }}
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
						value={selectedDrink.stock || 0}
						onChange={handleInputChange}
						sx={{ mb: 2 }}
					/>
					{error && (
						<div>
							<Alert severity="error">{error}</Alert>
						</div>
					)}
					<br />
					<Typography>
						<Button
							variant="contained"
							fullWidth
							onClick={handleCloseModal}
							style={{ marginBottom: '1rem' }}
						>
							Cancel changes
						</Button>
						<Button
							color="primary"
							variant="contained"
							fullWidth
							onClick={handleEditClick}
						>
							Submit changes
						</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	);
};

export default DrinkS;
