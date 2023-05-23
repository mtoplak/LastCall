import { useUserAuth } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// seller must be logged in to access this route
const SellerProtectedRoute = ({ children }: { children: any }) => {
	const { user, isLoading, role } = useUserAuth();
	const location = useLocation();
	//console.log(location.pathname);

	if (role !== 'seller' && !isLoading) {
		return <Navigate to={`/sell/signin`} replace />;
	}

	if (!user && !isLoading) {
		return (
			<Navigate
				to={`/sell/signin?redirect=${encodeURIComponent(
					location.pathname
				)}`}
				replace
			/>
		);
	}

	return children;
};

export default SellerProtectedRoute;
