import { useEffect } from 'react';
import Hero from './HeroB';
import Products from './ProductsB';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
//import { useAppDispatch } from 'redux-store';
import '../../assets/styles/buyer.css';
import NavbarB from './NavbarB';
import NavbarS from 'components/seller/NavbarS';
import { useUserAuth } from 'context/AuthContext';
import HeroS from 'components/seller/HeroS';

const Buyer = () => {
	const location = useLocation();
	const { role } = useUserAuth();

	useEffect(() => {
		document.title = 'Last Call';
		window.scrollTo(0, 0);
	}, []);

	return (
		<Box sx={{ backgroundColor: '#E6F0FF' }}>
			{role === 'seller' ? <NavbarS /> : <NavbarB />}
			{location.pathname === '/' && (role === 'buyer' || !role) ? (
				<Hero />
			) : (
				role === 'seller' && <HeroS />
			)}
			<Products />
		</Box>
	);
};

export default Buyer;
