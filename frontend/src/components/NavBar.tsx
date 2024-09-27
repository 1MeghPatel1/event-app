import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
	const authContext = useContext(AuthContext);
	const location = useLocation();

	const handleLogout = () => {
		authContext?.logout();
	};

	return (
		<nav className="bg-white shadow-md">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="text-2xl font-bold">
					<Link to="/">Events App</Link>
				</div>
				<div className="flex space-x-4">
					{authContext?.isAuthenticated ? (
						<>
							<span className="text-gray-800 font-semibold">
								Welcome, {authContext.user}
							</span>
							<button
								onClick={handleLogout}
								className="text-gray-800 hover:text-blue-500 font-semibold"
							>
								Logout
							</button>
							<>
								{location.pathname === "/" ? (
									<Link
										to="/dashboard"
										className="text-gray-800 hover:text-blue-500 font-semibold"
									>
										Dashboard
									</Link>
								) : (
									<Link
										to="/"
										className="text-gray-800 hover:text-blue-500 font-semibold"
									>
										Home
									</Link>
								)}
							</>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="text-gray-800 hover:text-blue-500 font-semibold"
							>
								Login
							</Link>
							<Link
								to="/signup"
								className="text-gray-800 hover:text-blue-500 font-semibold"
							>
								Signup
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;

