import { axiosInstance } from "../config/axiosInstance";

// Interfaces for Event DTOs
export interface CreateEventDto {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	totalGuests: number;
	images?: File[]; // Multiple files for images
}

export interface UpdateEventDto {
	title?: string;
	description?: string;
	startDate?: Date;
	endDate?: Date;
	totalGuests?: number;
	images?: File[];
}

// Helper function to create FormData for image upload
const createFormData = (dto: CreateEventDto | UpdateEventDto): FormData => {
	const formData = new FormData();

	// Append non-file fields
	Object.keys(dto).forEach((key) => {
		if (key !== "images" && dto[key as keyof typeof dto] !== undefined) {
			formData.append(key, dto[key as keyof typeof dto] as any);
		}
	});

	// Append image files
	if (dto.images && dto.images.length > 0) {
		dto.images.forEach((file, index) => {
			formData.append("images", file); // 'images' matches the backend input field name
		});
	}

	return formData;
};

// Create a new event with image upload
export const createEvent = async (
	createEventDto: CreateEventDto
): Promise<any> => {
	const formData = createFormData(createEventDto);

	try {
		const response = await axiosInstance.post("/events", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error creating event", error);
		throw error;
	}
};

// Get all events
export const getAllEvents = async (): Promise<any> => {
	try {
		const response = await axiosInstance.get("/events");
		return response.data.data;
	} catch (error) {
		console.error("Error fetching events", error);
		throw error;
	}
};

// Get event by ID
export const getEventById = async (id: number): Promise<any> => {
	try {
		const response = await axiosInstance.get(`/events/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching event with ID ${id}`, error);
		throw error;
	}
};

export const getEventsByUserId = async (): Promise<any> => {
	try {
		const response = await axiosInstance.get("/events/eventsByUser");
		return response.data.data;
	} catch (error) {
		console.error(`Error fetching events for user with ID`, error);
		throw error;
	}
};

// Update an event with image upload
export const updateEvent = async (
	id: number,
	updateEventDto: UpdateEventDto
): Promise<any> => {
	const formData = createFormData(updateEventDto);

	try {
		const response = await axiosInstance.put(`/events/${id}`, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	} catch (error) {
		console.error(`Error updating event with ID ${id}`, error);
		throw error;
	}
};

// Delete an event by ID
export const deleteEvent = async (id: number): Promise<any> => {
	try {
		const response = await axiosInstance.delete(`/events/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting event with ID ${id}`, error);
		throw error;
	}
};

