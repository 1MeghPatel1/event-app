// ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute: React.FC = () => {
	const authContext = useContext(AuthContext);

	// Show a loading state while authentication is being verified
	if (authContext?.loading) {
		return <div>Loading...</div>; // You can replace this with a spinner or any custom loader
	}

	if (!authContext?.isAuthenticated) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;

