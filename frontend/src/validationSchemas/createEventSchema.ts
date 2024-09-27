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
	totalGuests: z
		.number()
		.min(1, "Total guests must be at least 1")
		.max(1000, "Guests count exceeds the limit"),
	images: z.array(z.any()).min(1, "At least one image is required").optional(),
});

export default eventSchema;

