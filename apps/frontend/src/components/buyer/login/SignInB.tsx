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
} from '@mui/material';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const SignInB = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const signIn = async (e: any) => {
		e.preventDefault();
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			console.log(userCredentials);
		} catch (error: any) {
			setError(error.message);
		}
	};

	const paperStyle = {
		padding: 20,
		height: '50vh',
		width: 280,
		margin: '20px auto',
	};
	const avatarStyle = { backgroundColor: 'lightblue' };
	const btnstyle = { margin: '8px 0' };

	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
			<Container>
				<CustomBox>
					<Box
						component="form"
						sx={{ flex: '1', marginTop: '10rem' }}
					>
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
										onClick={(e) => signIn(e)} // Replace onSubmit with onClick
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
								<span style={{ color: 'red' }}>{error}</span>
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
