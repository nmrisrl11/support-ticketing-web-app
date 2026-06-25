import * as Sentry from "@sentry/nextjs";
import type { SeverityLevel } from "@sentry/core";

export function logEvent<TData extends Record<string, unknown>>(
	message: string,
	category: string = "general",
	data?: TData,
	level: SeverityLevel = "info",
	error?: unknown,
) {
	Sentry.addBreadcrumb({
		category,
		message,
		data,
		level,
	});

	if (error) {
		Sentry.captureException(error, { extra: data });
	} else {
		Sentry.captureMessage(message, level);
	}
}
