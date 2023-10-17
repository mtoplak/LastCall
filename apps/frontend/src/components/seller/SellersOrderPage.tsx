import { useEffect, useState } from 'react';
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Card,
	CardContent,
	Checkbox,
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	Modal,
	Typography,
} from '@mui/material';
import { IOrder } from 'models/order';
import api from 'services/api';
import NavbarS from './NavbarS';
import { useUserAuth } from 'context/AuthContext';
import SearchOrdersInput from './SearchOrdersInput';
import { Link } from 'react-router-dom';
import { getOrderStatusColor } from 'utils/getOrderStatusColor';
import { formatDate } from 'utils/formatDate';
import { OrderStatus } from 'enums/order.enum';
import { style } from 'assets/styles/styles';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function SellerOrdersPage() {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [checked, setChecked] = useState<IOrder[]>([]); // the orders you want to change status
	const [isOpenModal, setIsOpenModal] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState<OrderStatus>();
	const [isShownAlert, setIsShownAlert] = useState(false); // alert for success status change
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUserAuth();

	// filtering orders
	const [filterStatus, setFilterStatus] = useState<OrderStatus | 'any'>(
		'any'
	);
	const filteredOrders = orders.filter((order) => {
		const statusMatch =
			filterStatus === 'any' ||
			order.status.toLowerCase() === filterStatus.toLowerCase();

		return statusMatch;
	});

	useEffect(() => {
		if (!user) return;
		const fetchOrders = async () => {
			try {
				const response = await api.post(
					'/sellers/ordersbyemail',
					{
						email: user.email,
					},
					{
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					}
				);
				setOrders(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchOrders();
	}, [user]);

	useEffect(() => {
		document.title = 'Orders';
		window.scrollTo(0, 0);
	}, []);

	const handleToggle = (order: IOrder) => () => {
		const isChecked = checked.some(
			(checkedOrder) => checkedOrder._id === order._id
		);
		const newChecked = isChecked
			? checked.filter((checkedOrder) => checkedOrder._id !== order._id)
			: [...checked, order];

		setChecked(newChecked);
	};

	const handleChangeStatus = async (status: OrderStatus) => {
		setIsShownAlert(false);
		try {
			const orderIds = checked.map((order) => order._id);
			await Promise.all(
				orderIds.map((orderId) =>
					api.patch(`/orders/${orderId}`, { status })
				)
			);
			const currentDate = new Date();
			const updatedOrders = orders.map((order) =>
				orderIds.includes(order._id)
					? { ...order, status, actualDateOfDelivery: currentDate }
					: order
			);
			setOrders(updatedOrders as IOrder[]);
			setChecked([]);
			setIsShownAlert(true);
		} catch (error) {
			throw error;
		}
	};

	const handleOpenModal = () => {
		if (checked.length === 0) return;
		setIsOpenModal(true);
	};

	return (
		<>
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<NavbarS />
				<Container>
					<Typography
						variant="h4"
						component="h1"
						sx={{ mt: 6, mb: 4 }}
					>
						Order List
					</Typography>
					{isShownAlert && (
						<Alert
							severity="success"
							style={{ marginTop: '1rem' }}
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									size="small"
									onClick={() => setIsShownAlert(false)}
								>
									<CloseOutlinedIcon fontSize="inherit" />
								</IconButton>
							}
						>
							<AlertTitle>
								Status updated successfully!
							</AlertTitle>
						</Alert>
					)}
					{isLoading ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							style={{ minHeight: '200px' }}
						>
							<CircularProgress color="inherit" />
						</Grid>
					) : orders.length === 0 ? (
						<Typography variant="body1" mb={4} mt={2}>
							Your order list is empty.
						</Typography>
					) : (
						<Grid container spacing={2} mt={2}>
							<Grid item xs={12} md={3}>
								<Card sx={{ mb: 3 }}>
									<CardContent>
										<Typography
											variant="h6"
											component="h2"
											mb={2}
										>
											Change status
										</Typography>
										<Divider />
										<Box
											my={2}
											sx={{
												display: 'flex',
												flexDirection: {
													xs: 'row',
													sm: 'row',
													md: 'column',
												},
												gap: { xs: 2, sm: 2, md: 0 },
											}}
										>
											<Button
												variant="contained"
												color="primary"
												sx={{ mb: 1 }}
												fullWidth
												onClick={() => {
													handleOpenModal();
													setSelectedStatus(
														OrderStatus.ACCEPTED
													);
												}}
											>
												Accept
											</Button>
											<Button
												variant="contained"
												color="warning"
												sx={{ mb: 1 }}
												fullWidth
												onClick={() => {
													handleOpenModal();
													setSelectedStatus(
														OrderStatus.INTRANSIT
													);
												}}
											>
												In-Transit
											</Button>
										</Box>
										<Box
											my={2}
											sx={{
												display: 'flex',
												flexDirection: {
													xs: 'row',
													sm: 'row',
													md: 'column',
												},
												gap: { xs: 2, sm: 2, md: 0 },
											}}
										>
											<Button
												variant="contained"
												color="success"
												sx={{ mb: 1 }}
												fullWidth
												onClick={() => {
													handleOpenModal();
													setSelectedStatus(
														OrderStatus.DELIVERED
													);
												}}
											>
												Delivered
											</Button>
											<Button
												variant="contained"
												color="error"
												sx={{ mb: 1 }}
												fullWidth
												onClick={() => {
													handleOpenModal();
													setSelectedStatus(
														OrderStatus.REJECTED
													);
												}}
											>
												Reject
											</Button>
										</Box>
									</CardContent>
								</Card>
								<SearchOrdersInput
									setFilterStatus={setFilterStatus}
									filterStatus={filterStatus}
								/>
							</Grid>
							<Grid item xs={12} md={9}>
								{filteredOrders.length > 0 &&
								filterStatus !== 'any' ? (
									filteredOrders.map((order) => (
										<Card
											key={order._id}
											sx={{
												alignItems: 'flex-start',
												mb: 2,
											}}
										>
											<Grid container spacing={2}>
												<Grid
													item
													xs={1}
													sm={1}
													sx={{ mt: 3 }}
												>
													{order.status !==
														OrderStatus.DELIVERED &&
														order.status !==
															OrderStatus.REJECTED && (
															<Checkbox
																checked={checked.some(
																	(
																		checkedOrder
																	) =>
																		checkedOrder._id ===
																		order._id
																)}
																onChange={handleToggle(
																	order
																)}
																inputProps={{
																	'aria-label':
																		'select order',
																}}
															/>
														)}
												</Grid>
												<Grid item xs={11} sm={8}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
														>
															<b>
																ORDER ID:{' '}
																{order.uid}
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Price:{' '}
															{order.totalPrice.toFixed(
																2
															)}{' '}
															€
														</Typography>
													</CardContent>
												</Grid>
												<Grid item xs={12} sm={3}>
													<CardContent>
														Current status:
														<Typography
															color={getOrderStatusColor(
																order.status
															)}
														>
															<b>
																{order.status}
															</b>
														</Typography>
													</CardContent>
												</Grid>
											</Grid>
											<Divider />
											<Grid container spacing={2}>
												<Grid item xs={1} md={1} />
												<Grid item xs={5} md={4}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
															color="text.secondary"
														>
															<b>
																Address details:
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Address:{' '}
															{order.address}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Location:{' '}
															{order.city},{' '}
															{order.country}
														</Typography>
													</CardContent>
												</Grid>
												<Grid item md={4} xs={6}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
															color="text.secondary"
														>
															<b>
																Purchase/delivery
																dates:
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Date of Purchase:{' '}
															{formatDate(
																new Date(
																	order.dateOfPurchase
																)
															)}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Estimated Delivery
															Date:{' '}
															{formatDate(
																new Date(
																	order.lastDateOfDelivery
																)
															)}
														</Typography>
														<Typography>
															{order.status ===
																OrderStatus.DELIVERED && (
																<>
																	Date of
																	Delivery:{' '}
																	{formatDate(
																		new Date(
																			order.actualDateOfDelivery
																		)
																	)}
																</>
															)}
														</Typography>
													</CardContent>
												</Grid>
												<Divider />
												<Grid item xs={12} md={2}>
													<Grid
														container
														justifyContent={{
															xs: 'flex-end',
															md: 'flex-start',
														}}
														alignItems={{
															xs: 'flex-end',
															md: 'center',
														}}
													>
														<Link
															to={`/order/${order._id}`}
															key={order._id}
														>
															<Button
																variant="outlined"
																sx={{
																	mx: {
																		xs: 1,
																		md: 3,
																	},
																	my: {
																		xs: 1,
																		md: 5,
																	},
																	color: '#878787',
																	border: '2px solid #878787',
																	'&:hover': {
																		border: '2px solid #878787',
																		backgroundColor:
																			'#e0e0e0',
																	},
																}}
															>
																details
															</Button>
														</Link>
													</Grid>
												</Grid>
											</Grid>
										</Card>
									))
								) : filterStatus !== 'any' &&
								  filteredOrders.length === 0 ? (
									<>No orders found with this filter.</>
								) : (
									orders.map((order) => (
										<Card
											key={order._id}
											sx={{
												alignItems: 'flex-start',
												mb: 2,
											}}
										>
											<Grid container spacing={2}>
												<Grid
													item
													xs={1}
													sm={1}
													sx={{ mt: 3 }}
												>
													{order.status !==
														OrderStatus.DELIVERED &&
														order.status !==
															OrderStatus.REJECTED && (
															<Checkbox
																checked={checked.some(
																	(
																		checkedOrder
																	) =>
																		checkedOrder._id ===
																		order._id
																)}
																onChange={handleToggle(
																	order
																)}
																inputProps={{
																	'aria-label':
																		'select order',
																}}
															/>
														)}
												</Grid>
												<Grid item xs={11} sm={8}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
														>
															<b>
																ORDER ID:{' '}
																{order.uid}
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Price:{' '}
															{order.totalPrice.toFixed(
																2
															)}{' '}
															€
														</Typography>
													</CardContent>
												</Grid>
												<Grid item xs={12} sm={3}>
													<CardContent>
														Current status:
														<Typography
															color={getOrderStatusColor(
																order.status
															)}
														>
															<b>
																{order.status}
															</b>
														</Typography>
													</CardContent>
												</Grid>
											</Grid>
											<Divider />
											<Grid container spacing={2}>
												<Grid item xs={1} md={1} />
												<Grid item xs={5} md={4}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
															color="text.secondary"
														>
															<b>
																Address details:
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Address:{' '}
															{order.address}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Location:{' '}
															{order.city},{' '}
															{order.country}
														</Typography>
													</CardContent>
												</Grid>
												<Grid item md={4} xs={6}>
													<CardContent>
														<Typography
															variant="subtitle1"
															component="h2"
															color="text.secondary"
														>
															<b>
																Purchase/delivery
																dates:
															</b>
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Date of Purchase:{' '}
															{formatDate(
																new Date(
																	order.dateOfPurchase
																)
															)}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															Estimated Delivery
															Date:{' '}
															{formatDate(
																new Date(
																	order.lastDateOfDelivery
																)
															)}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
														>
															{order.status ===
																OrderStatus.DELIVERED && (
																<>
																	Date of
																	Delivery:{' '}
																	{formatDate(
																		new Date(
																			order.actualDateOfDelivery
																		)
																	)}
																</>
															)}
														</Typography>
													</CardContent>
												</Grid>
												<Divider />
												<Grid item xs={12} md={2}>
													<Grid
														container
														justifyContent={{
															xs: 'flex-end',
															md: 'flex-start',
														}}
														alignItems={{
															xs: 'flex-end',
															md: 'center',
														}}
													>
														<Link
															to={`/order/${order._id}`}
															key={order._id}
														>
															<Button
																variant="outlined"
																sx={{
																	mx: {
																		xs: 1,
																		md: 3,
																	},
																	my: {
																		xs: 1,
																		md: 5,
																	},
																	color: '#878787',
																	border: '2px solid #878787',
																	'&:hover': {
																		border: '2px solid #878787',
																		backgroundColor:
																			'#e0e0e0',
																	},
																}}
															>
																details
															</Button>
														</Link>
													</Grid>
												</Grid>
											</Grid>
										</Card>
									))
								)}
							</Grid>
						</Grid>
					)}
				</Container>
			</Box>
			<Modal
				open={isOpenModal}
				onClose={() => {
					setIsOpenModal(false);
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
						Are you sure you want to change the status of the
						selected order{checked.length > 1 && 's'} to{' '}
						<Typography
							component="span"
							variant="h6"
							color={getOrderStatusColor(selectedStatus!)}
						>
							{selectedStatus?.toLowerCase()}
						</Typography>
						?
					</Typography>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Button
							sx={{ mt: 2, width: '48%' }}
							color="error"
							variant="contained"
							onClick={() => {
								setIsOpenModal(false);
							}}
						>
							No
						</Button>
						<Button
							sx={{ mt: 2, width: '48%' }}
							color="primary"
							variant="contained"
							onClick={() => {
								handleChangeStatus(selectedStatus!);
								setIsOpenModal(false);
							}}
						>
							Yes
						</Button>
					</Box>
				</Box>
			</Modal>
		</>
	);
}

export default SellerOrdersPage;
