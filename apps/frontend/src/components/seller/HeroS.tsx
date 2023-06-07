import {
	Box,
	Typography,
	Container,
	Grid,
	useMediaQuery,
	createTheme,
} from '@mui/material';
import heroImg from '../../assets/images/homepageDrink.png';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';

const Hero = () => {

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

	const isSmallScreen = useMediaQuery('(max-width:1200px)');
	const isExtraSmallScreen = useMediaQuery('(max-width:600px)');
	const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('xl'));

	let minHeight = '95vh';
	if (isExtraLargeScreen) {
		minHeight = '45vh';
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
										mt: isExtraSmallScreen ? 6 : 11,
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
							<Box sx={{ textAlign: 'center', mt: isExtraSmallScreen ? 6 : 10, mb: 4 }}>
							<img
                  src={heroImg}
                  alt="heroImg"
                  style={{
                    width: isSmallScreen ? '70%' : '100%',
                    marginTop: isSmallScreen ? '6rem' : 0,
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
