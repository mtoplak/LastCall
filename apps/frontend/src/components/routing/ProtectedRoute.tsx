import { useUserAuth } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: any }) => {
	const { user, isLoading } = useUserAuth();
	const location = useLocation();
	//console.log(location.pathname);

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

export default ProtectedRoute;
