import React, { useEffect, useState } from 'react';
import Hero from './HeroB';
import Footer from 'components/homepage/Footer';
import {
	Box,
	Container,
	LinearProgress,
	Typography,
	styled,
} from '@mui/material';
import { ISeller } from 'models/seller';
import api from 'services/api';
import SearchSuppliersInput from './SearchSuppliersInput';
import { Link } from 'react-router-dom';
import Supplier from './Supplier';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet.markercluster/dist/leaflet.markercluster';

// Import the marker cluster CSS file
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
//import MarkerClusterGroup from 'react-leaflet-markercluster';
//import MarkerClusterGroupProps from 'react-leaflet-markercluster';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Suppliers() {
	const [sellers, setSellers] = useState<any[]>([]); //<ISeller[]>
	const [filterName, setFilterName] = useState('');
	const [filterLocation, setFilterLocation] = useState('any');
	const [filterType, setFilterType] = useState('any');
	const [isChecked, setIsChecked] = useState(false);
	const [isLoading, setIsLoading] = useState(false); // map
	const [mapSuppliersData, setMapSuppliersData] = useState<any>([]);

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

	// Create a custom icon for the individual markers
	const markerIcon = L.icon({
		iconUrl: '/path/to/marker-icon.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
	});

	const MapCenter = () => {
		const map = useMap();
		useEffect(() => {
			if (mapSuppliersData.length > 0) {
				const bounds = L.latLngBounds(
					mapSuppliersData.map(
						(location: any) => location.coordinates
					)
				);
				map.fitBounds(bounds);
			}
		}, [map]);
		return null;
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			if (
				filterName !== '' ||
				filterLocation !== 'any' ||
				filterType !== 'any'
			) {
				const data = await Promise.all(
					filteredSellers.map(async (seller) => {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/search?format=json&q=${seller.address}+${seller.city}+${seller.country}&addressdetails=1&limit=1&polygon_svg=1`
						);
						const responseData = await response.json();
						return {
							name: seller.title,
							address:
								seller.address +
								', ' +
								seller.city +
								', ' +
								seller.country,
							coordinates: [
								responseData[0]?.lat,
								responseData[0]?.lon,
							],
						};
					})
				);
				setMapSuppliersData(data);
				console.log(data);
			} else {
				const data = await Promise.all(
					sellers.map(async (seller) => {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/search?format=json&q=${seller.address}+${seller.city}+${seller.country}&addressdetails=1&limit=1&polygon_svg=1`
						);
						const responseData = await response.json();
						return {
							name: seller.title,
							address:
								seller.address +
								', ' +
								seller.city +
								', ' +
								seller.country,
							coordinates: [
								responseData[0]?.lat,
								responseData[0]?.lon,
							],
						};
					})
				);
				setMapSuppliersData(data);
				console.log(data);
			}
			setIsLoading(false);
		};
		if (isChecked) {
			fetchData();
		}
	}, [isChecked, filterName, filterLocation, filterType, sellers]);

	console.log(filteredSellers);
	console.log(mapSuppliersData);

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
					{isChecked && !isLoading && mapSuppliersData.length > 0 && (
						<PropertiesBox>
							<MapContainer
								center={[46.056946, 14.505751]}
								zoom={7.9}
								style={{ height: '400px', width: '100%' }}
								attributionControl={false}
							>
								<TileLayer
									attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<MapCenter />
								{mapSuppliersData.map(
									(location: any, index: any) => (
										<Marker
											key={index}
											position={[
												location.coordinates[0],
												location.coordinates[1],
											]}
										>
											<Popup>
												<div>
													<h3>{location.name}</h3>
													<p>{location.address}</p>
												</div>
											</Popup>
										</Marker>
									)
								)}
							</MapContainer>
						</PropertiesBox>
					)}
					{isChecked && isLoading && (
						<Box sx={{ width: '100%' }}>
							<LinearProgress />
						</Box>
					)}

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
