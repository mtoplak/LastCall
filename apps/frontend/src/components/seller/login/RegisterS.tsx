import {
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import CustomBox from 'components/ui/CustomBox';
import { btnstyle, paperStyle } from 'assets/styles/styles';

const RegisterS = () => {
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
											label="Type"
											placeholder="Enter type"
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
										<TextField
											label="Website"
											placeholder="Enter website URL"
											fullWidth
											required
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
									<Link to={'/'}>
										Already have an account?
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

export default RegisterS;
