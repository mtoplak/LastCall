import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	Container,
	Divider,
	Grid,
	IconButton,
	Link,
	Modal,
	Rating,
	TextField,
	Typography,
} from '@mui/material';
import { ISeller } from 'models/seller';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from 'services/api';
import sellerProfile from '../../assets/images/sellerProfile.png';
import NavbarB from 'components/buyer/NavbarB';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import SellerProducts from './SellerProducts';
import { style } from 'assets/styles/styles';
import { useUserAuth } from 'context/AuthContext';
import NavbarS from './NavbarS';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import Page404 from 'components/404/Page404';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function SellerPage() {
	const [seller, setSeller] = useState<ISeller>();
	const [isFetchError, setIsFetchError] = useState(false);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const { id } = useParams<{ id: string }>();
	const { user, role } = useUserAuth();
	const [rating, setRating] = useState<number | null>(null);
	const [buyerEmail, setBuyerEmail] = useState(
		user && user.email ? user.email : ''
	);
	const [isMessageSent, setIsMessageSent] = useState(false);

	useEffect(() => {
		if (user && user.email) {
			setBuyerEmail(user.email);
		}
	}, [user]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/sellers/' + id);
				setSeller(response.data);
			} catch (error: any) {
				if (error.response.status === 404) {
					setIsFetchError(true);
				}
				throw error;
			}
		};

		fetchData();
	}, [id]);

	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await api.get(
					'sellers/average-score/' + seller?._id
				);
				setRating(response.data);
			} catch (error: any) {
				setError(error.response.data);
			}
		};
		if (seller?._id) {
			fetchRating();
		}
	}, [seller?._id]);

	useEffect(() => {
		document.title = seller?.title || '';
		window.scrollTo(0, 0);
	}, [seller]);

	if (isFetchError) {
		return <Page404 notFound="Seller" />;
	}

	const handleSendMessage = async () => {
		try {
			if (message.trim() === '') {
				setError('Message cannot be empty.');
				return;
			}
			const response = await api.post('/contact/sendMessage', {
				seller: seller?.email,
				buyer: buyerEmail,
				message: message,
			});
			if (response.data.success !== true) {
				setError('There was an error sending message.');
			} else {
				setError('');
				setMessage('');
				setIsOpenModal(false);
				setIsMessageSent(true);
			}
		} catch (error: any) {
			setError(error.response.data);
		}
	};
	const handleCloseMessage = () => {
		setIsMessageSent(false);
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
							in {seller?.city}, {seller?.country} on{' '}
							{seller?.address}. For any further information
							please contact us!
						</Typography>
						<Divider sx={{ mb: 1 }} />
						<Grid
							container
							spacing={2}
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
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
									<Link
										href={`mailto:${seller?.email}`}
										color="inherit"
										underline="none"
									>
										<b>{seller?.email}</b>
									</Link>
								</Typography>
							</Grid>
							<Grid item>
								<Typography
									variant="body2"
									sx={{
										fontSize: '15px',
										color: 'gray',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<PhoneIcon
										sx={{
											marginRight: '0.5rem',
											mb: 1,
										}}
									/>
									<Link
										href={`tel:${seller?.phone}`}
										color="inherit"
										underline="none"
									>
										<b>{seller?.phone}</b>
									</Link>
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
						<Grid
							container
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item>
								<Button
									variant="contained"
									sx={{
										mb: 1,
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
							<Grid item>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
									}}
								>
									{rating !== 0 ? (
										<>
											<Typography
												variant="body2"
												sx={{
													fontSize: '14px',
													color: 'gray',
												}}
											>
												Average rating for{' '}
												{seller?.title}:
											</Typography>
											<Rating
												name="read-only"
												precision={0.25}
												value={rating}
												readOnly
												sx={{ ml: 1 }}
											/>
										</>
									) : (
										<Typography
											variant="body2"
											sx={{
												fontSize: '14px',
												color: 'gray',
												marginLeft: '4px',
											}}
										>
											This seller has not been rated yet.
										</Typography>
									)}
								</Box>
							</Grid>
						</Grid>
						{isMessageSent && (
							<Alert severity="success" sx={{ mt: 1 }}>
								Message has been successfully sent.
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={handleCloseMessage}
								>
									<CloseOutlinedIcon fontSize="inherit" />
								</IconButton>
							</Alert>
						)}
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
						placeholder="Enter your email address"
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
