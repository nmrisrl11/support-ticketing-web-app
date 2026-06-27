"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";

import { getCurrentUser } from "@/lib/current-user";
import { logEvent } from "@/lib/sentry";

export async function createTicket(
	prevState: { success: boolean; message: string },
	formData: FormData,
): Promise<{ success: boolean; message: string }> {
	try {
		const user = await getCurrentUser();

		if (!user) {
			logEvent("Unauthorized ticket creation attempt", "ticket", {}, "warning");

			return { success: false, message: "You must be logged in to create a ticket." };
		}

		const subject = formData.get("subject") as string;
		const description = formData.get("description") as string;
		const priorityLevel = formData.get("priorityLevel") as string;

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
