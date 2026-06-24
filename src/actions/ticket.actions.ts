"use server";

import * as Sentry from "@sentry/nextjs";

export async function createTicket(
	prevState: { success: boolean; message: string },
	formData: FormData,
): Promise<{ success: boolean; message: string }> {
	try {
		const subject = formData.get("subject");
		const description = formData.get("description");
		const priorityLevel = formData.get("priorityLevel");

		if (!subject || !description || !priorityLevel) {
			Sentry.captureMessage("Validation Error: Missing ticket fields", "warning");
			return { success: false, message: "All fields are required." };
		}

		return { success: true, message: "Ticket created successfully." };
	} catch (error) {
		Sentry.captureException(error as Error, {
			extra: { formData: Object.fromEntries(formData.entries()) },
		});
		return { success: false, message: "An error occured while creating new ticket." };
	}
}
