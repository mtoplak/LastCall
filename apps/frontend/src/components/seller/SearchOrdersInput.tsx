import React from 'react';
import {
	Box,
	Card,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { OrderStatus } from 'enums/order.enum';

interface SearchInputProps {
	setFilterStatus: React.Dispatch<React.SetStateAction<OrderStatus | 'any'>>;
	filterStatus: OrderStatus | 'any';
}

const SearchOrdersInput = ({ setFilterStatus }: SearchInputProps) => {
	return (
		<Card sx={{ p: 2, textAlign: 'center' }}>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-status">Status</InputLabel>
				<Select
					labelId="filter-status"
					label="Status"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					defaultValue="any"
					onChange={(event) =>
						setFilterStatus(
							event.target.value as OrderStatus | 'any'
						)
					}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value={OrderStatus.PENDING}>Pending</MenuItem>
					<MenuItem value={OrderStatus.ACCEPTED}>Accepted</MenuItem>
					<MenuItem value={OrderStatus.INTRANSIT}>In transit</MenuItem>
					<MenuItem value={OrderStatus.REJECTED}>Rejected</MenuItem>
					<MenuItem value={OrderStatus.DELIVERED}>Delivered</MenuItem>
				</Select>
			</FormControl>
		</Card>
	);
};

export default SearchOrdersInput;
