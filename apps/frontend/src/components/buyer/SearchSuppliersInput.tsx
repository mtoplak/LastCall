import React from 'react';
import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { SellerType } from '../../enums/seller.enum';

interface SearchInputProps {
	setFilterName: React.Dispatch<React.SetStateAction<string>>;
	setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
	setFilterType: React.Dispatch<React.SetStateAction<SellerType | 'any'>>;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchSuppliersInput({
	setFilterLocation,
	setFilterName,
	setFilterType,
	setIsChecked,
}: SearchInputProps) {
	return (
		<Box sx={{ backgroundColor: '#F5F5F5', p: 2, textAlign: 'center' }}>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<TextField
					id="outlined-basic"
					label="Supplier Name"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={(event) => setFilterName(event.target.value)}
				/>
			</FormControl>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				{/*<InputLabel id="filter-location">Location</InputLabel>*/}
				<TextField
					id="outlined-basic"
					label="Supplier Location"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={(event) => setFilterLocation(event.target.value)}
				/>
			</FormControl>

			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				<InputLabel id="filter-type">Type</InputLabel>
				<Select
					labelId="filter-type"
					sx={{ mr: 3, mb: 2, mt: 2, width: '150px' }}
					label="Location"
					defaultValue="any"
					onChange={(event) =>
						setFilterType(event.target.value as SellerType | 'any')
					}
				>
					<MenuItem value="any">Any</MenuItem>
					<MenuItem value={SellerType.WINERY}>Winery</MenuItem>
					<MenuItem value={SellerType.BREWERY}>Brewery</MenuItem>
					<MenuItem value={SellerType.OTHER}>Other</MenuItem>
				</Select>
			</FormControl>
			<br />
			<FormControlLabel
				control={
					<Checkbox
						onChange={(event) => setIsChecked(event.target.checked)}
					/>
				}
				label="Show on maps"
			/>
		</Box>
	);
}

export default SearchSuppliersInput;
