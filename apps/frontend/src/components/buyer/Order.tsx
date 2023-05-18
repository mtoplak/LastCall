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
	_id: string;
	products: IOrder[];
	total: number;
	dateOfPurchase: Date;
	dateOfDelivery: Date;
	address: string;
	city: string;
	country: string;
	seller: ISeller;
}

const Order: React.FC<OrderProps> = ({
	_id,
	products,
	total,
	dateOfPurchase,
	dateOfDelivery,
	address,
	city,
	country,
	seller,
}) => {
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
					{_id}
				</Typography>
			</AccordionDetails>
		</Accordion>
	);
};

export default Order;
