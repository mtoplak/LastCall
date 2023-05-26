import HeroS from './HeroS';
import Footer from 'components/homepage/Footer';
import ProductsS from './ProductsS';
import { useLocation } from 'react-router-dom';
import NavbarS from './NavbarS';

function Seller() {
	const location = useLocation();

	return (
		<>
			<NavbarS />
			{location.pathname === 'seller' && <HeroS />}
			<ProductsS />
		</>
	);
}

export default Seller;
