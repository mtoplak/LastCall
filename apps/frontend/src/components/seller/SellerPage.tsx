import {
	Box,
	Button,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	TextField,
	Typography,
} from '@mui/material';
import { ISeller } from 'models/seller';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import sellerProfile from '../../assets/images/sellerProfile.png';
import NavbarB from 'components/buyer/NavbarB';
import Footer from 'components/homepage/Footer';
import Title from 'components/ui/Title';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import CustomBox from 'components/ui/CustomBox';
import SellerProducts from './SellerProducts';

function SellerPage() {
	const [isOpen, setIsOpen] = useState(false);
	const [seller, setSller] = useState<ISeller>();
	const [fetchError, setFetchError] = useState(false);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/sellers/' + id);
				console.log(response.data);
				setSller(response.data);
			} catch (error) {
				setFetchError(true);
				throw error;
			}
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		document.title = seller?.title || '';
	}, [seller]);

	if (fetchError) {
		return <>Seller Not found</>;
	}

	if (!seller) {
		return null; // Render a loader or placeholder here if desired
	}

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '65vh' }}>
				<NavbarB />
				<Container>
					<CustomBox>
						<Box sx={{ flex: '1', marginTop: '3rem' }}>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#687690',
									fontWeight: '500',
									mt: 5,
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
								{seller?.title} is a {seller?.companyType} located in{' '}
								{seller?.country} in {seller?.city} on{' '}
								{seller?.address}. For any further information
								please contact us!
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
									mt: 4,
								}}
							>
								Email: {seller?.email} 
							</Typography>
							<Typography
							variant="body2"
							sx={{
								fontSize: '18px',
								color: '#5A6473',
							}}>
								Phone: {seller?.phone}
                            </Typography>
							<Typography
							variant="body2"
							sx={{
								fontSize: '18px',
								color: '#5A6473',
								mb: 4,
							}}>
								Website: {seller?.website}
                            </Typography>
						</Box>
						<Box sx={{ flex: '1.25' }}>
							<img
								src={sellerProfile}
								alt="sellerProfile"
								style={{ maxWidth: '100%', marginTop: '1rem' }}
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
							<SellerProducts sellerId={id || ''} />
						</Typography>
					</PropertiesTextBox>
				</Container>
			</Box>
			<Footer />
		</>
	);
}

export default SellerPage;
