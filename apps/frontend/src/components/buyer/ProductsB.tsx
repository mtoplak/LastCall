import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Drink from './DrinkB';
import SearchProductsInput from './SearchProductsInput';
import api from 'services/api';
import { IDrink } from 'models/drink';
import { Link } from 'react-router-dom';
import DrinkContainer from 'components/ui/DrinkContainer';
import PropertiesBox from 'components/ui/PropertiesBox';
import PropertiesTextBox from 'components/ui/PropertiesTextBox';

const Products = () => {
	const [drinks, setDrinks] = useState<IDrink[]>([]);
	//console.log(drinks);

	// filtering
	const [filterName, setFilterName] = useState<string>('');
	const [filterLocation, setFilterLocation] = useState<string>('any');
	const [filterType, setFilterType] = useState<string>('any');

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await api.get('/products');
				setDrinks(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchProducts();
	}, []);

	// filtering
	const filteredDrinks = drinks.filter((drink) => {
		const nameMatch =
			filterName === '' ||
			drink.title.toLowerCase().includes(filterName.toLowerCase());
		const typeMatch =
			filterType === 'any' ||
			drink.drinkCategory.toLowerCase() === filterType.toLowerCase();
		const locationMatch =
			filterLocation === 'any' ||
			drink.seller.country.toLowerCase() === filterLocation.toLowerCase();
		return nameMatch && typeMatch && locationMatch;
	});
	/*
	console.log(filterName);
	console.log(filterLocation);
	console.log(filterType);
	console.log(filteredDrinks);*/
	return (
		<Box sx={{ backgroundColor: '#f2f2f2', py: 10 }}>
			<Container>
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
						sx={{
							color: '#5A6473',
							fontSize: '16px',
							mt: 1,
							mb: 2,
						}}
					>
						Everything that you're looking for!
					</Typography>
				</PropertiesTextBox>
				<Box>
					<SearchProductsInput
						setFilterName={setFilterName}
						setFilterLocation={setFilterLocation}
						setFilterType={setFilterType}
						filterLocation={filterLocation}
						filterName={filterName}
						filterType={filterType}
					/>
				</Box>
				<PropertiesBox>
					{filteredDrinks.length > 0 &&
					(filterType !== 'any' ||
						filterName !== '' ||
						filterLocation !== 'any') ? (
						filteredDrinks.map((drink) => (
							<Link to={`/product/${drink._id}`} key={drink._id}>
								<DrinkContainer>
									<Drink drink={drink} />
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
							<Link to={`/product/${drink._id}`} key={drink._id}>
								<DrinkContainer>
									<Drink drink={drink} />
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
