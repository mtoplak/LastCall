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
} from '@mui/material';
import NavbarB from './NavbarB';
import api from '../../services/api';
import { IOrder } from 'models/order';
import { ISeller } from 'models/seller';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import picture from '../../assets/images/cocacola.jpg';

interface OrderProps {
	products: IOrder[];
	order: IOrder;
}

const Order: React.FC<OrderProps> = ({ order, products }: OrderProps) => {
	return (
		<Accordion>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1a-content"
				id="panel1a-header"
			>
				<Grid>
					<CardMedia
						component="img"
						image={picture}
						sx={{ width: '20%', height: 'auto' }}
					/>
				</Grid>
			</AccordionSummary>
			<AccordionDetails>
				<Typography color={'#333333'}>
					<b>ORDER ID:</b>
					{order._id}
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default Order;
