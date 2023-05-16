import {
	Avatar,
	Box,
	Button,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
	styled,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	OutlinedInput,
	Select,
	MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const markets = ['Slovenia', 'Italy', 'France', 'Austria', 'United Kingdom'];

const initialState = {
	email: '',
	password: '',
	password2: '',
};

const SignUpB = () => {
	const [targetedMarkets, setTargetedMarkets] = useState<string[]>([]);
	const [error, setError] = useState('');
	const [newUserData, setNewUserData] = useState(initialState);

	const paperStyle = {
		padding: 20,
		height: '55vh',
		width: 600,
		margin: '20px auto',
	};
	const btnstyle = { margin: '8px 0' };

	const handleChange = (e: { target: { value: any; name: any } }) => {
		const { value, name } = e.target;
		setNewUserData({ ...newUserData, [name]: value });
	};

	const signUp = async (e: any) => {
		e.preventDefault();
		if (newUserData.password !== newUserData.password2) {
			setError('Passwords do not match');
		} else {
			try {
				const userCredentials = await createUserWithEmailAndPassword(
					auth,
					newUserData.email,
					newUserData.password
				);
				console.log(userCredentials);
			} catch (error: any) {
				setError(error.message);
			}
		}
	};

	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
			<Container>
				<CustomBox>
					<Box component="form" sx={{ flex: '1', marginTop: '5rem' }}>
						<h1>Sign up</h1>
						<Grid>
							<Paper elevation={10} style={paperStyle}>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<h2>Basic info</h2>
										<TextField
											label="First Name"
											placeholder="Enter your first name"
											fullWidth
											required
										/>
										<TextField
											label="Last Name"
											placeholder="Enter your last name"
											fullWidth
											required
										/>
										<TextField
											label="Email"
											placeholder="Enter email"
											type="email"
											name="email"
											fullWidth
											required
											onChange={(e) => handleChange(e)}
										/>
										<TextField
											label="Password"
											placeholder="Enter password"
											type="password"
											name="password"
											fullWidth
											required
											onChange={(e) => handleChange(e)}
										/>
										<TextField
											label="Confirm Password"
											placeholder="Confirm password"
											type="password"
											fullWidth
											required
											name="password2"
											value={newUserData.password2}
											onChange={(e) => handleChange(e)}
										/>
										<TextField
											label="Phone Number"
											placeholder="Enter phone number"
											fullWidth
											required
										/>
										<FormControlLabel
											control={<Checkbox />}
											label="Legal Person"
										/>
									</Grid>
									<Grid item xs={6}>
										<h2>Additional Information</h2>
										<TextField
											label="Company name"
											placeholder="Enter company name"
											fullWidth
										/>
										<TextField
											label="Address"
											placeholder="Enter your/company address"
											fullWidth
											required
										/>
										<TextField
											label="City"
											placeholder="Enter your/company city"
											fullWidth
											required
										/>
										<TextField
											label="Country"
											placeholder="Enter your/company country"
											fullWidth
											required
										/>
										<TextField
											label="Register Number"
											placeholder="Enter register number"
											fullWidth
											required
										/>

										<FormControl sx={{ width: 290 }}>
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
												value={targetedMarkets} // Add the value prop with an array of selected values
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
															checked={false}
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
								<span style={{ color: 'red' }}>{error}</span>
								<Button
									type="submit"
									color="primary"
									variant="contained"
									style={btnstyle}
									fullWidth
									onClick={(e) => signUp(e)}
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

const CustomBox = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	gap: theme.spacing(5),
	[theme.breakpoints.down('md')]: {
		flexDirection: 'column',
		alignItems: 'center',
		textAlign: 'center',
	},
}));
