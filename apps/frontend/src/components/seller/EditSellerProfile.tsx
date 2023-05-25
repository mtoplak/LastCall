import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	InputLabel,
	OutlinedInput,
	Paper,
	Select,
	TextField,
	Typography,
  MenuItem
} from '@mui/material';
import api from 'services/api';
import NavbarS from './NavbarS';
import { useUserAuth } from 'context/AuthContext';
const markets = ['Slovenia', 'Italy', 'France', 'Austria', 'United Kingdom'];

interface SellerProfile {
	name: string;
	surname: string;
	title: string;
	country: string;
	city: string;
	address: string;
	registerNumber: number;
	companyType: string;
	phone: string;
	website: string;
	targetedMarket: string;
	maxDistance: number;
	minPrice: number;
}

function EditSellerProfile() {
	const { user } = useUserAuth();
	const [sellerProfile, setSellerProfile] = useState<SellerProfile>({
		name: '',
		surname: '',
		title: '',
		country: '',
		city: '',
		address: '',
		registerNumber: 0,
		companyType: '',
		phone: '',
		website: '',
		targetedMarket: '',
		maxDistance: 0,
		minPrice: 0,
	});

	useEffect(() => {
		if (!user) return;
		const fetchSellerProfile = async () => {
		  try {
			const response = await api.get(`sellers/get/${user.email}`);
			const profileData = response.data;
			setSellerProfile(profileData);
		  } catch (error) {
			console.error('Error fetching seller profile:', error);
		  }
		};
	
		fetchSellerProfile();
	  }, [user]);

	const handleFormSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(user.email);
		try {
			const response = await api.patch(
				`sellers/patch/${user.email}`,
				sellerProfile
			);
		} catch (error) {
			throw error;
		}
	};

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
						<Grid>
							<Paper elevation={10} sx={{ px: 4, mb: 3, pb: 2 }}>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Typography variant="h6">
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
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													name: event.target.value,
												})
											}
										/>
										<TextField
											label="Last Name"
											placeholder="Enter your last name"
											fullWidth
											required
											name="surname"
											sx={{ mb: 2 }}
											value={sellerProfile.surname}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													surname: event.target.value,
												})
											}
										/>
										<TextField
											label="Company name"
											placeholder="Enter company name"
											fullWidth
											required
											name="title"
											sx={{ mb: 2 }}
											value={sellerProfile.title}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													title: event.target.value,
												})
											}
										/>
										<TextField
											label="Phone Number"
											placeholder="Enter phone number"
											fullWidth
											required
											name="phone"
											sx={{ mb: 2 }}
											value={sellerProfile.phone}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													phone: event.target.value,
												})
											}
										/>
										<FormControl
											fullWidth
											required
											sx={{ mb: 2 }}
										>
											<InputLabel id="company-type-label">
												Type
											</InputLabel>
											<Select
												labelId="company-type-label"
												id="company-type"
												value={
													sellerProfile.companyType
												}
												name="companyType"
												onChange={(event) =>
													setSellerProfile({
														...sellerProfile,
														companyType: event
															.target
															.value as string,
													})
												}
											>
												<MenuItem value="Winery">
													Winery
												</MenuItem>
												<MenuItem value="Brewery">
													Brewery
												</MenuItem>
											</Select>
										</FormControl>
										<TextField
											label="Address"
											placeholder="Enter your/company address"
											fullWidth
											required
											name="address"
											sx={{ mb: 2 }}
											value={sellerProfile.address}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													address: event.target.value,
												})
											}
										/>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h6">
											Additional Information
										</Typography>
										<TextField
											label="City"
											placeholder="Enter your/company city"
											fullWidth
											required
											name="city"
											sx={{ mb: 2 }}
											value={sellerProfile.city}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													city: event.target.value,
												})
											}
										/>
										<TextField
											label="Country"
											placeholder="Enter your/company country"
											fullWidth
											required
											name="country"
											sx={{ mb: 2 }}
											value={sellerProfile.country}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													country: event.target.value,
												})
											}
										/>
										<TextField
											label="Targeted Market"
											placeholder="Enter your targeted market"
											fullWidth
											required
											name="targetedMarket"
											sx={{ mb: 2 }}
											value={sellerProfile.targetedMarket}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													targetedMarket:
														event.target.value,
												})
											}
										/>
										<TextField
											label="Website"
											placeholder="Enter website"
											fullWidth
											required
											name="website"
											sx={{ mb: 2 }}
											value={sellerProfile.website}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													website: event.target.value,
												})
											}
										/>
										<TextField
											label="Maximum distance for delivery"
											placeholder="Enter distance"
											fullWidth
											required
											name="maxDistance"
											sx={{ mb: 2 }}
											value={sellerProfile.maxDistance}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													maxDistance: parseInt(
														event.target.value
													),
												})
											}
										/>
										<TextField
											label="Minimum price"
											placeholder="Enter price"
											fullWidth
											required
											name="minPrice"
											sx={{ mb: 2 }}
											value={sellerProfile.minPrice}
											onChange={(event) =>
												setSellerProfile({
													...sellerProfile,
													minPrice: parseFloat(
														event.target.value
													),
												})
											}
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
							</Paper>
						</Grid>
					</Box>
				</Container>
			</Box>
		</>
	);
}

export default EditSellerProfile;
