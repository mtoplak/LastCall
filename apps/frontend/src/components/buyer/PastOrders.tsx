import React, { useEffect, useState } from 'react';
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	Divider,
} from '@mui/material';
import NavbarB from './NavbarB';
import api from '../../services/api';
import { IOrder } from 'models/order';
import Order from './Order';
import Footer from 'components/homepage/Footer';

function PastOrders() {
	const [pastOrders, setPastOrders] = useState<IOrder[]>([]);

	useEffect(() => {
		const fetchPastOrders = async () => {
			try {
				const response = await api.get('/orders');
				setPastOrders(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchPastOrders();
	}, []);

	return (
		<>
			<Box
				sx={{
					backgroundColor: '#f2f2f2',
					minHeight: '100vh',
					minWidth: '100vh',
				}}
			>
				<NavbarB />
				<Container>
					<Typography variant="h4" component="h1" mt={4} mb={2}>
						Past Orders
					</Typography>
					{pastOrders.length === 0 ? (
						<Typography variant="body1" mb={4}>
							You have no past orders.
						</Typography>
					) : (
						pastOrders.map((order, index) => (
							<Grid item xs={8} key={index}>
								<Order order={order} />
								<Divider sx={{ mt: 2, mb: 2 }} />
							</Grid>
						))
					)}
				</Container>
			</Box>
			<Footer />
		</>
	);
}

export default PastOrders;
