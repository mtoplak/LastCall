import React from 'react';
import {
	Typography,
	Card,
	Grid,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CardMedia,
	Button,
} from '@mui/material';
import { IOrder } from 'models/order';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils/formatDate';

interface OrderProps {
	order: IOrder;
}

const Order: React.FC<OrderProps> = ({ order }) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>
					<b>ORDER STATUS: </b>
					{order.status}
				</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					Date of Delivery/Purchase:{' '}
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
								<Card>
									<CardMedia
										component="img"
										image={orderProduct.product.picture}
										sx={{ maxHeight: 320 }}
									/>
								</Card>
							</Grid>
						))}
						{order.products.length > 3 && (
							<Grid item xs={12}>
								<Typography
									variant="body2"
									color="text.secondary"
								>
									{`+${
										order.products.length - 3
									} more products`}
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
				<Divider />
				<Grid
					container
					sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
				>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							<b>Order ID: </b>
							{order.uid}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
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
							Track order
						</Button>
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
								Order details
							</Button>
						</Link>
					</Grid>
				</Grid>
			</AccordionDetails>
		</Accordion>
	);
};

export default Order;
