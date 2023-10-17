import {
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	Paper,
	TextField,
	Typography,
	Checkbox,
	Alert,
	Select,
	MenuItem,
	InputLabel,
	ListItemText,
	OutlinedInput,
	LinearProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { btnstyle } from 'assets/styles/styles';
import NavbarS from '../NavbarS';
import { useUserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import api from 'services/api';
import CustomBox from 'components/ui/CustomBox';
import { markets } from 'constants/marketConstants';
import { SellerType } from '../../../enums/seller.enum';

const initialState = {
	name: '',
	surname: '',
	email: '',
	password: '',
	password2: '',
	companyName: '',
	address: '',
	website: '',
	phone: '',
	title: '',
	city: '',
	companyType: '',
	country: '',
	registerNumber: '',
	targetedMarkets: [] as string[],
	minPrice: '',
	maxDistance: '',
	deliveryCost: '',
};

const requiredFields: (keyof any)[] = [
	'name',
	'surname',
	'email',
	'password',
	'password2',
	'phone',
	'title',
	'companyType',
	'address',
	'city',
	'country',
	'registerNumber',
];

const SignUpS = () => {
	const [error, setError] = useState('');
	const [newUserData, setNewUserData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccessInfo, setIsSuccessInfo] = useState<boolean>(false);

	const companyTypes = Object.values(SellerType);

	const { signUp } = useUserAuth();

	useEffect(() => {
		document.title = 'Sign Up | Seller';
		window.scrollTo(0, 0);
	}, []);

	const handleChange = (e: { target: { value: any; name: any } }) => {
		setIsSuccessInfo(false);
		setError('');
		const { value, name } = e.target;
		setNewUserData({ ...newUserData, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);
		for (const field of requiredFields) {
			if (!newUserData[field as keyof typeof newUserData]) {
				setError(
					`${
						String(field).charAt(0).toUpperCase() +
						String(field).slice(1)
					} is required`
				);
				setIsLoading(false);
				return;
			}
		}
		if (newUserData.password !== newUserData.password2) {
			setError('Passwords do not match');
			setIsLoading(false);
			return;
		}
		try {
			const signUpResponse = await signUp(
				newUserData.email,
				newUserData.password
			);
			if (signUpResponse.success) {
				// Access the response object if needed: signUpResponse.response
				// fetch the coordinates
				try {
					const response = await fetch(
						`https://nominatim.openstreetmap.org/search?format=json&q=${
							newUserData.address +
							' ' +
							newUserData.city +
							' ' +
							newUserData.country
						}&addressdetails=1&limit=1&polygon_svg=1`
					);
					const data = await response.json();
					console.log(data);
					if (data.length === 0) {
						setError('Address not found');
						return;
					} else {
						try {
							const response = await api.post('/sellers', {
								...newUserData,
								coordinates: [data[0].lat, data[0].lon],
								// targetedMarket: targetedMarkets,
							});
							//console.log(response.data);
							//console.log(response.data.seller);
							setIsSuccessInfo(true);
						} catch (error: any) {
							setError(error.message);
						}
					}
				} catch (error: any) {
					setError(error);
				}
			} else {
				//console.log(signUpResponse.error);
				//console.log(signUpResponse.error.message);
				setError(signUpResponse.error.message);
			}
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChangeMarkets = (event: any) => {
		const selectedValues = event.target.value as string[];
		setNewUserData((prevUserData) => ({
			...prevUserData,
			targetedMarkets: selectedValues,
		}));
	};

	return (
		<>
			<NavbarS />
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<Container>
					<CustomBox>
						<Box
							component="form"
							sx={{
								flex: '1',
								marginTop: '1rem',
							}}
						>
							<Typography
								variant="h4"
								style={{
									textAlign: 'center',
								}}
								sx={{ mb: 4 }}
							>
								Sign Up As Seller
							</Typography>
							<Grid>
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
											<Typography
												variant="h6"
												sx={{ mb: 2 }}
											>
												Basic info
											</Typography>
											<TextField
												label="First Name"
												placeholder="Enter your first name"
												fullWidth
												required
												name="name"
												value={newUserData.name}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Last Name"
												placeholder="Enter your last name"
												fullWidth
												required
												name="surname"
												value={newUserData.surname}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Email"
												placeholder="Enter email"
												type="email"
												name="email"
												fullWidth
												value={newUserData.email}
												required
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Password"
												placeholder="Enter password"
												type="password"
												name="password"
												fullWidth
												value={newUserData.password}
												required
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Confirm Password"
												placeholder="Confirm password"
												type="password"
												fullWidth
												required
												name="password2"
												value={newUserData.password2}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Phone Number"
												placeholder="Enter phone number"
												fullWidth
												required
												onChange={handleChange}
												name="phone"
												value={newUserData.phone}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Company name"
												placeholder="Enter company name"
												required
												fullWidth
												name="title"
												value={newUserData.title}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<FormControl fullWidth>
												<InputLabel id="demo-simple-select-label">
													Company Type
												</InputLabel>
												<Select
													labelId="demo-simple-select-label"
													id="demo-simple-select"
													value={
														newUserData.companyType
													}
													label="Company Type"
													onChange={handleChange}
													name="companyType"
												>
													{companyTypes.map(
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
										</Grid>
										<Grid item xs={12} sm={6}>
											<Typography
												variant="h6"
												sx={{ mb: 2 }}
											>
												Additional Information
											</Typography>
											<TextField
												label="Address"
												placeholder="Enter your address"
												fullWidth
												required
												name="address"
												value={newUserData.address}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="City"
												placeholder="Enter your city"
												fullWidth
												required
												name="city"
												value={newUserData.city}
												sx={{ mb: 2 }}
												onChange={handleChange}
											/>
											<TextField
												label="Country"
												placeholder="Enter your country"
												fullWidth
												required
												name="country"
												value={newUserData.country}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Register Number"
												placeholder="Enter register number"
												fullWidth
												name="registerNumber"
												type="number"
												value={
													newUserData.registerNumber
												}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<FormControl sx={{ width: '100%' }}>
												<InputLabel id="demo-multiple-checkbox-label">
													Targeted Markets
												</InputLabel>
												<Select
													labelId="demo-multiple-checkbox-label"
													id="demo-multiple-checkbox"
													multiple
													input={
														<OutlinedInput label="Tag" />
													}
													name="targetedMarkets"
													sx={{ mb: 2 }}
													onChange={(event) =>
														handleChangeMarkets(
															event
														)
													}
													value={
														newUserData.targetedMarkets ||
														[]
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
																checked={newUserData.targetedMarkets.includes(
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
												name="website"
												value={newUserData.website}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="Minimum order value"
												placeholder="Enter minimum price"
												fullWidth
												name="minPrice"
												type="number"
												value={newUserData.minPrice}
												onChange={handleChange}
												sx={{ mb: 2 }}
												InputProps={{
													endAdornment: '€',
												}}
											/>
											<TextField
												label="Maximum distance for delivery"
												placeholder="Enter maximum distance"
												fullWidth
												name="maxDistance"
												type="number"
												value={newUserData.maxDistance}
												onChange={handleChange}
												sx={{ mb: 2 }}
												InputProps={{
													endAdornment: 'km',
												}}
											/>
											<TextField
												label="Delivery Cost"
												placeholder="Enter your delivery cost"
												fullWidth
												name="deliveryCost"
												value={newUserData.deliveryCost}
												onChange={handleChange}
												sx={{ mb: 2 }}
												type="number"
												InputProps={{
													endAdornment: '€',
												}}
											/>
										</Grid>
									</Grid>
									{error && (
										<Alert severity="error">{error}</Alert>
									)}
									{isSuccessInfo && (
										<Alert severity="success">
											You've successfully signed up!
											Verify your email to{' '}
											<Link
												to={'/sell/signin'}
												className="blackLink"
											>
												log in
											</Link>
											. Also, check your spam folder.
										</Alert>
									)}
									<Button
										type="submit"
										color="primary"
										variant="contained"
										style={btnstyle}
										fullWidth
										onClick={(e) => handleSubmit(e)}
									>
										Sign up
									</Button>
									{isLoading && (
										<LinearProgress color="inherit" />
									)}
									<Typography>
										Already have an account?{' '}
										<Link to={'/sell/signin'}>
											<span style={{ color: 'black' }}>
												Sign In!
											</span>
										</Link>
									</Typography>
								</Paper>
							</Grid>
						</Box>
					</CustomBox>
				</Container>
			</Box>
		</>
	);
};

export default SignUpS;
