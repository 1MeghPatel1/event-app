import React from "react";
import EventsContainer from "../../components/EventsContainer";
import NavBar from "../../components/NavBar";

const Home: React.FC = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			{/* Navbar */}
			<NavBar />
			{/* EventsContainer */}
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-4xl font-bold text-center mb-8">Upcoming Events</h1>
				<EventsContainer />
			</div>
		</div>
	);
};

export default Home;

