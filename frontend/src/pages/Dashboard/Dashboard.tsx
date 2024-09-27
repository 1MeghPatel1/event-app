import React, { useEffect, useState } from "react";
import {
	getEventsByUserId,
	updateEvent,
	deleteEvent,
	createEvent,
} from "../../services/events.services";
import { Event } from "../../utils/types";
import EventTable from "../../components/EventTable";
import EventUpdateModal from "../../components/UpdateModal";
import CreateEventModal from "../../components/CreateModal";
import NavBar from "../../components/NavBar";

const Dashboard: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [createModalIsOpen, setCreateModalIsOpen] = useState(false); // State for CreateEventModal

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = await getEventsByUserId();
				setEvents(data);
			} catch (error) {
				console.error("Error fetching user events.");
			}
		};

		fetchEvents();
	}, []);

	const openModal = (event: Event) => {
		setSelectedEvent(event);
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
		setSelectedEvent(null);
	};

	const openCreateModal = () => {
		setCreateModalIsOpen(true); // Open CreateEventModal
	};

	const closeCreateModal = () => {
		setCreateModalIsOpen(false);
	};

	const handleUpdateSubmit = async (formState: any) => {
		if (!selectedEvent) return;

		try {
			await updateEvent(selectedEvent.id, formState);
			closeModal();
			const updatedEvents = await getEventsByUserId();
			setEvents(updatedEvents);
		} catch (error) {
			console.error("Error updating event.");
		}
	};

	const handleDelete = async (eventId: number) => {
		try {
			await deleteEvent(eventId);
			setEvents(events.filter((event) => event.id !== eventId));
		} catch (error) {
			console.error("Error deleting event.");
		}
	};

	const handleCreateSubmit = async (formState: any) => {
		try {
			await createEvent(formState);
			closeCreateModal();
			const updatedEvents = await getEventsByUserId();
			setEvents(updatedEvents);
		} catch (error) {
			console.error("Error creating event.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<NavBar />
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-4xl font-bold text-center mb-8">User Dashboard</h1>
				<div className="mb-4 text-center">
					<button
						onClick={openCreateModal}
						className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
					>
						Create New Event
					</button>
				</div>
				<EventTable
					events={events}
					onEdit={openModal}
					onDelete={handleDelete}
				/>
				<EventUpdateModal
					event={selectedEvent}
					isOpen={modalIsOpen}
					onClose={closeModal}
					onSubmit={handleUpdateSubmit}
				/>
				<CreateEventModal
					isOpen={createModalIsOpen}
					onClose={closeCreateModal}
					onSubmit={handleCreateSubmit}
				/>
			</div>
		</div>
	);
};

export default Dashboard;

