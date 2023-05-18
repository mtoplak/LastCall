import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Paper,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import React from 'react';
import CustomBox from 'components/ui/CustomBox';

const RegisterB = () => {
	const paperStyle = {
		padding: 20,
		height: '55vh',
		width: 600,
		margin: '20px auto',
	};
	const avatarStyle = { backgroundColor: '#1bbd7e' };
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
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<h2>Register</h2>
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
											label="Title"
											placeholder="Enter title"
											fullWidth
											required
										/>
										<TextField
											label="Address"
											placeholder="Enter address"
											fullWidth
											required
										/>
										<TextField
											label="Email"
											placeholder="Enter email"
											fullWidth
											required
										/>
										<TextField
											label="Password"
											placeholder="Enter password"
											type="password"
											fullWidth
											required
										/>
									</Grid>
									<Grid item xs={6}>
										<h2>Additional Information</h2>
										<TextField
											label="Title"
											placeholder="Enter title"
											fullWidth
											required
										/>
										<TextField
											label="Country"
											placeholder="Enter country"
											fullWidth
											required
										/>
										<TextField
											label="Register Number"
											placeholder="Enter register number"
											fullWidth
											required
										/>
										<TextField
											label="City"
											placeholder="Enter city"
											fullWidth
											required
										/>
										<TextField
											label="Phone Number"
											placeholder="Enter phone number"
											fullWidth
											required
										/>
										<br />
										<br />
										<FormControlLabel
											control={<Checkbox />}
											label="Legal Person"
										/>
									</Grid>
								</Grid>

								<Button
									type="submit"
									color="primary"
									variant="contained"
									style={btnstyle}
									fullWidth
								>
									Sign up
								</Button>
								<Typography>
									Already have an account?
								</Typography>
							</Paper>
						</Grid>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default RegisterB;
