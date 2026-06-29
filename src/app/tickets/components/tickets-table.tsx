"use client";

import { useState } from "react";
import Link from "next/link";
import { Ticket } from "@/generated/prisma/client";
import { HashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ActionType } from "../types/ticket.types";
import EditTicketDialog from "./edit-ticket-dialog";
import TicketRow from "./ticket-row";
import ViewTicketDialog from "./view-ticket-dialog";

function TicketsTable({ tickets }: { tickets: Ticket[] }) {
	const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
	const [actionType, setActionType] = useState<ActionType | null>(null);

	return tickets.length > 0 ? (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-primary hidden font-bold md:table-cell">Subject</TableHead>

						<TableHead>
							<span className="text-primary hidden font-bold md:block">Description</span>
							<span className="text-primary block font-bold md:hidden">Tickets</span>
						</TableHead>

						<TableHead className="text-primary hidden font-bold md:table-cell">Priority</TableHead>

						<TableHead className="text-primary hidden font-bold md:table-cell">Status</TableHead>

						<TableHead />
					</TableRow>
				</TableHeader>

				<TableBody>
					{tickets.map((ticket) => (
						<TicketRow
							key={ticket.id}
							ticket={ticket}
							setSelectedTicketId={setSelectedTicketId}
							setActionType={setActionType}
						/>
					))}
				</TableBody>
			</Table>

			<ViewTicketDialog
				key={`View-#${selectedTicketId}`}
				ticketId={selectedTicketId}
				isViewTicketModalOpen={actionType === "VIEW"}
				onClose={() => {
					setSelectedTicketId(null);
					setActionType(null);
				}}
			/>

			<EditTicketDialog
				key={`Edit-#${selectedTicketId}`}
				ticketId={selectedTicketId}
				isEditTicketModalOpen={actionType === "EDIT"}
				onClose={() => {
					setSelectedTicketId(null);
					setActionType(null);
				}}
			/>
		</>
	) : (
		<Empty className="bg-secondary border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon" className="bg-background/50">
					<HashIcon />
				</EmptyMedia>

				<EmptyTitle>No Tickets Found</EmptyTitle>
				<EmptyDescription>
					Create a ticket to start tracking issues, requests, or tasks.
				</EmptyDescription>
			</EmptyHeader>

			<EmptyContent>
				<Button size="lg" variant="default" asChild>
					<Link href="tickets/new">Create Ticket</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
}

export default TicketsTable;
