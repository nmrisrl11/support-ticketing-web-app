"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { deleteTicket } from "@/actions/ticket.actions";
import { Ticket } from "@/generated/prisma/client";
import { HashIcon } from "lucide-react";
import { toast } from "sonner";

import ConfirmationDialog from "@/components/confirmation-dialog";
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
	const [isPending, startTransition] = useTransition();

	const handleCloseAction = () => {
		setSelectedTicketId(null);
		setActionType(null);
	};

	const handleDelete = () => {
		if (!selectedTicketId) return;

		startTransition(async () => {
			const res = await deleteTicket(Number(selectedTicketId));

			if (res.success) {
				toast.success(res.message);
				handleCloseAction();
			} else {
				toast.error(res.message);
			}
		});
	};

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

			{actionType === "VIEW" && (
				<ViewTicketDialog
					ticketId={selectedTicketId}
					isViewTicketModalOpen
					onClose={() => {
						setSelectedTicketId(null);
						setActionType(null);
					}}
				/>
			)}

			{actionType === "EDIT" && (
				<EditTicketDialog
					key={`Edit-#${selectedTicketId}`}
					ticketId={selectedTicketId}
					isEditTicketModalOpen
					onClose={() => {
						setSelectedTicketId(null);
						setActionType(null);
					}}
				/>
			)}

			{actionType === "DELETE" && (
				<ConfirmationDialog
					isOpen={true}
					onClose={handleCloseAction}
					onConfirm={handleDelete}
					title="Delete Ticket"
					description={`Are you sure you want to delete Ticket #${selectedTicketId}? This action cannot be undone.`}
					confirmText="Delete"
					isLoading={isPending}
				/>
			)}
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
