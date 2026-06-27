"use client";

import { useEffect, useState } from "react";
import { getTicketById } from "@/actions/ticket.actions";
import { Priority, PRIORITY_COLORS } from "@/constants/priority";
import { Ticket } from "@/generated/prisma/client";
import { CircleCheckBigIcon, CircleDashedIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

import CloseTicketButton from "./close-ticket-button";

interface ViewTicketDialogProps {
	ticketId: string | null;
	onClose: () => void;
}

function ViewTicketDialog({ ticketId, onClose }: ViewTicketDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [ticketData, setTicketData] = useState<Ticket | null>(null);

	useEffect(() => {
		if (!ticketId) return;

		const fetchTicket = async () => {
			setIsLoading(true);

			const data = await getTicketById(ticketId);

			if (data) {
				setTicketData(data);
			}

			setIsLoading(false);
		};

		fetchTicket();
	}, [ticketId]);

	const isOpen = ticketId !== null;

	const handleOpenChange = (open: boolean) => {
		if (!open) {
			setTicketData(null);
			onClose();
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogContent>
				{isLoading ? (
					<div className="p-4 text-center">Loading ticket details...</div>
				) : ticketData ? (
					<div className="flex flex-col gap-4">
						<DialogHeader>
							<DialogTitle className="text-left">Ticket #{ticketData.id}</DialogTitle>
							<DialogDescription className="text-left">Reviewing details</DialogDescription>

							<h3 className="font-semibold">
								Date Created:
								<span className="text-muted-foreground ml-1 font-mono font-normal">
									{new Date(ticketData.createdAt).toLocaleString()}
								</span>
							</h3>
						</DialogHeader>

						<div className="flex flex-col gap-3">
							<div className="space-y-1.5 rounded-xl border p-3">
								<h3 className="font-semibold">Subject</h3>
								<p className="text-muted-foreground">{ticketData.subject}</p>
							</div>

							<div className="space-y-1.5 rounded-xl border p-3">
								<h3 className="font-semibold">Description</h3>
								<p className="text-muted-foreground">{ticketData.description}</p>
							</div>

							<div className="flex gap-3">
								<div className="w-full space-y-1.5 rounded-xl border p-3">
									<h3 className="font-semibold">Priority</h3>

									<div className="flex items-center gap-2">
										<span
											className={cn(
												"block h-6 w-1.5 rounded-full",
												PRIORITY_COLORS[ticketData.priority as Priority],
											)}
										/>

										<p className="text-muted-foreground">{ticketData.priority}</p>
									</div>
								</div>

								<div className="w-full space-y-1.5 rounded-xl border p-3">
									<h3 className="font-semibold">Status</h3>

									{ticketData.status === "Closed" ? (
										<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
											<CircleCheckBigIcon data-icon="inline-start" />
											{ticketData.status}
										</Badge>
									) : (
										<Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
											<CircleDashedIcon data-icon="inline-start" />
											{ticketData.status}
										</Badge>
									)}
								</div>
							</div>
						</div>

						{ticketData.status !== "Closed" && (
							<CloseTicketButton
								ticketId={ticketData.id}
								isClosed={ticketData.status === "Closed"}
								handleOpenChange={handleOpenChange}
							/>
						)}
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
}

export default ViewTicketDialog;
