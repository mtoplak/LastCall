import { Box, Typography, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import api from '../../services/api';
import InfoBox from 'components/ui/InfoBox';
import ImgContainer from 'components/ui/ImgContainer';
import HouseBox from 'components/ui/HouseBox';
import Image from 'components/ui/Image';
import { style } from 'assets/styles/styles';

interface DrinkProps {
	id: string;
	name: string;
	img: string;
	price: number;
}

const initialState = {
	title: '',
	drinkCategory: '',
	packaging: '',
	size: '',
	price: 0,
	stock: 0,
	seller: '645d45c444ddfe8a7fef8986',
};

const DrinkS: React.FC<DrinkProps> = ({ id, name, img, price }) => {
	const [productId, setProductId] = useState('');
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [drink, setDrink] = useState(initialState);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setDrink((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleFormSubmit = async () => {
		console.log(productId);
		try {
			const response = await api.patch(`/products/${productId}`, drink);
			console.log(response.data);
			setIsOpenEdit(!isOpenEdit);
		} catch (error) {
			console.error('Error updating drink:', error);
		}
	};

	const handleDeleteClick = async () => {
		try {
			await api.delete(`/products/${productId}`);
			console.log('Drink deleted successfully');
		} catch (error) {
			console.error('Error deleting drink:', error);
		}
	};

	return (
		<HouseBox>
			<ImgContainer>
				<Image src={img} alt="housePhoto" />
			</ImgContainer>

			<InfoBox>
				<Typography variant="h6" sx={{ fontWeight: '700' }}>
					{name}
				</Typography>
				<Typography variant="body1" sx={{ my: 1 }}>
					Cena: {price}€
				</Typography>
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
							setProductId(id);
							setIsOpenEdit(!isOpenEdit);
						}}
					>
						Edit
					</Button>
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
								Edit product
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
									value={drink.title}
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
									value={drink.drinkCategory}
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
									value={drink.packaging}
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
									value={drink.size}
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
									value={drink.price}
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
									value={drink.stock}
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
									Submit changes
								</Button>
							</Typography>
						</Box>
					</Modal>
					<Button
						variant="contained"
						color="error"
						onClick={(event) => {
							setProductId(id);
							setIsOpenDelete(!isOpenDelete);
						}}
					>
						Delete
					</Button>
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
								Are you sure you want to delete this product?
							</Typography>
							<Typography
								variant="body1"
								id="modal-modal-description"
							>
								<Button
									variant="contained"
									color="error"
									onClick={handleDeleteClick}
								>
									Yes
								</Button>
							</Typography>
						</Box>
					</Modal>
				</Box>
			</InfoBox>
		</HouseBox>
	);
};

export default DrinkS;
