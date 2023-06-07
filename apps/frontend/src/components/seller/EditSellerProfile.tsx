import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	Paper,
	Select,
	TextField,
	Typography,
	MenuItem,
	Checkbox,
	ListItemText,
	OutlinedInput,
	Alert,
	Modal,
	Divider,
	IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from 'services/api';
import NavbarS from './NavbarS';
import { useUserAuth } from 'context/AuthContext';
import { SellerType } from 'enums/seller.enum';
import { style } from 'assets/styles/styles';
const markets = ['Slovenia', 'Italy', 'France', 'Austria', 'United Kingdom'];

interface SellerProfile {
	name: string;
	surname: string;
	title: string;
	country: string;
	city: string;
	address: string;
	registerNumber: number;
	companyType: SellerType;
	phone: string;
	website: string;
	targetedMarkets: string[];
	maxDistance: number;
	minPrice: number;
	deliveryCost: number;
}

const initialState = {
	name: '',
	surname: '',
	title: '',
	country: '',
	city: '',
	address: '',
	registerNumber: 0,
	companyType: SellerType.OTHER,
	phone: '',
	website: '',
	targetedMarkets: [],
	maxDistance: 0,
	minPrice: 0,
	deliveryCost: 0,
};

function EditSellerProfile() {
	const { user, deleteAccount } = useUserAuth();
	const [sellerProfile, setSellerProfile] =
		useState<SellerProfile>(initialState);
	const [alert, setAlert] = useState<string>('');
	const [isOpenModal, setIsOpenModal] = useState(false);

	useEffect(() => {
		if (!user) return;
		const fetchSellerProfile = async () => {
			try {
				const response = await api.get(`sellers/get/${user.email}`, {
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				});
				const profileData = response.data;
				setSellerProfile(profileData);
			} catch (error) {
				console.error('Error fetching seller profile:', error);
			}
		};

		fetchSellerProfile();
	}, [user]);

	const handleTargetedMarketsChange = (event: any) => {
		const selectedValues = event.target.value as string[];
		setSellerProfile((prevProfile) => ({
			...prevProfile,
			targetedMarkets: selectedValues,
		}));
	};

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(user.email);
		try {
			const response = await api.patch(
				`sellers/patch/${user.email}`,
				sellerProfile,
				{
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				}
			);
			setAlert('Profile updated successfully!');
		} catch (error) {
			throw error;
		}
	};

	const handleDeleteProfile = async () => {
		try {
			const response = await api.delete(`sellers/delete/${user.email}`, {
				headers: {
					Authorization: user?.stsTokenManager?.accessToken,
				},
			});
			await deleteAccount();
			setIsOpenModal(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		document.title = 'Edit profile | Seller';
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<NavbarS />
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<Container>
					<Box
						component="form"
						sx={{
							flex: '1',
							backgroundColor: '#f2f2f2',
						}}
						onSubmit={handleFormSubmit}
					>
						<Typography
							variant="h4"
							style={{
								textAlign: 'center',
							}}
							sx={{ py: 5 }}
						>
							Edit profile info
						</Typography>
						<Grid sx={{ pb: 2 }}>
							<Paper
								elevation={10}
								sx={{
									px: 4,
									mb: 3,
									pb: 2,
									maxWidth: 600,
									margin: '0 auto',
								}}
							>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<Typography variant="h6" sx={{ mb: 3 }}>
											Basic info
										</Typography>
										<TextField
											label="First Name"
											placeholder="Enter your first name"
											fullWidth
											required
											name="name"
											sx={{ mb: 2 }}
											value={sellerProfile.name}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													name: event.target.value,
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Last Name"
											placeholder="Enter your last name"
											fullWidth
											required
											name="surname"
											sx={{ mb: 2 }}
											value={sellerProfile.surname}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													surname: event.target.value,
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Company name"
											placeholder="Enter company name"
											fullWidth
											required
											name="title"
											sx={{ mb: 2 }}
											value={sellerProfile.title}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													title: event.target.value,
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Phone Number"
											placeholder="Enter phone number"
											fullWidth
											required
											name="phone"
											sx={{ mb: 2 }}
											value={sellerProfile.phone}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													phone: event.target.value,
												});
												setAlert('');
											}}
										/>
										<FormControl
											fullWidth
											required
											sx={{ mb: 2 }}
										>
											<InputLabel id="company-type-label">
												Company Type
											</InputLabel>
											<Select
												labelId="company-type-label"
												id="company-type"
												value={
													sellerProfile.companyType
												}
												name="companyType"
												onChange={(event) => {
													setSellerProfile({
														...sellerProfile,
														companyType: event
															.target
															.value as SellerType,
													});
													setAlert('');
												}}
											>
												{Object.values(SellerType).map(
													(type) => (
														<MenuItem
															key={type}
															value={type}
														>
															{type}
														</MenuItem>
													)
												)}
											</Select>
										</FormControl>
										<TextField
											label="Address"
											placeholder="Enter your address"
											fullWidth
											required
											name="address"
											sx={{ mb: 2 }}
											value={sellerProfile.address}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													address: event.target.value,
												});
												setAlert('');
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Typography variant="h6" sx={{ mb: 3 }}>
											Additional Information
										</Typography>
										<TextField
											label="City"
											placeholder="Enter your city"
											fullWidth
											required
											name="city"
											sx={{ mb: 2 }}
											value={sellerProfile.city}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													city: event.target.value,
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Country"
											placeholder="Enter your country"
											fullWidth
											required
											name="country"
											sx={{ mb: 2 }}
											value={sellerProfile.country}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													country: event.target.value,
												});
												setAlert('');
											}}
										/>
										<FormControl sx={{ width: '100%' }}>
											<InputLabel id="demo-multiple-checkbox-label">
												Targeted Markets
											</InputLabel>
											<Select
												labelId="demo-multiple-checkbox-label"
												id="demo-multiple-checkbox"
												multiple
												fullWidth
												input={
													<OutlinedInput label="Tag" />
												}
												name="targetedMarkets"
												sx={{ mb: 2 }}
												onChange={(event) => {
													handleTargetedMarketsChange(
														event
													);
													setAlert('');
												}}
												value={
													sellerProfile.targetedMarkets
												}
												renderValue={(
													selected: string[]
												) => selected.join(', ')}
											>
												{markets.map((market) => (
													<MenuItem
														key={market}
														value={market}
													>
														<Checkbox
															checked={sellerProfile.targetedMarkets.includes(
																market
															)}
														/>
														<ListItemText
															primary={market}
														/>
													</MenuItem>
												))}
											</Select>
										</FormControl>
										<TextField
											label="Website"
											placeholder="Enter website"
											fullWidth
											required
											name="website"
											sx={{ mb: 2 }}
											value={sellerProfile.website}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													website: event.target.value,
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Maximum distance for delivery"
											placeholder="Enter distance"
											fullWidth
											required
											name="maxDistance"
											sx={{ mb: 2 }}
											value={sellerProfile.maxDistance}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													maxDistance: parseInt(
														event.target.value
													),
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Minimum order value"
											placeholder="Enter minimum order value"
											fullWidth
											required
											name="minPrice"
											sx={{ mb: 2 }}
											value={sellerProfile.minPrice}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													minPrice: parseFloat(
														event.target.value
													),
												});
												setAlert('');
											}}
										/>
										<TextField
											label="Delivery cost"
											placeholder="Enter delivery cost"
											fullWidth
											required
											name="deliveryCost"
											sx={{ mb: 2 }}
											value={sellerProfile.deliveryCost}
											onChange={(event) => {
												setSellerProfile({
													...sellerProfile,
													deliveryCost: parseFloat(
														event.target.value
													),
												});
												setAlert('');
											}}
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									fullWidth
								>
									Confirm
								</Button>
								{alert && (
									<>
										<Alert
											severity="success"
											sx={{ mt: 2 }}
										>
											{alert}
										</Alert>
									</>
								)}
								<Divider sx={{ my: 1 }}/>
								<Grid
									container
									justifyContent="flex-end"
								>
									<IconButton
										onClick={() => {
											setIsOpenModal(true);
										}}
										sx={{ color: 'gray' }}
									>
										<Typography variant="body2">
											Delete my account.
										</Typography>
										<DeleteIcon />
									</IconButton>
								</Grid>
							</Paper>
						</Grid>
					</Box>
				</Container>
			</Box>
			<Modal
				open={isOpenModal}
				onClose={() => {
					setIsOpenModal(false);
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="form" sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
						textAlign="center"
					>
						Are you sure you want to delete your account? You will
						also delete all your products.
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Button
							sx={{ mt: 2, width: '48%' }}
							color="primary"
							variant="contained"
							onClick={() => {
								setIsOpenModal(false);
							}}
						>
							No
						</Button>
						<Button
							sx={{ mt: 2, width: '48%' }}
							color="error"
							variant="contained"
							onClick={() => {
								handleDeleteProfile();
								setIsOpenModal(false);
							}}
						>
							Yes
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

export default EditSellerProfile;
