import {
	Alert,
	Box,
	Button,
	Container,
	Link,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import { ISeller } from 'models/seller';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import sellerProfile from '../../assets/images/sellerProfile.png';
import NavbarB from 'components/buyer/NavbarB';
import Title from 'components/ui/Title';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import CustomBox from 'components/ui/CustomBox';
import SellerProducts from './SellerProducts';
import { checkoutButton, style } from 'assets/styles/styles';
import { useUserAuth } from 'context/AuthContext';
import NavbarS from './NavbarS';

function SellerPage() {
	const [seller, setSeller] = useState<ISeller>();
	const [fetchError, setFetchError] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { id } = useParams<{ id: string }>();
	const { user, role } = useUserAuth();
	const [buyerEmail, setBuyerEmail] = useState(
		user && user.email ? user.email : ''
	);

	useEffect(() => {
		if (user && user.email) {
			setBuyerEmail(user.email);
		}
	}, [user]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/sellers/' + id);
				console.log(response.data);
				setSeller(response.data);
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
		return <>Seller Not found</>; // TODO lepši ui
	}

	if (!seller) {
		return null; // Render a loader or placeholder here if desired
	}

	const handleSendMessage = async () => {
		try {
			const response = await api.post('/contact/sendMessage', {
				seller: seller.email,
				buyer: user.email,
				message: message,
			});
			if (response.data.success !== true) {
				setError('There was an error sending message.');
			} else {
				setError('');
				setMessage('');
				setIsOpenModal(false);
				// alert na strani da je blo uspešno poslano
			}
		} catch (error: any) {
			setError(error.response.data);
		}
	};

	return (
		<>
			<Box sx={{ backgroundColor: '#E6F0FF', minHeight: '65vh' }}>
			{role === 'seller' ? <NavbarS /> : <NavbarB />}
				<Container>
					<CustomBox>
						<Box sx={{ flex: '1', marginTop: '3rem' }}>
							<Title variant="h1" sx={{ color: '#24336e' }}>
								{seller?.title}
							</Title>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
									my: 4,
								}}
							>
								{seller?.title} is a {seller?.companyType}{' '}
								located in {seller?.country} in {seller?.city}{' '}
								on {seller?.address}. For any further
								information please contact us!
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
									mt: 4,
								}}
							>
								Email: <b>{seller?.email}</b>
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: '18px',
									color: '#5A6473',
								}}
							>
								Phone: <b>{seller?.phone}</b>
							</Typography>
							<Link href={seller?.website} underline="none">
								<Typography
									variant="body2"
									sx={{
										fontSize: '18px',
										color: '#5A6473',
										mb: 4,
									}}
								>
									Website: <b>{seller?.website}</b>
								</Typography>
							</Link>
						</Box>
						<Box sx={{ flex: '1.25' }}>
							<img
								src={sellerProfile}
								alt="sellerProfile"
								style={{ maxWidth: '70%', marginTop: '1rem' }}
							/>
						</Box>
					</CustomBox>
					<Button
						variant="contained"
						color="primary"
						sx={checkoutButton}
						onClick={() => setIsOpenModal(true)}
					>
						Contact Us
					</Button>
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
			<Modal
				open={isOpenModal}
				onClose={() => {
					setIsOpenModal(false);
					setError('');
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box component="form" sx={style}>
					<Typography
						id="modal-modal-title"
						variant="h6"
						component="h2"
					>
						Message
					</Typography>
					<br />
					<TextField
						label="Your Email"
						placeholder="Enter email address"
						type="text"
						fullWidth
						required
						name="address"
						sx={{ mb: 2 }}
						value={buyerEmail}
						onChange={(e) => setBuyerEmail(e.target.value)}
					/>
					<TextField
						sx={{
							mt: 2,
							'& .MuiInputBase-root': {
								minHeight: '80px',
							},
						}}
						id="text"
						label="Message"
						placeholder="Enter message"
						type="text"
						fullWidth
						required
						multiline
						rows={10}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<br />
					<br />
					{error !== '' && (
						<Alert severity="error">
							<b>{error}</b>
						</Alert>
					)}
					<Typography sx={{ mt: 2 }}>
						<Button
							sx={{ mt: 2 }}
							color="primary"
							variant="contained"
							fullWidth
							onClick={handleSendMessage}
						>
							Send message
						</Button>
					</Typography>
				</Box>
			</Modal>
		</>
	);
}

export default SellerPage;
