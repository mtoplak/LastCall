import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Checkbox,
	Container,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { IOrder } from 'models/order';
import api from 'services/api';
import NavbarB from 'components/buyer/NavbarB';

function SellerOrdersPage() {
	const [orders, setOrders] = useState<IOrder[]>([]);
	const [checked, setChecked] = useState<IOrder[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const response = await api.get('/orders');
				setOrders(response.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrders();
	}, []);

	const handleToggle = (order: IOrder) => () => {
		const isChecked = checked.some((checkedOrder) => checkedOrder._id === order._id);
		const newChecked = isChecked
			? checked.filter((checkedOrder) => checkedOrder._id !== order._id)
			: [...checked, order];

		setChecked(newChecked);
	};

	return (
		<>
			<Box sx={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
				<NavbarB />
				<Container>
					<Typography variant="h4" component="h1" mt={4} mb={2}>
						Shopping Cart
					</Typography>
					{orders.length === 0 ? (
						<Typography variant="body1" mb={4}>
							Your cart is empty.
						</Typography>
					) : (
						<Grid container spacing={2}>
							<Grid item xs={10}>
								{orders.map((order) => (
									<Card
										key={order._id}
										sx={{
											py: 2,
											alignItems: 'flex-start',
											mb: 2,
										}}
									>
										<Grid container spacing={2}>
											<Grid item xs={1}>
												<Checkbox
													checked={checked.some(
														(checkedOrder) =>
															checkedOrder._id ===
															order._id
													)}
													onChange={handleToggle(order)}
													inputProps={{
														'aria-label':
															'select order',
													}}
												/>
											</Grid>
											<Grid item xs={8}>
												<CardContent>
													<Typography
														variant="subtitle1"
														component="h2"
													>
														<b>ORDER ID: {order._id}</b>
													</Typography>
													<Typography
														variant="body2"
														color="text.secondary"
													>
														Price: €
														{order.totalPrice.toFixed(
															2
														)}
													</Typography>
												</CardContent>
											</Grid>
											<Grid item xs={3}>
												<CardContent>
													Current status: 
												</CardContent>
											</Grid>
										</Grid>
									</Card>
								))}
							</Grid>
							<Grid item xs={2}>
  <Card>
    <CardContent>
      <Typography variant="h6" component="h2" mb={2}>
        Change status
      </Typography>
      <Divider />
      <Box my={2}>
        <Button variant="contained" color="primary" fullWidth>
          Ordered
        </Button>
      </Box>
      <Box my={2}>
        <Button variant="contained" color="warning" fullWidth>
          In-Transit
        </Button>
      </Box>
      <Box my={2}>
        <Button variant="contained" color="success" fullWidth>
          Delivered
        </Button>
      </Box>
      <Divider />
      <Box my={2}>
        <Button variant="contained" color="error" fullWidth>
          Cancel
        </Button>
      </Box>
    </CardContent>
  </Card>
</Grid>
						</Grid>
					)}
				</Container>
			</Box>
		</>
	);
}

export default SellerOrdersPage;
