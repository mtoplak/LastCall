import React, { useEffect, useState } from 'react';
import Hero from './HeroB';
import Footer from 'components/homepage/Footer';
import { Box, Container, Typography, styled } from '@mui/material';
import { ISeller } from 'models/seller';
import api from 'services/api';
import SearchSuppliersInput from './SearchSuppliersInput';
import { Link } from 'react-router-dom';
import Supplier from './Supplier';

function Suppliers() {
	const [sellers, setSellers] = useState<any[]>([]); //<ISeller[]>
	const [filterName, setFilterName] = useState('');
	const [filterLocation, setFilterLocation] = useState('any');
	const [filterType, setFilterType] = useState('any');
	const [isChecked, setIsChecked] = useState(false);

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

	useEffect(() => {
		document.title = 'Suppliers';
	}, []);

	const SellerContainer = styled(Box)(({ theme }) => ({
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
				const response = await api.get('/sellers');
				console.log(response.data);
				setSellers(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchData();
	}, []);

	// filtering
	const filteredSellers = sellers.filter((seller) => {
		const nameMatch =
			filterName === '' ||
			seller.title.toLowerCase().includes(filterName.toLowerCase());
		const typeMatch =
			filterType === 'any' || seller.tip === filterType.toLowerCase();
		const locationMatch =
			filterLocation === 'any' ||
			seller.country
				.toLowerCase()
				.includes(filterLocation.toLowerCase()) ||
			seller.city.toLowerCase().includes(filterLocation.toLowerCase()) ||
			seller.address.toLowerCase().includes(filterLocation.toLowerCase());

		return nameMatch && typeMatch && locationMatch;
	});

	console.log(filterName);
	console.log(filterLocation);
	console.log(filterType);

	console.log(filteredSellers);

	return (
		<>
			<Hero />
			<Box sx={{ mt: 5, backgroundColor: 'white', py: 10 }}>
				<Container>
					<Box>
						<SearchSuppliersInput
							setFilterName={setFilterName}
							setFilterLocation={setFilterLocation}
							setFilterType={setFilterType}
							setIsChecked={setIsChecked}
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
							Suppliers
						</Typography>
					</PropertiesTextBox>
					<PropertiesBox>{isChecked && 'Prikaži mapo'}</PropertiesBox>
					<PropertiesBox>
						{filteredSellers.length > 0 &&
						(filterType !== 'any' ||
							filterName !== '' ||
							filterLocation !== 'any') ? (
							filteredSellers.map((seller) => (
								<Link
									to={`/supplier/${seller.id}`}
									key={seller.id}
								>
									<SellerContainer>
										<Supplier
											title={seller.title}
											tip={seller.tip}
											city={seller.city}
											country={seller.country}
										/>
									</SellerContainer>
								</Link>
							))
						) : (filterType !== 'any' ||
								filterName !== '' ||
								filterLocation !== 'any') &&
						  filteredSellers.length === 0 ? (
							<>Nothing found &#128549;</>
						) : (
							sellers.map((seller) => (
								<Link
									to={`/supplier/${seller.id}`}
									key={seller.id}
								>
									<SellerContainer>
										<Supplier
											title={seller.title}
											tip={seller.tip}
											city={seller.city}
											country={seller.country}
										/>
									</SellerContainer>
								</Link>
							))
						)}
					</PropertiesBox>
				</Container>
			</Box>
			<Footer />
		</>
	);
}

export default Suppliers;
