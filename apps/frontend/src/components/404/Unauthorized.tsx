import { Box, Container, Divider, Typography } from '@mui/material';
import { FC } from 'react';
import heroImg from '../../assets/images/homepageDrink.png';
import { Link } from 'react-router-dom';
import CustomButton from 'components/ui/CustomButton';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';
import NavbarS from 'components/seller/NavbarS';
import NavbarB from 'components/buyer/NavbarB';
import { useUserAuth } from 'context/AuthContext';

const Unauthorized: FC = () => {
	const { role } = useUserAuth();
	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
				{role === 'seller' ? <NavbarS /> : <NavbarB />}
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
								<Link to={'/'}>LastCall</Link>
							</Typography>
							<Title variant="h1">
								Hold up! Error 401 - Unauthorized &#128549;
							</Title>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
									my: 4,
								}}
							>
								With an unwavering commitment to enhancing the
								beverage industry, LastCall bridges the gap
								between suppliers, distributors, retailers, and
								enthusiastic consumers.
							</Typography>
							<Link to={'/buy/signin'}>
								<CustomButton
									backgroundColor="#0F1B4C"
									color="#fff"
									buttonText="Sign in"
									heroBtn={true}
								/>
							</Link>
							<br />
							<Link to={'/buy/signup'}>
								<CustomButton
									backgroundColor="#0F1B4C"
									color="#fff"
									buttonText="Sign up"
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
			<Divider />
		</>
	);
};

export default Unauthorized;
