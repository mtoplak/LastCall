import React from 'react';
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	Grid,
	Divider,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	CardMedia,
	Button,
} from '@mui/material';
import NavbarB from './NavbarB';
import api from '../../services/api';
import { IOrder } from 'models/order';
import { ISeller } from 'models/seller';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import picture from '../../assets/images/cocacola.jpg';
import { IDrink } from 'models/drink';
import { Link } from 'react-router-dom';

interface OrderProps {
	_id: string;
	products: IDrink[];
	total: number;
	dateOfPurchase: Date;
	dateOfDelivery: Date;
	address: string;
	city: string;
	country: string;
	seller: ISeller;
}

const Order: React.FC<OrderProps> = ({ _id,
	products,
	total,
	dateOfPurchase,
	dateOfDelivery,
	address,
	city,
	country,
	seller, }: OrderProps) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Typography sx={{ width: '33%', flexShrink: 0 }}>
					<b>ORDER STATUS: </b>
					status
				</Typography>
				<Typography sx={{ color: 'text.secondary' }}>
					Date of Delivery/Purchase:
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Divider />
				<CardMedia
					component="img"
					image={picture}
					sx={{ width: '20%', height: 'auto', mb: 2, mt: 2 }}
				/>
				<Divider />
				<Grid
					container
					sx={{ mt: 2, display: 'flex', flexWrap: 'wrap' }}
				>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ width: '33%', flexShrink: 0 }}>
							<b>Order ID: </b>
							{_id}
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
						<Link to={`/order/${_id}`} key={_id}>
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
