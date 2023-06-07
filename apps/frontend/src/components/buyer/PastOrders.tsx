import { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Grid,
	CircularProgress,
} from '@mui/material';
import NavbarB from './NavbarB';
import api from '../../services/api';
import { IOrder } from 'models/order';
import Order from './Order';
import { useUserAuth } from 'context/AuthContext';

function PastOrders() {
	const [pastOrders, setPastOrders] = useState<IOrder[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { user } = useUserAuth();

	useEffect(() => {
		if (!user) return;
		const fetchPastOrders = async () => {
			try {
				const response = await api.post(
					'/buyers/orders',
					{
						email: user.email,
					},
					{
						headers: {
							Authorization: user?.stsTokenManager?.accessToken,
						},
					}
				);
				setPastOrders(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchPastOrders();
		window.scrollTo(0, 0);
	}, [user]);

	useEffect(() => {
		document.title = 'My Orders';
	}, []);

	return (
		<>
			<NavbarB />
			<Box
				sx={{
					backgroundColor: '#f2f2f2',
					minHeight: '100vh',
					py: 2,
				}}
			>
				<Container>
					<Typography variant="h4" component="h1" mt={4} mb={2}>
						Past Orders
					</Typography>
					{isLoading ? (
						<Grid
							container
							justifyContent="center"
							alignItems="center"
							style={{ minHeight: '200px' }}
						>
							<CircularProgress color="inherit" />
						</Grid>
					) : pastOrders.length === 0 ? (
						<Typography variant="body1" mb={4}>
							You have no past orders.
						</Typography>
					) : (
						pastOrders.map((order, index) => (
							<Grid item xs={8} key={index} sx={{ mt: 2 }}>
								<Order order={order} />
							</Grid>
						))
					)}
				</Container>
			</Box>
		</>
	);
}

export default PastOrders;
