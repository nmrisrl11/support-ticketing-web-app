"use client";

import { useActionState, useEffect, useState } from "react";
import { getTicketById, updateTicket } from "@/actions/ticket.actions";
import { Ticket } from "@/generated/prisma/client";
import { Priority } from "@/generated/prisma/enums";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface EditTicketDialogProps {
	ticketId: string | null;
	isEditTicketModalOpen: boolean;
	onClose: () => void;
}

const initialState = {
	success: false,
	message: "",
};

function EditTicketDialog({ ticketId, isEditTicketModalOpen, onClose }: EditTicketDialogProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [ticketData, setTicketData] = useState<Ticket | null>(null);
	const [state, formAction] = useActionState(updateTicket, initialState);
	const isOpen = ticketId !== null && isEditTicketModalOpen;

	useEffect(() => {
		if (state.success) {
			toast.success(state.message);
			onClose();
		}
	}, [state, onClose]);

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
							<DialogTitle className="text-left">Edit Ticket #{ticketData.id}</DialogTitle>
						</DialogHeader>

						<form action={formAction} className="flex flex-col gap-6">
							<input type="hidden" name="ticketId" value={ticketData.id} />

							<div className="space-y-3">
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									name="subject"
									placeholder="Enter subject"
									type="text"
									className="py-6"
									autoComplete="off"
									value={ticketData.subject || ""}
									onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
									autoFocus
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="description">Description</Label>

								<Textarea
									id="description"
									name="description"
									placeholder="Enter the description"
									className="field-sizing-content max-h-20 min-h-20 resize-none"
									value={ticketData.description || ""}
									onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="priorityLevel">Priority Level</Label>

								<Select
									value={ticketData.priority || Priority.Low}
									onValueChange={(value: Priority) =>
										setTicketData({ ...ticketData, priority: value })
									}
									name="priorityLevel"
								>
									<SelectTrigger id="priorityLevel" className="w-full py-6">
										<SelectValue placeholder="Select priority level" />
									</SelectTrigger>

									<SelectContent className="w-full p-3" position="popper">
										{Object.values(Priority).map((priority) => (
											<SelectItem key={priority} value={priority}>
												{priority}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{state.message && !state.success && (
								<Alert className="border-destructive/80 bg-destructive/5 text-destructive w-full">
									<AlertTitle>Error</AlertTitle>

									<AlertDescription className="text-destructive/80">
										<span className="first-letter:uppercase">{state.message}</span>
									</AlertDescription>
								</Alert>
							)}

							<div className="flex flex-col gap-1.5">
								<Button size="lg" type="submit">
									Save Changes
								</Button>
							</div>
						</form>
					</div>
				) : null}
			</DialogContent>
		</Dialog>
	);
}

export default EditTicketDialog;
