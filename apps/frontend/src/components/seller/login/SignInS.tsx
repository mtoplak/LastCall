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
import NavbarS from '../NavbarS';

const SignInS = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isShownForgot, setIsShownForgot] = useState(false);
	const [resetMail, setResetMail] = useState('');
	const [isShownResetAlert, setIsShownResetAlert] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

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
			//console.log(signUpResponse);
			if (signUpResponse.success) {
				// Access the response object if needed: signUpResponse.response
				//navigate('/');
				const redirectPath = location.search
					? decodeURIComponent(location.search.split('=')[1])
					: '/seller';
				navigate(redirectPath);
			} else {
				setError(signUpResponse.error.message);
			}
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<>
			<NavbarS />
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '70vh' }}>
				<Container>
					<CustomBox>
					<Paper elevation={10} sx={{ my: 10, display: 'flex', flexDirection: ['column', 'row'] }}>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<Box component="form" sx={{ marginTop: '5rem' }}>
								<Grid>
									<Grid>
										<Avatar
											style={{
												backgroundColor: 'lightblue',
											}}
										></Avatar>
										<h2>Sign In As A Seller</h2>
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
										<Link to={'/sell/signup'}>
											<span style={{ color: 'black' }}>
												Sign up
											</span>
										</Link>
									</Typography>
									<Typography sx={{ marginBottom: '1rem' }}>
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
										<Grid>
												<Grid item>
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
														handleResetPassword(e)
													}
												>
													Reset
												</Button>
											</FormControl>
											</Grid>
											</Grid>
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
								<Typography sx={{ marginBottom: '8rem' }} />
								</Grid>
							</Box>
						</Box>
						<Box
							sx={{
								flex: 1.25,
								backgroundColor: '#E6F0FF',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
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
					</Paper>
					</CustomBox>
				</Container>
			</Box>
		</>
	);
};

export default SignInS;
