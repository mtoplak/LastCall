import { Route, Routes } from 'react-router-dom';
import Buyer from 'components/buyer/Buyer';
import Page404 from 'components/404/Page404';
import Seller from '../seller/Seller';
import Product from 'components/buyer/Product';
import Suppliers from 'components/buyer/Suppliers';
import SellerPage from 'components/seller/SellerPage';
import Cart from 'components/buyer/Cart';
import PastOrders from 'components/buyer/PastOrders';
import ProtectedRoute from './ProtectedRoute';
import { AuthContextProvider } from 'context/AuthContext';
import SignUpPage from 'components/buyer/login/SignUpPage';
import SignInPage from 'components/buyer/login/SignInPage';
import SignUpS from 'components/seller/login/SignUpS';
import SignInS from 'components/seller/login/SignInS';

const Routing = () => {
	return (
		<>
			<AuthContextProvider>
				<Routes>
					<Route path="/" element={<Buyer />} />
					<Route
						path="/seller"
						element={
							<ProtectedRoute>
								<Seller />
							</ProtectedRoute>
						}
					/>
					<Route path="/suppliers" element={<Suppliers />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/supplier/:id" element={<SellerPage />} />
					<Route
						path="/cart"
						element={
							<ProtectedRoute>
								<Cart />
							</ProtectedRoute>
						}
					/>
					<Route path="/buy/signup" element={<SignUpPage />} />
					<Route path="/sell/signup" element={<SignUpS />} />
					<Route path="/sell/signin/*" element={<SignInS />} />
					<Route path="/buy/signin/*" element={<SignInPage />} />
					<Route path="/orders" element={<PastOrders />} />
					<Route path="*" element={<Page404 />} />
				</Routes>
			</AuthContextProvider>
		</>
	);
};
export default Routing;
