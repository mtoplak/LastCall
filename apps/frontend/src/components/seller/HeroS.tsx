import { Box, Typography, Container } from '@mui/material';
import NavbarS from './NavbarS';
import heroImg from '../../assets/images/homepageDrink.png';
import Title from 'components/ui/Title';
import CustomBox from 'components/ui/CustomBox';

const HeroS = () => {
	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
			<NavbarS />
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
							<span style={{ color: '#24336e' }}>Sellers</span>{' '}
							and Buyers
						</Title>
						<Typography
							variant="body2"
							sx={{ fontSize: '18px', color: '#5A6473', my: 4 }}
						>
							With an unwavering commitment to enhancing the
							beverage industry, LastCall bridges the gap between
							suppliers, distributors, retailers, and enthusiastic
							consumers.
						</Typography>
					</Box>

					<Box sx={{ flex: '1.25' }}>
						<img
							src={heroImg}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '7rem' }}
						/>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default HeroS;
