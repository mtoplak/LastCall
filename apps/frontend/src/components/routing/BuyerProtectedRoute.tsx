import { useUserAuth } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// buyer must be logged in to access this route
const BuyerProtectedRoute = ({ children }: { children: any }) => {
	const { user, isLoading, role } = useUserAuth();
	const location = useLocation();
	//console.log(location.pathname);

	if (role !== 'buyer' && !isLoading) {
		return <Navigate to={`/unauthorized`} replace />;
	}

	if (!user && !isLoading) {
		return (
			<Navigate
				to={`/buy/signin?redirect=${encodeURIComponent(
					location.pathname
				)}`}
				replace
			/>
		);
	}

	return children;
};

export default BuyerProtectedRoute;
