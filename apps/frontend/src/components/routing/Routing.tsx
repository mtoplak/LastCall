import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Buyer from 'components/buyer/Buyer';
import Page404 from 'components/404/Page404';
import Seller from '../seller/Seller';
import Product from 'components/buyer/Product';
import Suppliers from 'components/buyer/Suppliers';
import SellerPage from 'components/seller/SellerPage';
import SignUpPage from 'components/buyer/login/SignUpPage';
import SignInPage from 'components/buyer/login/SignInPage';
import { AuthContextProviver } from 'context/AuthContext';

const Routing = () => {
	return (
		<>
			<AuthContextProviver>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/buyer" element={<Buyer />} />
					<Route path="/seller" element={<Seller />} />
					<Route path="/suppliers" element={<Suppliers />} />
					<Route path="/buy/signup" element={<SignUpPage />} />
					<Route path="/buy/signin" element={<SignInPage />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/supplier/:id" element={<SellerPage />} />
					<Route path="*" element={<Page404 />} />
				</Routes>
			</AuthContextProviver>
		</>
	);
};
export default Routing;
