// utils/types.ts
export interface Event {
	id: number;
	title: string;
	description: string;
	startDate: Date; // This should be a Date object
	endDate: Date; // This should be a Date object
	totalGuests: number;
	images: File[]; // For multiple file uploads
}

