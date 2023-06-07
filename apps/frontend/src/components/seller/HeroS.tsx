import { Box, Typography, Container, Grid, useMediaQuery, createTheme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import heroImg from '../../assets/images/homepageDrink.png';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';

const Hero = () => {
	//const theme = useTheme();

	const theme = createTheme({
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920,
			},
		},
		components: {
			MuiContainer: {
				styleOverrides: {
					root: {
						'@media (min-width: 1500px)': {
							minHeight: '50vh',
						},
						'@media (min-width: 1920px)': {
							minHeight: '65vh',
						},
					},
				},
			},
		},
	});

	const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

	let minHeight = '95vh';

	if (isExtraLargeScreen) {
		minHeight = '50vh';
	}

	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: minHeight }}>
			<Container>
				<CustomBox>
					<Grid container spacing={2}>
						<Grid
							item
							xs={12}
							sm={12}
							lg={6}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Box sx={{ textAlign: 'center' }}>
								<Typography
									variant="body2"
									sx={{
										fontSize: '18px',
										color: '#687690',
										fontWeight: '500',
										mt: 10,
										mb: 4,
									}}
								>
									Welcome to LastCall
								</Typography>
								<Title
									variant="h1"
									sx={{ fontSize: '3rem', mb: 5 }}
								>
									Bridging the Gap Between Drink{' '}
									<span style={{ color: '#24336e' }}>
										Sellers
									</span>{' '}
									and Buyers
								</Title>
								<Typography
									variant="body2"
									sx={{
										fontSize: '17px',
										color: '#5A6473',
										mb: 4,
									}}
								>
									With an unwavering commitment to enhancing
									the beverage industry, we unite suppliers,
									distributors, retailers, and enthusiastic
									consumers.
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sm={12} lg={6}>
							<Box sx={{ textAlign: 'center' }}>
								<img
									src={heroImg}
									alt="heroImg"
									style={{
										maxWidth: '70%',
										marginTop: '6rem',
									}}
								/>
							</Box>
						</Grid>
					</Grid>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default Hero;
