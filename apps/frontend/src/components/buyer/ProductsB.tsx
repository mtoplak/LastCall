import { Box, Container, styled, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Drink from './DrinkB';
import SearchInput from './SearchInput';
import api from 'services/api';
import { IDrink } from 'models/drink';
import drink1 from '../../assets/images/cocacola.jpg';
import { Link } from 'react-router-dom';

const Products = () => {
	const [drinks, setDrinks] = useState<IDrink[]>([]);

	// filtering
	const [filterName, setFilterName] = useState<string>('');
	const [filterLocation, setFilterLocation] = useState<string>('');
	const [filterType, setFilterType] = useState<string>('any');

	const PropertiesBox = styled(Box)(({ theme }) => ({
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap', // Allow products to wrap to the next line
		marginTop: theme.spacing(5),
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			alignItems: 'center',
		},
	}));

	const DrinkContainer = styled(Box)(({ theme }) => ({
		flex: '0 0 25.33%', // Set the width to one-third of the container
		marginBottom: theme.spacing(4), // Add some margin between the products
	}));

	const PropertiesTextBox = styled(Box)(({ theme }) => ({
		[theme.breakpoints.down('md')]: {
			textAlign: 'center',
		},
	}));

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get('/products');
				console.log(response.data);
				setDrinks(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, []);
	/*
	const filteredDrinks = drinks.filter((drink) => {
		if (filterName === 'any') {
			return true;
		} else if (
			drink.title.toLowerCase().includes(filterName.toLowerCase())
		) {
			return true;
		}
		return false;
	});*/
	const filteredDrinks = drinks.filter((drink) => {
		const nameMatch =
			filterName === 'any' ||
			drink.title.toLowerCase().includes(filterName.toLowerCase());
		const typeMatch =
			filterType === 'any' ||
			drink.drinkCategory.toLowerCase() === filterType.toLowerCase();
		return nameMatch && typeMatch;
	});

	console.log(filterType);
	console.log(filterName);
	console.log(filteredDrinks);
	return (
		<Box sx={{ mt: 5, backgroundColor: 'white', py: 10 }}>
			<Container>
				<Box>
					<SearchInput
						setFilterName={setFilterName}
						setFilterLocation={setFilterLocation}
						setFilterType={setFilterType}
						filterLocation={filterLocation}
						filterName={filterName}
						filterType={filterType}
					/>
				</Box>
				<PropertiesTextBox>
					<Typography
						sx={{
							color: '#000339',
							fontSize: '35px',
							fontWeight: 'bold',
						}}
					>
						Products
					</Typography>
					<Typography
						sx={{ color: '#5A6473', fontSize: '16px', mt: 1 }}
					>
						Everything that you're looking for!
					</Typography>
				</PropertiesTextBox>
				<PropertiesBox>
					{filteredDrinks.length > 0 &&
					(filterType !== 'any' ||
						filterName !== '' ||
						filterLocation !== 'any') ? (
						filteredDrinks.map((drink) => (
							<Link to={`/product/${drink.id}`} key={drink.id}>
								<DrinkContainer>
									<Drink
										name={drink.title}
										img={drink1}
										price={drink.price}
									/>
								</DrinkContainer>
							</Link>
						))
					) : (filterType !== 'any' ||
							filterName !== '' ||
							filterLocation !== 'any') &&
					  filteredDrinks.length === 0 ? (
						<>Nothing found &#128549;</>
					) : (
						drinks.map((drink) => (
							<Link to={`/product/${drink.id}`} key={drink.id}>
								<DrinkContainer>
									<Drink
										name={drink.title}
										img={drink1}
										price={drink.price}
									/>
								</DrinkContainer>
							</Link>
						))
					)}
				</PropertiesBox>
			</Container>
		</Box>
	);
};

export default Products;
