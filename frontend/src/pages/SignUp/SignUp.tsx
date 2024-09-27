import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp, SignUpDto } from "../../services/auth.services";
import { setAuthToken } from "../../utils/set-token-header";
import signUpSchema from "../../validationSchemas/signUpSchema";

const SignUp: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	// Set up useForm with zod validation
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpDto>({
		resolver: zodResolver(signUpSchema),
	});

	// Handle form submission
	const onSubmit = async (formData: SignUpDto) => {
		setLoading(true);
		setError(null);

		try {
			const token = await signUp(formData);
			localStorage.setItem("token", token);
			setAuthToken(token);
			navigate("/dashboard");
		} catch (err) {
			setError("Failed to sign up. Please try again.");
		} finally {
			setLoading(false);
		}
	};

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

				<h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>

				{/* Error Message */}
				{error && <p className="text-red-500 text-center mb-4">{error}</p>}

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<label
							htmlFor="name"
							className="block text-gray-700 font-bold mb-2"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							{...register("name")}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							placeholder="Enter your name"
							disabled={loading}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name.message}</p>
						)}
					</div>

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
							disabled={loading}
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
							disabled={loading}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password.message}</p>
						)}
					</div>

					<button
						type="submit"
						className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}
					>
						{loading ? "Signing Up..." : "Sign Up"}
					</button>

					<p className="mt-4 text-center">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-500 hover:underline">
							Login here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default SignUp;

