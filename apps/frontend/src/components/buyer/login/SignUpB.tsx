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
	LinearProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
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
	registerNumber: '',
	targetedMarkets: [],
};

const requiredFields: (keyof any)[] = [
	'name',
	'surname',
	'email',
	'password',
	'password2',
	'address',
	'city',
	'country',
	'phone',
	'registerNumber',
];

const SignUpB = () => {
	const [error, setError] = useState('');
	const [newUserData, setNewUserData] = useState(initialState);
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccessInfo, setIsSuccessInfo] = useState(false);

	const handleChange = (e: { target: { value: any; name: any } }) => {
		setIsSuccessInfo(false);
		setError('');
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

	const { signUp, user } = useUserAuth();

	const handleSubmit = async (e: any) => {
		setIsLoading(true);
		setError('');
		e.preventDefault();
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
				// Signup was successful
				// Access the response object if needed: signUpResponse.response
				try {
					const response = await api.post('/buyers', {
						...newUserData,
						// targetedMarket: targetedMarkets,
					});
					//console.log(response.data);
					setIsSuccessInfo(true);
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
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '80vh' }}>
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
										<Typography variant="h6" sx={{ mb: 2 }}>
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
									<Grid item xs={12} sm={6}>
										<Typography variant="h6" sx={{ mb: 2 }}>
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
											placeholder="Enter yourcountry"
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
								{isSuccessInfo && (
									<Alert severity="success">
										You've successfully signed up! Verify
										your email to{' '}
										<Link
											to={'/buy/signin'}
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
