import { useEffect } from 'react';
import Hero from './HeroB';
import Products from './ProductsB';
import { Box } from '@mui/material';
import Footer from '../homepage/Footer';
import { useLocation } from 'react-router-dom';
//import { useAppDispatch } from 'redux-store';
import '../../assets/styles/buyer.css';
import NavbarB from './NavbarB';

const Buyer = () => {
	const location = useLocation();

	useEffect(() => {
		document.title = 'Last Call';
	}, []);

	return (
		<Box sx={{ backgroundColor: '#E6F0FF' }}>
			<NavbarB />
			{location.pathname === '/' && <Hero />}
			<Products />
		</Box>
	);
};

export default Buyer;
