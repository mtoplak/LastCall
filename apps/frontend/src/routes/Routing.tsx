import { FC, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

//import Page1 from 'pages/Page1';
import Homepage from 'components/homepage/Homepage';
import Buyer from 'components/buyer/Buyer';
import Seller from 'components/seller/Seller';
const Page2 = lazy(() => import('pages/Page2'));
const Page404 = lazy(() => import('pages/Page404'));

const Routing: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Homepage />} />
			<Route path="/buyer" element={<Buyer />} />
			<Route path="/seller" element={<Seller />} />
			<Route path="/page-2" element={<Page2 />} />
			<Route element={<Page404 />} />
		</Routes>
	);
};

export default Routing;
