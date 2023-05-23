import {
	Box,
	Button,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	OutlinedInput,
	Select,
	MenuItem,
	Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import { useState } from 'react';
import { useUserAuth } from 'context/AuthContext';
import api from 'services/api';
import { btnstyle } from 'assets/styles/styles';
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
	legalPerson: false,
	phone: '',
	title: '',
	city: '',
	country: '',
	registerNumber: 0,
	targetedMarkets: [],
};

const SignUpB = () => {
	const [error, setError] = useState('');
	const [newUserData, setNewUserData] = useState(initialState);

	const navigate = useNavigate();

	const handleChange = (e: { target: { value: any; name: any } }) => {
		const { value, name } = e.target;
		if (name === 'legalPerson') {
			setNewUserData({
				...newUserData,
				[name]: !newUserData.legalPerson,
			});
		} else {
			setNewUserData({ ...newUserData, [name]: value });
		}
	};

	//context
	const { signUp, user } = useUserAuth();

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
				// Signup was successful
				// Access the response object if needed: signUpResponse.response
				try {
					const response = await api.post('/buyers', {
						...newUserData,
						// targetedMarket: targetedMarkets,
					});
					//console.log(response);
					console.log(response.data);
					console.log(response.data.buyer);
					navigate('/buy/signin'); // Navigate to the sign in
				} catch (error: any) {
					setError(error.message);
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
											onChange={handleChange}
											sx={{ mb: 2 }}
											value={newUserData.name}
										/>
										<TextField
											label="Last Name"
											placeholder="Enter your last name"
											fullWidth
											required
											name="surname"
											onChange={handleChange}
											value={newUserData.surname}
											sx={{ mb: 2 }}
										/>
										<TextField
											label="Email"
											placeholder="Enter email"
											type="email"
											name="email"
											fullWidth
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
										<FormControlLabel
											control={
												<Checkbox
													checked={
														newUserData.legalPerson
													}
													name="legalPerson"
													onChange={handleChange}
												/>
											}
											label="Legal Person"
										/>
									</Grid>
									<Grid item xs={6}>
										<Typography variant="h6">
											Additional Information
										</Typography>
										<TextField
											label="Company name"
											placeholder="Enter company name"
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
											value={newUserData.registerNumber}
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
									<Link to={'/buy/signin'}>
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
	);
};

export default SignUpB;