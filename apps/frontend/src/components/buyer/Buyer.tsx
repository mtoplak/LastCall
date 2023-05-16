import { useEffect } from 'react';
import Hero from './HeroB';
import Products from './ProductsB';
import { Box } from '@mui/material';
import Footer from '../homepage/Footer';
//import { useAppDispatch } from 'redux-store';
import './buyer.css';

const Buyer = () => {
	useEffect(() => {
		document.title = 'All products';
	}, []);

	return (
		<Box sx={{ backgroundColor: '#E6F0FF' }}>
			<Hero />
			<Products />
			<Footer />
		</Box>
	);
};

export default Buyer;
