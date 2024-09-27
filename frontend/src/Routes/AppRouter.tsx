import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "../pages/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";

const AppRouter = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />

				{/* Protected route for the dashboard */}
				<Route element={<ProtectedRoute />}>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</AuthProvider>
	);
};

export default AppRouter;

