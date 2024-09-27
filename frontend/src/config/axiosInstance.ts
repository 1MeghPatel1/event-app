import axios from "axios";
import { env } from "./env";

const API_URL = env.API_URL;

export const axiosInstance = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

