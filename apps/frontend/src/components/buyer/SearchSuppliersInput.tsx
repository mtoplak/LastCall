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

interface SearchInputProps {
	setFilterName: React.Dispatch<React.SetStateAction<string>>;
	setFilterLocation: React.Dispatch<React.SetStateAction<string>>;
	setFilterType: React.Dispatch<React.SetStateAction<string>>;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchSuppliersInput({
	setFilterLocation,
	setFilterName,
	setFilterType,
	setIsChecked,
}: SearchInputProps) {
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
					label="Supplier Name"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={handleChangeName}
				/>
			</FormControl>
			<FormControl sx={{ display: 'inline-block', alignItems: 'center' }}>
				{/*<InputLabel id="filter-location">Location</InputLabel>*/}
				<TextField
					id="outlined-basic"
					label="Supplier Location"
					variant="outlined"
					sx={{ mr: 3, mb: 2, mt: 2 }}
					onChange={handleChangeLocation}
				/>
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
					<MenuItem value="winery">Winery</MenuItem>
					<MenuItem value="brewery">Brewery</MenuItem>
					<MenuItem value="other">Other</MenuItem>
				</Select>
			</FormControl>
			<br />
			<FormControlLabel
				control={
					<Checkbox
						onChange={(event, checked) => setIsChecked(checked)}
					/>
				}
				label="Show on maps"
			/>

			<Button
				variant="contained"
				sx={{ backgroundColor: '#262626', color: '#ffffff', mt: 0 }}
			>
				Search
			</Button>
		</Box>
	);
}

export default SearchSuppliersInput;
