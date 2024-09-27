import { z } from "zod";

// Define zod schema for validation
const loginSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default loginSchema;
