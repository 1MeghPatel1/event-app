import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import eventSchema from "../validationSchemas/createEventSchema";

interface CreateEventModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (formData: any) => Promise<void>;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
}) => {
	const [loading, setLoading] = useState(false);

	// Set up useForm with zod schema
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		resolver: zodResolver(eventSchema),
		defaultValues: {
			title: "",
			description: "",
			startDate: "",
			endDate: "",
			totalGuests: 0,
			images: [] as File[],
		},
	});

	// Handle file input manually
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []);
		setValue("images", files);
	};

	// Handle form submission
	const onFormSubmit = async (formData: any) => {
		setLoading(true);
		try {
			await onSubmit(formData);
			onClose();
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onClose}
			contentLabel="Create Event Modal"
		>
			<h2 className="text-2xl font-bold mb-4">Create Event</h2>
			<form onSubmit={handleSubmit(onFormSubmit)}>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Title</label>
					<input
						type="text"
						{...register("title")}
						className="w-full px-4 py-2 border rounded-lg"
						disabled={loading}
					/>
					{errors.title && (
						<p className="text-red-500 text-sm">{errors.title.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">
						Description
					</label>
					<textarea
						{...register("description")}
						className="w-full px-4 py-2 border rounded-lg"
						disabled={loading}
					/>
					{errors.description && (
						<p className="text-red-500 text-sm">{errors.description.message}</p>
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
						disabled={loading}
					/>
					{errors.startDate && (
						<p className="text-red-500 text-sm">{errors.startDate.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">End Date</label>
					<input
						type="date"
						{...register("endDate")}
						className="w-full px-4 py-2 border rounded-lg"
						disabled={loading}
					/>
					{errors.endDate && (
						<p className="text-red-500 text-sm">{errors.endDate.message}</p>
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
						disabled={loading}
					/>
					{errors.totalGuests && (
						<p className="text-red-500 text-sm">{errors.totalGuests.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label className="block text-gray-700 font-bold mb-2">Images</label>
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						className="w-full px-4 py-2 border rounded-lg"
						disabled={loading}
					/>
					{errors.images && (
						<p className="text-red-500 text-sm">{errors.images.message}</p>
					)}
				</div>
				<div className="flex justify-end space-x-4">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
						disabled={loading}
					>
						Cancel
					</button>
					<button
						type="submit"
						className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading}
					>
						{loading ? "Creating..." : "Create Event"}
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default CreateEventModal;

