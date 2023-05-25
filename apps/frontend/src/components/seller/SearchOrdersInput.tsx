import React from 'react';
import {
	Box,
	Card,
	//	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
    Typography,
} from '@mui/material';

interface SearchInputProps {
	setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
	filterStatus: string;
}

const SearchOrdersInput = ({
	setFilterStatus,
}: SearchInputProps) => {
	return (
		<Card sx={{ p: 2, textAlign: 'center' }}>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-status">Status</InputLabel>
				<Select
					labelId="filter-status"
					label="Status"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					defaultValue="any"
					onChange={(event) => setFilterStatus(event.target.value)}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value="Order placed">Order placed</MenuItem>
					<MenuItem value="In-Transit">In-Transit</MenuItem>
					<MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Cancel">Cancel</MenuItem>
					<MenuItem value="Pending">Pending</MenuItem>
				</Select>
			</FormControl>
		</Card>
	);
};

export default SearchOrdersInput;