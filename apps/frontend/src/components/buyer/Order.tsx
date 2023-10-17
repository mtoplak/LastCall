import React, { useEffect, useState } from 'react';
import {
	Typography,
	Grid,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CardMedia,
	Button,
	Rating,
	Modal,
	Box,
	Tooltip,
} from '@mui/material';
import { IOrder } from 'models/order';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';
import { getOrderStatusColor } from 'utils/getOrderStatusColor';
import { useUserAuth } from 'context/AuthContext';
import api from 'services/api';
import { OrderStatus } from 'enums/order.enum';
import { style } from 'assets/styles/styles';

interface OrderProps {
	order: IOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {
	const { role, user } = useUserAuth();
	const [isOpen, setIsOpen] = useState(false);
	const [score, setScore] = useState<number | null>(null);
	const [error, setError] = useState('');
	const [isRated, setIsRated] = useState(false);

	useEffect(() => {
		const fetchRating = async () => {
			try {
				const response = await api.get(`/rating/order/${order?._id}`);
				setScore(response.data);
				setIsRated(!!response.data);
			} catch (error: any) {
				setError(error.response.data.message);
			}
		};
		if (order?.score) {
			fetchRating();
		}
	}, [order]);

	const handleRate = async () => {
		if (score === null || score === undefined || score === 0) {
			setError('Please select a score');
			return;
		}
		try {
			//console.log(order?.seller._id);
			//console.log(order?.seller);
			await api.post(
				`/rating`,
				{
					score: score,
					seller: order?.seller,
					order: order?._id,
					buyer: user.email,
				},
				{
					headers: {
						Authorization: user?.stsTokenManager?.accessToken,
					},
				}
			);
			setIsOpen(false);
			setIsRated(true);
			setScore(score);
		} catch (error: any) {
			setError(error.response.data.message);
		}
	};

	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography sx={{ mr: 1 }}>
					<b>ORDER STATUS: </b>
				</Typography>
				<Typography
					color={getOrderStatusColor(order.status)}
					sx={{ mb: 2, width: '33%', flexShrink: 0 }}
				>
					<b>{order.status}</b>
				</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					Date of Purchase:{' '}
					{formatDate(new Date(order.dateOfPurchase))}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Divider />
				<Grid item xs={12}>
					<Grid container spacing={2}>
						{order.products.slice(0, 3).map((orderProduct) => (
							<Grid
								item
								key={orderProduct.product._id}
								xs={12}
								sm={6}
								md={4}
							>
								<CardMedia
									component="img"
									image={orderProduct.product.picture}
									sx={{ maxHeight: 220, maxWidth: 220 }}
								/>
							</Grid>
						))}
						{order.products.length > 3 && (
							<Grid item xs={12}>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{`+${order.products.length - 3} more ${
										order.products.length - 3 === 1
											? 'product'
											: 'products'
									}`}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
				<Divider />
				<Grid
					container
					sx={{
						mt: 2,
						display: 'flex',
						flexWrap: 'wrap',
						justifyContent: 'space-between',
					}}
				>
					<Grid item xs={12} sm={3}>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							<b>Order ID: </b>
							{order.uid}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 1 }}>
						{role !== 'seller' && (
							<>
								<Tooltip
									title={
										order.status !==
											OrderStatus.DELIVERED &&
										order.status !== OrderStatus.REJECTED
											? 'You can rate this seller when the order is delivered'
											: order.status ===
											  OrderStatus.REJECTED
											? 'You cannot rate the seller since the order was rejected'
											: ''
									}
									placement="top"
									arrow
								>
									<span>
										<Button
											variant="outlined"
											sx={{
												mr: 3,
												mb: 2,
												color: '#878787',
												position: 'relative',
												'&:hover': {
													border: '2px solid #878787',
													backgroundColor: '#e0e0e0',
												},
												border: '2px solid #878787',
											}}
											onClick={() => {
												setIsOpen(true);
											}}
											disabled={
												isRated ||
												order.status !==
													OrderStatus.DELIVERED
											}
										>
											{isRated ? (
												<>
													You have rated this seller:{' '}
													<Rating value={score!} />
												</>
											) : (
												<>Rate this seller</>
											)}
											{order.status !==
												OrderStatus.DELIVERED && (
												<Typography
													variant="body2"
													sx={{
														position: 'absolute',
														top: '50%',
														left: '50%',
														transform:
															'translate(-50%, -50%)',
														backgroundColor:
															'rgba(0, 0, 0, 0.7)',
														color: '#ffffff',
														padding: '4px 8px',
														borderRadius: '4px',
														whiteSpace: 'nowrap',
														opacity: 0,
														transition:
															'opacity 0.3s',
														pointerEvents: 'none',
														'&:hover': {
															opacity: 1,
														},
													}}
												>
													You can't rate this seller
													yet
												</Typography>
											)}
										</Button>
									</span>
								</Tooltip>
							</>
						)}
					</Grid>
					<Grid
						item
						xs={12}
						sm={2}
						sx={{ justifyContent: 'flex-end' }}
					>
						<Link to={`/order/${order._id}`} key={order._id}>
							<Button
								variant="outlined"
								sx={{
									mr: 3,
									mt: 1,
									mb: 1,
									color: '#878787',
									border: '2px solid #878787',
									'&:hover': {
										border: '2px solid #878787',
										backgroundColor: '#e0e0e0',
									},
								}}
							>
								Details
							</Button>
						</Link>
					</Grid>
				</Grid>
			</AccordionDetails>
			<Modal
				open={isOpen}
				onClose={() => {
					setIsOpen(false);
					setError('');
				}}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={style}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '16px',
					}}
				>
					<Typography
						variant="h6"
						component="h2"
						style={{ marginBottom: '16px' }}
					>
						Rate your experience with this seller
					</Typography>
					<Rating
						name="simple-controlled"
						value={score}
						onChange={(event, newValue) => {
							setScore(newValue!);
						}}
						style={{ marginBottom: '16px' }}
					/>
					{error && (
						<Typography
							color="error"
							style={{ marginBottom: '16px' }}
						>
							{error}
						</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={handleRate}
					>
						Confirm
					</Button>
				</Box>
			</Modal>
		</Accordion>
	);
};

export default Order;
