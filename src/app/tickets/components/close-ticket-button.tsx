import { useActionState, useEffect } from "react";
import { closeTicket } from "@/actions/ticket.actions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

interface CloseTicketButton {
	ticketId: number;
	isClosed: boolean;
	handleOpenChange: (val: boolean) => void;
}

const initialState = {
	success: false,
	message: "",
};

function CloseTicketButton({ ticketId, isClosed, handleOpenChange }: CloseTicketButton) {
	const [state, formAction] = useActionState(closeTicket, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success(state.message);
			handleOpenChange(false);
		} else if (state.message && !state.success) {
			toast.error(state.message);
		}
	}, [state, handleOpenChange]);

	if (isClosed) return null;

	return (
		<form action={formAction}>
			<input type="hidden" name="ticketId" value={ticketId} />

			<Button className="w-full" type="submit" variant="destructive">
				Close Ticket
			</Button>
		</form>
	);
}

export default CloseTicketButton;
