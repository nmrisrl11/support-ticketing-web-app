"use server";

import { prisma } from "@/db/prisma";
import { logEvent } from "@/lib/sentry";
import { revalidatePath } from "next/cache";

export async function createTicket(
	prevState: { success: boolean; message: string },
	formData: FormData,
): Promise<{ success: boolean; message: string }> {
	try {
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
			data: { subject, description, priority: priorityLevel },
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
