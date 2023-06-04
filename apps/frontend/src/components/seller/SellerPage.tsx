import {
	Alert,
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';

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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<img
						src={sellerProfile}
						alt="sellerProfile"
						style={{
							width: '200px',
							height: '200px',
							borderRadius: '50%',
							marginBottom: '2rem',
						}}
					/>

					<Card
						sx={{
							backgroundColor: 'rgba(255, 255, 255, 0.4)',
							backdropFilter: 'blur(10px)',
							padding: '2rem',
							marginBottom: '2rem',
							color: 'black',
							mx: 2,
							px: 10,
						}}
					>
						<Typography
							variant="h3"
							component="h1"
							sx={{ mb: 2, color: '#24336e' }}
						>
							<b>{seller?.title}</b>
						</Typography>
						<Typography
							variant="body2"
							sx={{ fontSize: '18px', mb: 2 }}
						>
							{seller?.title} is a {seller?.companyType} located
							in {seller?.country} in {seller?.city} on{' '}
							{seller?.address}. For any further information
							please contact us!
						</Typography>
						<Divider sx={{ mb: 1 }} />
						<Grid container spacing={2} sx={{display: 'flex', justifyContent: 'space-between'}}>
							<Grid item>
								<Typography
									variant="body2"
									sx={{
										fontSize: '14px',
										color: 'gray',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<EmailIcon sx={{ marginRight: '0.5rem' }} />
									<b>{seller?.email}</b>
								</Typography>
							</Grid>
							<Grid item sx={{ mx: 2 }}>
								<Typography
									variant="body2"
									sx={{
										fontSize: '14px',
										color: 'gray',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<PhoneIcon sx={{ marginRight: '0.5rem' }} />
									<b>{seller?.phone}</b>
								</Typography>
							</Grid>
							<Grid item>
								<Link href={seller?.website} underline="none">
									<Typography
										variant="body2"
										sx={{
											fontSize: '14px',
											color: 'gray',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<LanguageIcon
											sx={{ marginRight: '0.5rem' }}
										/>
										<b>{seller?.website}</b>
									</Typography>
								</Link>
							</Grid>
						</Grid>
						<Divider sx={{ my: 1 }} />
						<Grid container justifyContent="flex-start">
							<Grid item xs={2}>
								<Button
									variant="contained"
									sx={{
										backgroundColor: '#24336e',
										'&:hover': {
											backgroundColor: '#1a2756',
										},
									}}
									onClick={() => setIsOpenModal(true)}
								>
									Contact Us
								</Button>
							</Grid>
						</Grid>
					</Card>
				</Box>
			</Box>
			<Box sx={{ backgroundColor: '#f2f2f2', py: 3 }}>
				<Container>
					<PropertiesTextBox>
						<Box
							sx={{
								color: '#000339',
								fontSize: '35px',
								fontWeight: 'bold',
							}}
						>
							Our products
							<SellerProducts sellerId={id || ''} />
						</Box>
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
