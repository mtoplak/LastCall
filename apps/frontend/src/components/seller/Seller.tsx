import HeroS from './HeroS';
import ProductsS from './ProductsS';
import { useLocation } from 'react-router-dom';
import NavbarS from './NavbarS';
import { useEffect } from 'react';

function Seller() {
	const location = useLocation();

	useEffect(() => {
		document.title = 'My Inventory';
	}, []);

	return (
		<>
			<NavbarS />
			{location.pathname === 'seller' && <HeroS />}
			<ProductsS />
		</>
	);
}

export default Seller;
