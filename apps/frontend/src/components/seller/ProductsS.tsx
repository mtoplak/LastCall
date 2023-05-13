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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from 'react';
import { drinks } from '../data/data';
import Drink from './DrinkS';

const ProductsS = () => {
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
		flex: '0 0 33.33%', // Set the width to one-third of the container
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
				<Box></Box>
				<PropertiesTextBox>
					<Typography
						sx={{
							color: '#000339',
							fontSize: '35px',
							fontWeight: 'bold',
						}}
					>
						My products
						<Button onClick={handleOpen}>
							<IconButton>
								<AddCircleOutlineIcon />
							</IconButton>
						</Button>
						<Modal
							open={open}
							onClose={handleClose}
							aria-labelledby="modal-modal-title"
							aria-describedby="modal-modal-description"
						>
							<Box 
							 component="form"
							sx={style}>
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
											fullWidth
											required
										/>
										<TextField
											label="Description"
											placeholder="Enter description"
											fullWidth
											required
										/>
                                        <TextField
											label="Packaging"
											placeholder="Enter packaging"
											fullWidth
											required
										/>
										<TextField
											label="Size"
											placeholder="Enter size"
											fullWidth
											required
										/>
                                        <TextField
											label="Price"
											placeholder="Enter price"
											type="number"
											fullWidth
											required
										/>
										<TextField
											label="Stock"
											placeholder="Enter stock"
											type="number"
											fullWidth
											required
										/>
								</Typography>
								<Typography sx={{ mt: 2 }}>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									fullWidth
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
					{drinks.map((drink) => (
						<DrinkContainer key={drink.id}>
							<Drink
								name={drink.name}
								img={drink.img}
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
