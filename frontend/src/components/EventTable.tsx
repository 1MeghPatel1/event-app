import React from "react";
import DataTable from "react-data-table-component";
import { Event } from "../utils/types";

interface EventTableProps {
	events: Event[];
	onEdit: (event: Event) => void;
	onDelete: (eventId: number) => void;
}

const EventTable: React.FC<EventTableProps> = ({
	events,
	onEdit,
	onDelete,
}) => {
	const columns = [
		{ name: "Title", selector: (row: Event) => row.title, sortable: true },
		{
			name: "Description",
			selector: (row: Event) => row.description,
			sortable: true,
		},
		{
			name: "Start Date",
			selector: (row: Event) => new Date(row.startDate).toLocaleDateString(),
		},
		{
			name: "End Date",
			selector: (row: Event) => new Date(row.endDate).toLocaleDateString(),
		},
		{
			name: "Guests",
			selector: (row: Event) => row.totalGuests,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row: Event) => (
				<div className="flex space-x-2">
					<button
						onClick={() => onEdit(row)}
						className="bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600"
					>
						Update
					</button>
					<button
						onClick={() => onDelete(row.id)}
						className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600"
					>
						Delete
					</button>
				</div>
			),
		},
	];

	return <DataTable columns={columns} data={events} pagination />;
};

export default EventTable;

