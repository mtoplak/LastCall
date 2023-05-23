import React from 'react';
import {
	Box,
	//	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';

interface SearchInputProps {
	setFilterName: React.Dispatch<React.SetStateAction<string>>;
	setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
	setFilterType: React.Dispatch<React.SetStateAction<string>>;
	filterLocation: string;
	filterName: string;
	filterType: string;
}

const SearchProductsInput = ({
	setFilterLocation,
	setFilterName,
	setFilterType,
}: SearchInputProps) => {
	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: 2, textAlign: 'center' }}>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<TextField
					id="outlined-basic"
					label="Product Name"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={(event) => setFilterName(event.target.value)}
				/>
			</FormControl>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-location">Location</InputLabel>
				<Select
					labelId="filter-location"
					label="Location"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					defaultValue="any"
					onChange={(event) => setFilterLocation(event.target.value)}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value="Slovenia">Slovenia</MenuItem>
					<MenuItem value="Austria">Austria</MenuItem>
					<MenuItem value="United Kingdom">United Kingdom</MenuItem>
				</Select>
			</FormControl>

			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-type">Drink type</InputLabel>
				<Select
					labelId="filter-type"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					label="Location"
					defaultValue="any"
					onChange={(event) => setFilterType(event.target.value)}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value="Beer">Beer</MenuItem>
					<MenuItem value="Wine">Wine</MenuItem>
					<MenuItem value="Champagne">Champagne</MenuItem>
					<MenuItem value="Other">Other</MenuItem>
				</Select>
				{/*<Button
					variant="contained"
					sx={{ backgroundColor: '#262626', color: '#ffffff', mt: 0 }}
				>
					Filter
				</Button>*/}
			</FormControl>
		</Box>
	);
};

export default SearchProductsInput;
