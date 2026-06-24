"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/db/prisma";
import * as Sentry from "@sentry/nextjs";

export async function createTicket(
	prevState: { success: boolean; message: string },
	formData: FormData,
): Promise<{ success: boolean; message: string }> {
	try {
		const subject = formData.get("subject") as string;
		const description = formData.get("description") as string;
		const priorityLevel = formData.get("priorityLevel") as string;

		if (!subject || !description || !priorityLevel) {
			Sentry.captureMessage("Validation Error: Missing ticket fields", "warning");
			return { success: false, message: "All fields are required." };
		}

		const ticket = await prisma.ticket.create({
			data: { subject, description, priority: priorityLevel },
		});

		Sentry.addBreadcrumb({
			category: "ticket",
			message: `Ticket created: ${ticket.id}`,
			level: "info",
		});

		Sentry.captureMessage(`Ticket was created successfully: ${ticket.id}`);

		revalidatePath("/tickets");

		return { success: true, message: "Ticket created successfully." };
	} catch (error) {
		Sentry.captureException(error as Error, {
			extra: { formData: Object.fromEntries(formData.entries()) },
		});
		return { success: false, message: "An error occured while creating new ticket." };
	}
}
