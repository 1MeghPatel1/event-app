// AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { setAuthToken } from "../utils/set-token-header";

interface AuthContextProps {
	isAuthenticated: boolean;
	loading: boolean; // Add loading state
	user: string | null;
	login: (token: string, user: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
	undefined
);

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const [user, setUser] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true); // Set initial loading to true

	useEffect(() => {
		const token = localStorage.getItem(TOKEN_KEY);
		const storedUser = localStorage.getItem(USER_KEY);
		if (token && storedUser) {
			setAuthToken(token);
			setIsAuthenticated(true);
			setUser(storedUser);
		}
		setLoading(false); // Stop loading once check is complete
	}, []);

	const login = (token: string, user: string) => {
		localStorage.setItem(TOKEN_KEY, token);
		localStorage.setItem(USER_KEY, user);
		setAuthToken(token);
		setIsAuthenticated(true);
		setUser(user);
	};

	const logout = () => {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem(USER_KEY);
		setAuthToken("");
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, loading, user, login, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

