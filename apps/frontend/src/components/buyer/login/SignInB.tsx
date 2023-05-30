import {
	Avatar,
	Box,
	Button,
	Container,
	FormControl,
	Grid,
	Paper,
	TextField,
	Typography,
	Alert,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import { useState } from 'react';
import { useUserAuth } from 'context/AuthContext';
import CustomBox from 'components/ui/CustomBox';
import { btnstyle, paperStyle } from 'assets/styles/styles';
import api from 'services/api';

const SignInB = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isShownForgot, setIsShownForgot] = useState(false);
	const [resetMail, setResetMail] = useState('');
	const [isShownResetAlert, setIsShownResetAlert] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	//context
	const { signIn, resetPassword } = useUserAuth();

	const handleResetPassword = async (e: any) => {
		e.preventDefault();
		try {
			await resetPassword(resetMail);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const handleSubmitSign = async (e: any) => {
		setError('');
		e.preventDefault();
		try {
			const signUpResponse = await signIn(email, password);
			console.log(signUpResponse);
			if (signUpResponse.success) {
				// Access the response object if needed: signUpResponse.response
				//navigate('/');
				try {
					const response = await api.post('/email', {
						email: email,
					});
					//console.log(response);
					//console.log(response.data);
				} catch (error: any) {
					setError(error.message);
				}

		
				const redirectPath = location.search
					? decodeURIComponent(location.search.split('=')[1])
					: '/';
				navigate(redirectPath);
			} else {
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
					<Box component="form" sx={{ flex: '1', marginTop: '5rem' }}>
						<Grid>
							<Paper elevation={10} style={paperStyle}>
								<Grid>
									<Avatar
										style={{ backgroundColor: 'lightblue' }}
									></Avatar>
									<h2>Sign In</h2>
								</Grid>
								<FormControl>
									<TextField
										label="Email"
										placeholder="Enter email"
										fullWidth
										required
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
									<TextField
										label="Password"
										placeholder="Enter password"
										type="password"
										fullWidth
										required
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
									<Button
										type="submit"
										color="primary"
										variant="contained"
										style={btnstyle}
										fullWidth
										onClick={(e) => handleSubmitSign(e)} // Replace onSubmit with onClick
									>
										Sign in
									</Button>
								</FormControl>
								<Typography>
									Don't have an account yet?{' '}
									<Link to={'/buy/signup'}>
										<span style={{ color: 'black' }}>
											Sign up
										</span>
									</Link>
								</Typography>
								<Typography>
									<span
										onClick={(event) =>
											setIsShownForgot(!isShownForgot)
										}
										style={{ cursor: 'pointer' }}
									>
										Forgot password?
									</span>
								</Typography>
								{isShownForgot && (
									<>
										<TextField
											label="Enter email to reset password"
											placeholder="Enter email"
											type="email"
											required
											value={resetMail}
											onChange={(e) =>
												setResetMail(e.target.value)
											}
										/>
										<FormControl>
											<Button
												type="submit"
												color="primary"
												variant="contained"
												fullWidth
												style={btnstyle}
												onClick={(e) =>
													handleResetPassword(e)
												}
											>
												Reset
											</Button>
										</FormControl>
										{isShownResetAlert && (
											<Alert severity="info">
												Reset email sent!
											</Alert>
										)}
									</>
								)}
								{error && (
									<Alert severity="error">{error}</Alert>
								)}
							</Paper>
						</Grid>
					</Box>
					<Box sx={{ flex: '1.25' }}>
						<img
							src={heroImg}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '14rem' }}
						/>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default SignInB;
