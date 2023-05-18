import {
	Avatar,
	Box,
	Button,
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import heroImg from '../../../assets/images/homepageDrink.png';
import CustomBox from 'components/ui/CustomBox';
import { avatarStyle, btnstyle, paperStyle } from 'assets/styles/styles';

const LoginB = () => {
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
								<TextField
									label="Email"
									placeholder="Enter emial"
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

								<Button
									type="submit"
									color="primary"
									variant="contained"
									style={btnstyle}
									fullWidth
								>
									Sign in
								</Button>
								<Typography>
									{' '}
									Do you have an account ?
								</Typography>
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

export default LoginB;
