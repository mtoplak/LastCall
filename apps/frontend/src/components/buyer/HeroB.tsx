import { Box, Typography, Container } from '@mui/material';
import heroImg from '../../assets/images/homepageDrink.png';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';

const Hero = () => {
	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '65vh' }}>
			<Container>
				<CustomBox>
					<Box sx={{ flex: '1' }}>
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
						<Title variant="h1">
							Bridging the Gap Between Drink{' '}
							<span style={{ color: '#24336e' }}>Buyers</span> and
							Sellers
						</Title>
					</Box>

					<Box sx={{ flex: '1.25' }}>
						<img
							src={heroImg}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '5rem' }}
						/>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default Hero;
