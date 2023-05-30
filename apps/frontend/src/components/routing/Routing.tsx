import { Route, Routes } from 'react-router-dom';
import Buyer from 'components/buyer/Buyer';
import Page404 from 'components/404/Page404';
import Unauthorized from 'components/404/Unauthorized';
import Seller from '../seller/Seller';
import Product from 'components/buyer/Product';
import Suppliers from 'components/buyer/Suppliers';
import SellerPage from 'components/seller/SellerPage';
import Cart from 'components/buyer/Cart';
import PastOrders from 'components/buyer/PastOrders';
import BuyerProtectedRoute from './BuyerProtectedRoute';
import SignUpPage from 'components/buyer/login/SignUpPage';
import SignInPage from 'components/buyer/login/SignInPage';
import SignUpS from 'components/seller/login/SignUpS';
import SignInS from 'components/seller/login/SignInS';
import SellersOrderPage from 'components/seller/SellersOrderPage';
import SingleOrder from 'components/buyer/SingleOrder';
import SellerProtectedRoute from './SellerProtectedRoute';
import EditSellerProfile from 'components/seller/EditSellerProfile';
import Sales from 'components/seller/Sales';

const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Buyer />} />
			<Route path="/suppliers" element={<Suppliers />} />
			<Route path="/products" element={<Buyer />} />
			<Route path="/product/:id" element={<Product />} />
			<Route path="/supplier/:id" element={<SellerPage />} />
			<Route
				path="/cart"
				element={
					<BuyerProtectedRoute>
						<Cart />
					</BuyerProtectedRoute>
				}
			/>
			<Route
				path="/orders"
				element={
					<BuyerProtectedRoute>
						<PastOrders />
					</BuyerProtectedRoute>
				}
			/>
			<Route path="/buy/signup" element={<SignUpPage />} />
			<Route path="/sell/signup" element={<SignUpS />} />
			<Route path="/sell/signin/*" element={<SignInS />} />
			<Route path="/buy/signin/*" element={<SignInPage />} />
			<Route path="/order/:id" element={<SingleOrder />} />
			<Route
				path="/orders"
				element={
					<BuyerProtectedRoute>
						<PastOrders />
					</BuyerProtectedRoute>
				}
			/>
			<Route
				path="/sell/editprofile"
				element={
					<SellerProtectedRoute>
						<EditSellerProfile />
					</SellerProtectedRoute>
				}
			/>
			<Route
				path="/inventory"
				element={
					<SellerProtectedRoute>
						<Seller />
					</SellerProtectedRoute>
				}
			/>
			<Route
				path="/seller/orders"
				element={
					<SellerProtectedRoute>
						<SellersOrderPage />
					</SellerProtectedRoute>
				}
			/>
			<Route
				path="/seller/sales"
				element={
					<SellerProtectedRoute>
						<Sales />
					</SellerProtectedRoute>
				}
			/>
			<Route
				path="/seller"
				element={
					<SellerProtectedRoute>
						<Seller />
					</SellerProtectedRoute>
				}
			/>
			<Route path="/unauthorized" element={<Unauthorized />} />
			<Route path="*" element={<Page404 />} />
		</Routes>
	);
};
export default Routing;
