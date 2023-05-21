import { Route, Routes } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Buyer from 'components/buyer/Buyer';
import Page404 from 'components/404/Page404';
import Seller from '../seller/Seller';
import Product from 'components/buyer/Product';
import Suppliers from 'components/buyer/Suppliers';
import SellerPage from 'components/seller/SellerPage';
import Cart from 'components/buyer/Cart';
import PastOrders from 'components/buyer/PastOrders';
import SingleOrder from 'components/buyer/SingleOrder';
import { useState } from 'react';
import { IOrder } from 'models/order';
import SellersOrderPage from 'components/seller/SellersOrderPage';

const Routing = () => {

	return (
		<>
			<Routes>
				<Route path="/" element={<Buyer />} />
				<Route path="/seller" element={<Seller />} />
				<Route path="/suppliers" element={<Suppliers />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/supplier/:id" element={<SellerPage />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/orders" element={<PastOrders />} />
				<Route path="/order/:id" element={<SingleOrder />} />
				<Route path="/seller/orders" element={<SellersOrderPage />} />
				<Route path="*" element={<Page404 />} />
			</Routes>
		</>
	);
};
export default Routing;
