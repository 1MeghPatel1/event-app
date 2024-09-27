import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/auth.services";
import { AuthContext } from "../../context/AuthContext";
import loginSchema from "../../validationSchemas/loginSchema";

const Login: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	// Set up useForm with zod validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ email: string; password: string }>({
		resolver: zodResolver(loginSchema),
	});

	// Handle form submission
	const onSubmit = async (formData: { email: string; password: string }) => {
		setError(null);

		try {
			const data = await login(formData);
			authContext?.login(data.accessToken, data.user.name);

			// Navigate to dashboard after successful login
			navigate("/dashboard");
		} catch (err) {
			setError("Invalid email or password. Please try again.");
			console.error("Login error: ", err);
		}
	};

	useEffect(() => {
		if (authContext?.user) {
			navigate("/dashboard");
		}
	}, [authContext?.user, navigate]);

	return (
		<div className="flex justify-center items-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
				{/* Home Link */}
				<Link
					to="/"
					className="absolute top-4 left-4 text-blue-500 hover:underline text-sm font-semibold"
				>
					← Home
				</Link>

				<h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

				{/* Error Message */}
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-bold mb-2"
						>
							Email
						</label>
						<input
							type="email"
							id="email"
							{...register("email")}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your email"
							disabled={!!authContext?.user}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email.message}</p>
						)}
					</div>

					<div className="mb-6">
						<label
							htmlFor="password"
							className="block text-gray-700 font-bold mb-2"
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							{...register("password")}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your password"
							disabled={!!authContext?.user}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
						disabled={!!authContext?.user}
					>
						Login
					</button>

					<p className="mt-4 text-center">
						Don't have an account?{" "}
						<Link to="/signup" className="text-blue-500 hover:underline">
							Sign up here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;

