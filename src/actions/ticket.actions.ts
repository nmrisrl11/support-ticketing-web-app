"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import { Priority } from "@/generated/prisma/enums";

import { getCurrentUser } from "@/lib/current-user";
import { logEvent } from "@/lib/sentry";

interface PrevState {
	success: boolean;
	message: string;
}

export async function createTicket(prevState: PrevState, formData: FormData): Promise<PrevState> {
	try {
		const user = await getCurrentUser();

		if (!user) {
			logEvent("Unauthorized ticket creation attempt", "ticket", {}, "warning");

			return { success: false, message: "You must be logged in to create a ticket." };
		}

		const subject = formData.get("subject") as string;
		const description = formData.get("description") as string;
		const priorityLevel = formData.get("priorityLevel") as Priority;

		if (!subject || !description || !priorityLevel) {
			logEvent(
				"Validation Error: Missing ticket fields",
				"ticket",
				{ subject, description, priority: priorityLevel },
				"warning",
			);

			return { success: false, message: "All fields are required." };
		}

		const ticket = await prisma.ticket.create({
			data: { subject, description, priority: priorityLevel, user: { connect: { id: user.id } } },
		});

		logEvent(
			`Ticket was created successfully: ${ticket.id}`,
			"ticket",
			{ ticketId: ticket.id },
			"info",
		);

		revalidatePath("/tickets");

		return { success: true, message: "Ticket created successfully." };
	} catch (error) {
		logEvent(
			"An error occured while creating new ticket.",
			"ticket",
			{ formData: Object.fromEntries(formData.entries()) },
			"error",
			error,
		);

		return { success: false, message: "An error occured while creating new ticket." };
	}
}

export async function getTickets() {
	try {
		const user = await getCurrentUser();

		if (!user) {
			logEvent("Unauthorized access to ticket list", "ticket", {}, "warning");

			return [];
		}

		const tickets = await prisma.ticket.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: "desc" },
		});

		// logEvent("Fetched ticket list", "ticket", { count: tickets.length }, "info");

		return tickets;
	} catch (error) {
		logEvent("Error fetching tickets", "ticket", {}, "error", error);

		return [];
	}
}

export async function getTicketById(id: string) {
	try {
		const ticket = await prisma.ticket.findUnique({
			where: { id: Number(id) },
		});

		if (!ticket) {
			logEvent("Ticket not found", "ticket", { ticketId: id }, "warning");
		}

		return ticket;
	} catch (error) {
		logEvent("Error fetching ticket details", "ticket", { ticketId: id }, "error", error);

		return null;
	}
}

export async function updateTicket(prevState: PrevState, formData: FormData): Promise<PrevState> {
	try {
		const ticketId = Number(formData.get("ticketId"));
		if (!ticketId) {
			logEvent("Missing ticket ID", "ticket", {}, "warning");
			return { success: false, message: "Ticket ID is required" };
		}

		const user = await getCurrentUser();
		if (!user) {
			logEvent("Unauthorized ticket update attempt", "ticket", {}, "warning");

			return { success: false, message: "You must be logged in to update a ticket." };
		}

		const subject = formData.get("subject") as string;
		const description = formData.get("description") as string;
		const priorityLevel = formData.get("priorityLevel") as Priority;

		if (!subject || !description || !priorityLevel) {
			logEvent(
				"Validation Error: Missing ticket fields",
				"ticket",
				{ subject, description, priority: priorityLevel },
				"warning",
			);

			return { success: false, message: "All fields are required." };
		}

		const existingTicket = await prisma.ticket.findFirst({
			where: {
				id: ticketId,
				userId: user.id,
			},
		});

		if (!existingTicket) {
			return {
				success: false,
				message: "Ticket not found.",
			};
		}

		const ticket = await prisma.ticket.update({
			where: {
				id: ticketId,
			},
			data: {
				subject,
				description,
				priority: priorityLevel,
			},
		});

		logEvent(
			`Ticket was updated successfully: ${ticket.id}`,
			"ticket",
			{ ticketId: ticket.id },
			"info",
		);

		revalidatePath("/tickets");

		return { success: true, message: "Ticket updated successfully." };
	} catch (error) {
		logEvent("An error occured while updating a ticket.", "ticket", {}, "error", error);

		return {
			success: false,
			message: "Something went wrong while updating a ticket. Please try again",
		};
	}
}
export async function deleteTicket(ticketId: number): Promise<PrevState> {
	try {
		if (!ticketId) {
			logEvent("Missing ticket ID", "ticket", {}, "warning");
			return { success: false, message: "Ticket ID is required" };
		}

		const user = await getCurrentUser();

		if (!user) {
			logEvent("Unauthorized ticket deletion attempt", "ticket", {}, "warning");
			return { success: false, message: "You must be logged in to delete a ticket." };
		}

		//! Verify ownership before deleting
		const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

		if (!ticket || ticket.userId !== user.id) {
			logEvent(
				"Unauthorized ticket deletion attempt",
				"ticket",
				{ ticketId, userId: user.id },
				"warning",
			);
			return { success: false, message: "You are not authorized to delete this ticket." };
		}

		await prisma.ticket.delete({ where: { id: ticketId } });

		logEvent(`Ticket was deleted successfully: ${ticketId}`, "ticket", { ticketId }, "info");

		revalidatePath("/tickets");

		return { success: true, message: "Ticket deleted successfully." };
	} catch (error) {
		logEvent("An error occurred while deleting a ticket.", "ticket", { ticketId }, "error", error);
		return {
			success: false,
			message: "Something went wrong while deleting a ticket. Please try again",
		};
	}
}

export async function closeTicket(prevState: PrevState, formData: FormData): Promise<PrevState> {
	try {
		const ticketId = Number(formData.get("ticketId"));

		if (!ticketId) {
			logEvent("Missing ticket ID", "ticket", {}, "warning");
			return { success: false, message: "Ticket ID is required" };
		}

		const user = await getCurrentUser();

		if (!user) {
			logEvent("Unauthorized closing ticket attempt", "ticket", {}, "warning");

			return { success: false, message: "You must be logged in to close a ticket." };
		}

		const ticket = await prisma.ticket.findUnique({ where: { id: ticketId } });

		if (!ticket || ticket.userId !== user.id) {
			logEvent(
				"Unauthorized closing ticket attempt",
				"ticket",
				{ ticketId, userId: user.id },
				"warning",
			);

			return { success: false, message: "You are not authorized to close this ticket." };
		}

		await prisma.ticket.update({ where: { id: ticketId }, data: { status: "Closed" } });

		logEvent(`Ticket was closed successfully: ${ticketId}`, "ticket", { ticketId }, "info");

		revalidatePath("/tickets");

		return { success: true, message: "Ticket closed successfully." };
	} catch (error) {
		logEvent("An error occured while closing a ticket.", "ticket", {}, "error", error);

		return { success: false, message: "An error occured while closing a ticket." };
	}
}
