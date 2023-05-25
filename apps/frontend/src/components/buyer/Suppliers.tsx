import { useEffect, useState } from 'react';
import Footer from 'components/homepage/Footer';
import { Box, Container, Grid, Typography } from '@mui/material';
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
import PropertiesTextBox from 'components/ui/PropertiesTextBox';
import NavbarB from './NavbarB';

L.Icon.Default.mergeOptions({
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
	iconUrl: require('leaflet/dist/images/marker-icon.png'),
	shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

function Suppliers() {
	const [sellers, setSellers] = useState<ISeller[]>([]);
	const [filterName, setFilterName] = useState('');
	const [filterLocation, setFilterLocation] = useState('any');
	const [filterType, setFilterType] = useState('any');
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		document.title = 'Suppliers';
	}, []);

	useEffect(() => {
		const fetchSellers = async () => {
			try {
				const response = await api.get('/sellers');
				//console.log(response.data);
				setSellers(response.data);
			} catch (error) {
				throw error;
			}
		};
		fetchSellers();
	}, []);

	// filtering
	const filteredSellers = sellers.filter((seller) => {
		const nameMatch =
			filterName === '' ||
			seller.title.toLowerCase().includes(filterName.toLowerCase());
		const typeMatch =
			filterType === 'any' ||
			seller.companyType.toLowerCase() === filterType.toLowerCase();
		const locationMatch =
			filterLocation === 'any' ||
			seller.country
				.toLowerCase()
				.includes(filterLocation.toLowerCase()) ||
			seller.city.toLowerCase().includes(filterLocation.toLowerCase()) ||
			seller.address.toLowerCase().includes(filterLocation.toLowerCase());

		return nameMatch && typeMatch && locationMatch;
	});

	const MapCenter = () => {
		const map = useMap();
		useEffect(() => {
			if (filteredSellers.length > 0) {
				const bounds = L.latLngBounds(
					filteredSellers.map((location: any) => location.coordinates)
				);
				map.fitBounds(bounds);
			} /* else {
				const bounds = L.latLngBounds(
					sellers.map((location: any) => location.coordinates)
				);
				//map.fitBounds(bounds);
			}*/
		}, [map]);
		return null;
	};

	//console.log(filteredSellers);

	return (
		<>
			<NavbarB />

			<Box sx={{ backgroundColor: '#f2f2f2', py: 10 }}>
				<Container>
					<PropertiesTextBox>
						<Typography
							sx={{
								color: '#000339',
								fontSize: '35px',
								fontWeight: 'bold',
								mb: 2,
							}}
						>
							Suppliers
						</Typography>
					</PropertiesTextBox>
					<Box>
						<SearchSuppliersInput
							setFilterName={setFilterName}
							setFilterLocation={setFilterLocation}
							setFilterType={setFilterType}
							setIsChecked={setIsChecked}
						/>
					</Box>
					{isChecked &&
					filteredSellers.length > 0 &&
					(filterType !== 'any' ||
						filterName !== '' ||
						filterLocation !== 'any') ? (
						<MapContainer
							center={[46.056946, 14.505751]}
							zoom={7.5}
							style={{ height: '400px', width: '100%' }}
							attributionControl={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<MapCenter />
							{filteredSellers.map((seller: ISeller) => (
								<Marker
									key={seller._id}
									position={[
										seller.coordinates[0],
										seller.coordinates[1],
									]}
								>
									<Popup>
										<div>
											<h3>{seller.title}</h3>
											<p>{seller.address}</p>
										</div>
									</Popup>
								</Marker>
							))}
						</MapContainer>
					) : isChecked &&
					  (filterType !== 'any' ||
							filterName !== '' ||
							filterLocation !== 'any') &&
					  filteredSellers.length === 0 ? (
						''
					) : isChecked ? (
						<MapContainer
							center={[46.056946, 14.505751]}
							zoom={7.5}
							style={{ height: '400px', width: '100%' }}
							attributionControl={false}
						>
							<TileLayer
								attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>
							<MapCenter />
							{sellers.map((seller: ISeller) => (
								<Marker
									key={seller._id}
									position={[
										seller.coordinates[0],
										seller.coordinates[1],
									]}
								>
									<Popup>
										<div>
											<h3>{seller.title}</h3>
											<p>{seller.address}</p>
										</div>
									</Popup>
								</Marker>
							))}
						</MapContainer>
					) : (
						''
					)}

					<Grid container spacing={2}>
						{filteredSellers.length > 0 &&
						(filterType !== 'any' ||
							filterName !== '' ||
							filterLocation !== 'any') ? (
							filteredSellers.map((seller) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={seller._id}
								>
									<Link
										to={`/supplier/${seller._id}`}
										key={seller._id}
									>
										<Supplier seller={seller} />
									</Link>
								</Grid>
							))
						) : (filterType !== 'any' ||
								filterName !== '' ||
								filterLocation !== 'any') &&
						  filteredSellers.length === 0 ? (
							<Grid item xs={12}>
								<Typography variant="body1">
									Nothing found &#128549;
								</Typography>
							</Grid>
						) : (
							sellers.map((seller) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={4}
									key={seller._id}
								>
									<Link
										to={`/supplier/${seller._id}`}
										key={seller._id}
									>
										<Supplier seller={seller} />
									</Link>
								</Grid>
							))
						)}
					</Grid>
				</Container>
			</Box>
			<Footer />
		</>
	);
}

export default Suppliers;
