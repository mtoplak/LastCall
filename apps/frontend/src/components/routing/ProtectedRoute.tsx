import { useUserAuth } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: any }) => {
	const { user } = useUserAuth();

	if (!user) {
		return <Navigate to="/buy/signin" />;
	}

	return children;
};

export default ProtectedRoute;
