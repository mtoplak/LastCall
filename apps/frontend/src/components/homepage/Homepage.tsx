import { Box, Typography, Container } from '@mui/material';
import heroImg from '../../assets/images/homepageDrink.png';
import CustomButton from '../ui/CustomButton';
import { Link } from 'react-router-dom';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';

const Homepage = () => {
	return (
		<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
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
							Bridging the Gap Between Drink Buyers and Sellers
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
						<Link to={'/buyer'}>
							<CustomButton
								backgroundColor="#0F1B4C"
								color="#fff"
								buttonText="I'm a buyer!"
								heroBtn={true}
							/>
						</Link>
						<br />
						<Link to={'/seller'}>
							<CustomButton
								backgroundColor="#0F1B4C"
								color="#fff"
								buttonText="I'm a seller!"
								heroBtn={true}
							/>
						</Link>
					</Box>
					<Box sx={{ flex: '1.25' }}>
						<img
							src={heroImg}
							alt="heroImg"
							style={{ maxWidth: '100%', marginTop: '10rem' }}
						/>
					</Box>
				</CustomBox>
			</Container>
		</Box>
	);
};

export default Homepage;
