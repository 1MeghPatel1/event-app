import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination as SwiperPagination, Navigation } from "swiper/modules";
import { getAllEvents } from "../services/events.services";

const formatDate = (date: Date) => {
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
};

interface Event {
	id: number;
	title: string;
	description: string;
	images: string[];
	startDate: Date;
	endDate: Date;
	totalGuests: number;
	user: {
		name: string;
	};
}

const EventsContainer: React.FC = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [eventsPerPage] = useState(6); // Customize the number of events per page

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const data = await getAllEvents(); // Fetch events from backend
				setEvents(data);
			} catch (error) {
				setError("Error fetching events. Please try again later.");
			}
		};

		fetchEvents();
	}, []);

	// Pagination logic
	const indexOfLastEvent = currentPage * eventsPerPage;
	const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
	const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (error) {
		return <div className="text-red-500 text-center">{error}</div>;
	}

	if (events.length === 0) {
		return <div className="text-center text-gray-600">No events found.</div>;
	}

	return (
		<div>
			{/* Event Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{currentEvents.map((event) => (
					<div
						key={event.id}
						className="bg-white shadow-md rounded-lg overflow-hidden"
					>
						{/* Event Image Carousel */}
						{event.images.length > 0 && (
							<Swiper
								modules={[SwiperPagination, Navigation]}
								pagination={{ clickable: true }}
								navigation
								className="w-full h-48"
							>
								{event.images.map((image, index) => (
									<SwiperSlide key={index}>
										<img
											src={image}
											alt={`Event ${event.title} - Image ${index + 1}`}
											className="w-full h-48 object-cover"
										/>
									</SwiperSlide>
								))}
							</Swiper>
						)}

						{/* Event Details */}
						<div className="p-6">
							<h2 className="text-2xl font-bold mb-2">{event.title}</h2>
							<p className="text-gray-700 mb-4">{event.description}</p>
							<p className="text-gray-500 mb-2">
								<strong>Start:</strong> {formatDate(event.startDate)}
							</p>
							<p className="text-gray-500 mb-4">
								<strong>End:</strong> {formatDate(event.endDate)}
							</p>
							<p className="text-gray-800 font-semibold">
								Total Guests: {event.totalGuests}
							</p>
							<p className="text-gray-800">By {event.user.name}</p>
						</div>
					</div>
				))}
			</div>

			{/* Pagination Controls */}
			<div className="flex justify-center mt-6">
				{[...Array(Math.ceil(events.length / eventsPerPage))].map(
					(_, index) => (
						<button
							key={index}
							onClick={() => paginate(index + 1)}
							className={`px-4 py-2 mx-1 rounded ${
								currentPage === index + 1
									? "bg-blue-500 text-white"
									: "bg-gray-200"
							}`}
						>
							{index + 1}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default EventsContainer;

