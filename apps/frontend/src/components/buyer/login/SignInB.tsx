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
	styled,
	Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase';
import { useUserAuth } from 'context/AuthContext';

const SignInB = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [isShownForgot, setIsShownForgot] = useState(false);
	const [resetMail, setResetMail] = useState('');
	const [isShownResetAlert, setIsShownResetAlert] = useState(false);

	const navigate = useNavigate();

	const paperStyle = {
		padding: 20,
		height: '50vh',
		width: 280,
		margin: '20px auto',
	};
	const avatarStyle = { backgroundColor: 'lightblue' };
	const btnstyle = { margin: '8px 0' };

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
			if (signUpResponse.success) {
				// Signin was successful
				// Access the response object if needed: signUpResponse.response
				navigate('/buyer');
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
									<Avatar style={avatarStyle}></Avatar>
									<h2>Sign In</h2>
								</Grid>
								<FormControl>
									<TextField
										label="Email"
										placeholder="Enter emial"
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
									Already have an account?{' '}
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
										<Button
											type="submit"
											color="primary"
											variant="contained"
											style={btnstyle}
											fullWidth
											onClick={(e) =>
												handleResetPassword(e)
											}
										>
											Reset
										</Button>
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
