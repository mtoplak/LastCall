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
import { btnstyle } from 'assets/styles/styles';
import api from 'services/api';

const SignInB = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [resetError, setResetError] = useState('');
	const [isShownForgot, setIsShownForgot] = useState(false);
	const [resetMail, setResetMail] = useState('');
	const [link, setLink] = useState<any>();

	const navigate = useNavigate();
	const location = useLocation();

	const { signIn, resetPassword } = useUserAuth();

	const handleResetPassword = async (e: any) => {
		e.preventDefault();
		try {
			const response = await resetPassword(resetMail);
			//console.log(response);
			if (response.success) {
				setResetError('Reset mail sent! Check your email.');
			} else {
				setResetError(response.error.message);
			}
		} catch (error: any) {
			console.error(error);
			setResetError(error.message);
		}
	};

	const handleSubmitSignIn = async (e: any) => {
		e.preventDefault();
		setIsShownForgot(false);
		setResetError('');
		setResetMail('');
		setError('');
		setLink(null);
		if (!email || !password) {
			setError('Please fill in all fields');
			return;
		}
		try {
			const signUpResponse = await signIn(email, password, 'buyer');
			//console.log(signUpResponse);
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
				//console.log(signUpResponse);
				setLink(signUpResponse.link);
				setError(signUpResponse.error.message);
			}
		} catch (error: any) {
			//console.log(error);
			setError(error.message);
		}
	};

	return (
		<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '70vh' }}>
			<Container>
				<CustomBox>
					<Paper
						elevation={10}
						sx={{
							my: 10,
							display: 'flex',
							flexDirection: ['column', 'row'],
						}}
					>
						<Box
							sx={{
								flex: 1.25,
								backgroundColor: '#E6F0FF',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								py: 5,
								order: [2, 1],
							}}
						>
							<Container
								sx={{
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<img
									src={heroImg}
									alt="heroImg"
									style={{
										maxWidth: '100%',
										maxHeight: '100%',
										objectFit: 'cover',
									}}
								/>
							</Container>
						</Box>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Box
								component="form"
								sx={{ marginTop: '5rem', px: 4, }}
							>
								<Grid>
									<Grid>
										<Avatar
											style={{
												backgroundColor: 'lightblue',
											}}
										></Avatar>
										<h2>Sign In As Buyer</h2>
									</Grid>
									<FormControl>
										<TextField
											label="Email"
											placeholder="Enter email"
											fullWidth
											required
											value={email}
											onChange={(e) => {
												setError('');
												setResetError('');
												setIsShownForgot(false);
												setResetMail('');
												setEmail(e.target.value);
											}}
											sx={{ mb: 1 }}
										/>
										<TextField
											label="Password"
											placeholder="Enter password"
											type="password"
											fullWidth
											required
											value={password}
											onChange={(e) => {
												setError('');
												setResetError('');
												setResetMail('');
												setIsShownForgot(false);
												setPassword(e.target.value);
											}}
											sx={{ mb: 1 }}
										/>
										<Button
											type="submit"
											color="primary"
											variant="contained"
											style={btnstyle}
											fullWidth
											onClick={(e) =>
												handleSubmitSignIn(e)
											}
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
									<Typography sx={{ marginBottom: '1rem' }}>
										<span
											onClick={() => {
												setIsShownForgot(
													!isShownForgot
												);
												setResetError('');
												setResetMail('');
												setError('');
												setLink(null);
											}}
											style={{ cursor: 'pointer' }}
										>
											Forgot password?
										</span>
									</Typography>
									{isShownForgot && (
										<>
											<Grid>
												<Grid item>
													<TextField
														label="Enter email to reset password"
														placeholder="Enter email"
														type="email"
														required
														value={resetMail}
														onChange={(e) =>
															setResetMail(
																e.target.value
															)
														}
													/>
												</Grid>
												<Grid item>
													<FormControl>
														<Button
															type="submit"
															color="primary"
															variant="contained"
															fullWidth
															style={btnstyle}
															onClick={(e) =>
																handleResetPassword(
																	e
																)
															}
														>
															Reset
														</Button>
													</FormControl>
												</Grid>
											</Grid>
											{resetError && (
												<Alert severity="error">
													{resetError}
												</Alert>
											)}
										</>
									)}
									{error && (
										<Alert severity="error">
											{error} {link && link}{' '}
											{link && 'page.'}
										</Alert>
									)}
									<Typography sx={{ marginBottom: '8rem' }} />
								</Grid>
							</Box>
						</Box>
					</Paper>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default SignInB;
