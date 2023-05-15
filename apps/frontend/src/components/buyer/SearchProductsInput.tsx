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
	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setFilterName(event.target.value);
	};

	const handleChangeLocation = (event: any) => {
		setFilterLocation(event.target.value);
	};

	const handleChangeType = (event: any) => {
		setFilterType(event.target.value);
	};

	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: 2, textAlign: 'center' }}>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<TextField
					id="outlined-basic"
					label="Product Name"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={handleChangeName}
				/>
			</FormControl>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-location">Location</InputLabel>
				<Select
					labelId="filter-location"
					label="Location"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					defaultValue="any"
					onChange={handleChangeLocation}
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
					onChange={handleChangeType}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value="Alcohol">Alcohol</MenuItem>
					<MenuItem value="Carbonated">Carbonated</MenuItem>
					<MenuItem value="Not carbonated">Not carbonated</MenuItem>
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
