import { z } from "zod";

// Define the zod schema for form validation
const eventSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid start date",
	}),
	endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
		message: "Invalid end date",
	}),
	totalGuests: z.number().min(1, "At least 1 guest is required"),
	images: z.array(z.instanceof(File)).optional(),
});

export default eventSchema;

