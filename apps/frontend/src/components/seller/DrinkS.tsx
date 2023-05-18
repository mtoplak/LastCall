import {
	Box,
	styled,
	Typography,
	Button,
	Modal,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import api from '../../services/api';
import InfoBox from 'components/ui/InfoBox';
import ImgContainer from 'components/ui/ImgContainer';
import HouseBox from 'components/ui/HouseBox';
import Image from 'components/ui/Image';

interface DrinkProps {
	id: string;
	name: string;
	img: string;
	price: number;
}

const DrinkS: React.FC<DrinkProps> = ({ id, name, img, price }) => {
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

	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [productId, setProductId] = useState('');

	//patch
	const [formData, setFormData] = useState({
		title: '',
		drinkCategory: '',
		packaging: '',
		size: '',
		price: 0,
		stock: 0,
	});

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleEditClick = (id: string) => {
		setProductId(id);
		handleOpen();
	};

	const handleFormSubmit = async () => {
		console.log(productId);
		try {
			const response = await api.patch(
				`/products/${productId}`,
				formData
			);
			console.log('Drink updated successfully:', response.data);
			handleClose();
		} catch (error) {
			console.error('Error updating drink:', error);
		}
	};

	//delete
	const [openDelete, setOpenDelete] = React.useState(false);
	const handleOpenDelete = () => setOpenDelete(true);
	const handleCloseDelete = () => setOpenDelete(false);

	const handleRemoveClick = (id: string) => {
		setProductId(id);
		handleOpenDelete();
	};

	const handleDeleteClick = async () => {
		try {
			await api.delete(`/products/${productId}`);
			console.log('Drink deleted successfully');
			// Perform any necessary actions after deleting the product, such as updating the UI or fetching updated data
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
						onClick={(event) => handleEditClick(id)}
					>
						Edit
					</Button>
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
							<TextField
								label="Title"
								placeholder="Enter title"
								type="text"
								fullWidth
								required
								name="title"
								value={formData.title}
								onChange={handleInputChange}
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
							/>
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
					<Button
						variant="contained"
						color="error"
						onClick={(event) => handleRemoveClick(id)}
					>
						Delete
					</Button>
					<Modal
						open={openDelete}
						onClose={handleCloseDelete}
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
