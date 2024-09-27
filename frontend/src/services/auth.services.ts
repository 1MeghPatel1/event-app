import { axiosInstance } from "../config/axiosInstance";

// Interfaces for Login and SignUp DTOs
export interface LoginDto {
	email: string;
	password: string;
}

export interface SignUpDto {
	name: string;
	email: string;
	password: string;
}

// SignUp Service
export const signUp = async (signUpDto: SignUpDto): Promise<any> => {
	try {
		const response = await axiosInstance.post("/auth/signup", signUpDto);
		return response.data.data.accessToken;
	} catch (error) {
		console.error("Error signing up", error);
		throw error;
	}
};

// Login Service
export const login = async (loginDto: LoginDto): Promise<any> => {
	try {
		const response = await axiosInstance.post("/auth/login", loginDto);
		return response.data.data;
	} catch (error) {
		console.error("Error logging in", error);
		throw error;
	}
};

