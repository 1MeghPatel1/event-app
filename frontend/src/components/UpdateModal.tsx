import React, { useEffect } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import eventSchema from "../validationSchemas/updateEventSchema";

interface Event {
	id: number;
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
	totalGuests: number;
	images: File[];
}

interface EventUpdateModalProps {
	event: Event | null;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (formData: any) => void;
}

type EventFormInputs = z.infer<typeof eventSchema>;

const EventUpdateModal: React.FC<EventUpdateModalProps> = ({
	event,
	isOpen,
	onClose,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<EventFormInputs>({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			description: "",
			startDate: "",
			endDate: "",
			totalGuests: 1,
			images: [],
		},
	});

	// Update form values when `event` prop changes
	useEffect(() => {
		if (event) {
			reset({
				title: event.title,
				description: event.description,
				startDate: new Date(event.startDate).toISOString().split("T")[0],
				endDate: new Date(event.endDate).toISOString().split("T")[0],
				totalGuests: event.totalGuests,
				images: [],
			});
		}
	}, [event, reset]);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setValue("images", files);
	};

	const onSubmitForm = (data: EventFormInputs) => {
		onSubmit(data);
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Update Event Modal"
		>
			<h2 className="text-2xl font-bold mb-4">Update Event</h2>
			<form onSubmit={handleSubmit(onSubmitForm)}>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Title</label>
					<input
						type="text"
						{...register("title")}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.title && (
						<p className="text-red-500">{errors.title.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Description
					</label>
					<textarea
						{...register("description")}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.description && (
						<p className="text-red-500">{errors.description.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Start Date
					</label>
					<input
						type="date"
						{...register("startDate")}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.startDate && (
						<p className="text-red-500">{errors.startDate.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">End Date</label>
					<input
						type="date"
						{...register("endDate")}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.endDate && (
						<p className="text-red-500">{errors.endDate.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Total Guests
					</label>
					<input
						type="number"
						{...register("totalGuests", { valueAsNumber: true })}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.totalGuests && (
						<p className="text-red-500">{errors.totalGuests.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Upload Images
					</label>
					<input
						type="file"
						multiple
						onChange={onFileChange}
						className="w-full px-4 py-2 border rounded-lg"
					/>
					{errors.images && (
						<p className="text-red-500">{errors.images.message}</p>
					)}
				</div>
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
					>
						Update
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default EventUpdateModal;

