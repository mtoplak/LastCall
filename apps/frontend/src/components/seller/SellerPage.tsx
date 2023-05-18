import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@mui/material';
import { ISeller } from 'models/seller';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import sellerProfile from '../../assets/images/sellerProfile.png';
import NavbarB from 'components/buyer/NavbarB';
import Footer from 'components/homepage/Footer';
import Title from 'components/ui/Title';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import CustomBox from 'components/ui/CustomBox';

function SellerPage() {
	const [isOpen, setIsOpen] = React.useState(false);
	const [seller, setSller] = useState<ISeller>();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/sellers/' + id);
				console.log(response.data);
				setSller(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, [id]);

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '100vh' }}>
				<NavbarB />
				<Container>
					<CustomBox>
						<Box sx={{ flex: '1', marginTop: '5rem' }}>
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
								Hi There!
							</Typography>
							<Title variant="h1">
								We are{' '}
								<span style={{ color: '#24336e' }}>
									{seller?.title}
								</span>
							</Title>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
									my: 4,
								}}
							>
								{seller?.title} is a {seller?.tip} located in{' '}
								{seller?.country} in {seller?.city} on{' '}
								{seller?.address}. For any further information
								please contact us!
							</Typography>
							<Button
								variant="outlined"
								onClick={() => setIsOpen(true)}
								sx={{
									backgroundColor: '#0F1B4C',
									color: '#FFFFFF',
									border: '2px solid #0F1B4C',
									'&:hover': {
										backgroundColor: '#FFFFFF',
										color: '#0F1B4C',
									},
								}}
							>
								Contact us
							</Button>
							<Dialog
								open={isOpen}
								onClose={() => setIsOpen(false)}
								aria-labelledby="alert-dialog-title"
								aria-describedby="alert-dialog-description"
							>
								<DialogTitle id="alert-dialog-title">
									{'Contact us via:'}
								</DialogTitle>
								<DialogContent>
									<DialogContentText id="alert-dialog-description">
										Email: {seller?.email}
										<br />
										Phone: {seller?.phoneNumber}
										<br />
										Website: {seller?.website}
									</DialogContentText>
								</DialogContent>
								<DialogActions>
									<Button onClick={() => setIsOpen(true)}>
										Close
									</Button>
								</DialogActions>
							</Dialog>
						</Box>

						<Box sx={{ flex: '1.25' }}>
							<img
								src={sellerProfile}
								alt="sellerProfile"
								style={{ maxWidth: '100%', marginTop: '7rem' }}
							/>
						</Box>
					</CustomBox>
				</Container>
			</Box>
			<Box sx={{ backgroundColor: '#f2f2f2', py: 3 }}>
				<Container>
					<PropertiesTextBox>
						<Typography
							sx={{
								color: '#000339',
								fontSize: '35px',
								fontWeight: 'bold',
							}}
						>
							Our products
						</Typography>
					</PropertiesTextBox>
				</Container>
			</Box>
			<Footer />
		</>
	);
}

export default SellerPage;
