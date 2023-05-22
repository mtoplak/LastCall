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
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { btnstyle } from 'assets/styles/styles';
import NavbarS from '../NavbarS';
import { useUserAuth } from 'context/AuthContext';
import { useEffect, useState } from 'react';
import api from 'services/api';
import CustomBox from 'components/ui/CustomBox';

const markets = ['Slovenia', 'Italy', 'France', 'Austria', 'United Kingdom'];

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
	tip: '', // TODO -> type
	country: '',
	registerNumber: 0,
	targetedMarkets: [],
};

const SignUpS = () => {
	const [error, setError] = useState('');
	const [newUserData, setNewUserData] = useState(initialState);

	const navigate = useNavigate();

	const handleChange = (e: { target: { value: any; name: any } }) => {
		const { value, name } = e.target;
		setNewUserData({ ...newUserData, [name]: value });
	};

	const { signUp } = useUserAuth();

	useEffect(() => {
		document.title = 'Sign Up';
	}, []);

	const handleSubmit = async (e: any) => {
		setError('');
		e.preventDefault();
		if (newUserData.password !== newUserData.password2) {
			setError('Passwords do not match');
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
							console.log(response.data);
							console.log(response.data.seller);
							navigate('/sell/signin');
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
		}
	};

	return (
		<>
			<NavbarS />
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
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
								Sign up
							</Typography>
							<Grid>
								<Paper
									elevation={10}
									sx={{ px: 4, mb: 3, pb: 2 }}
								>
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
												label="Type"
												placeholder="Enter type"
												fullWidth
												required
												onChange={handleChange}
												name="tip"
												value={newUserData.tip}
												sx={{ mb: 2 }}
											/>
										</Grid>
										<Grid item xs={6}>
											<Typography variant="h6">
												Additional Information
											</Typography>
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
											<TextField
												label="Address"
												placeholder="Enter your/company address"
												fullWidth
												required
												name="address"
												value={newUserData.address}
												onChange={handleChange}
												sx={{ mb: 2 }}
											/>
											<TextField
												label="City"
												placeholder="Enter your/company city"
												fullWidth
												required
												name="city"
												value={newUserData.city}
												sx={{ mb: 2 }}
												onChange={handleChange}
											/>
											<TextField
												label="Country"
												placeholder="Enter your/company country"
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
													onChange={handleChange}
													value={
														newUserData.targetedMarkets
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
															// checked={newUserData.targetedMarket.indexOf(market) > -1} ???
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
											/>
										</Grid>
									</Grid>
									{error && (
										<Alert severity="error">{error}</Alert>
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
