import { Box, Button, Container, Divider, Typography } from '@mui/material';
import heroImg from '../../assets/images/homepageDrink.png';
import { Link } from 'react-router-dom';
import CustomButton from 'components/ui/CustomButton';
import CustomBox from 'components/ui/CustomBox';
import Title from 'components/ui/Title';
import { useEffect } from 'react';
import NavbarS from 'components/seller/NavbarS';
import NavbarB from 'components/buyer/NavbarB';
import { useUserAuth } from 'context/AuthContext';

interface Page404Props {
	notFound?: string;
	previousPage?: string;
}

const Page404: React.FC<Page404Props> = ({ notFound, previousPage }) => {
	const { role } = useUserAuth();
	useEffect(() => {
		document.title = notFound ? `${notFound} not found` : 'Page not found';
	}, [notFound]);

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
				{role === 'seller' ? <NavbarS /> : <NavbarB />}
				<Container>
					<CustomBox>
						<Box sx={{ flex: '1' }}>
							<Title
								variant="h1"
								sx={{ fontSize: '50px', mt: 16 }}
							>
								Error 404 - {notFound ? notFound : 'Page'} Not
								Found &#128549;
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
							<Link to={'/'}>
								<Button
									variant="contained"
									sx={{
										backgroundColor: '#24336e',
										'&:hover': {
											backgroundColor: '#1a2756',
										},
									}}
								>
									Go home
								</Button>
							</Link>
							<br />
							{previousPage && (
								<Link to={`/${previousPage}`}>
									<CustomButton
										backgroundColor="#0F1B4C"
										color="#fff"
										buttonText="Go back"
										heroBtn={true}
									/>
								</Link>
							)}
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

export default Page404;
