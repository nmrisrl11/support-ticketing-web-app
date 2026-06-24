"use client";

import { useActionState } from "react";
import { createTicket } from "@/actions/ticket.actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

function NewTicketPage() {
	const [state, formAction] = useActionState(createTicket, {
		success: false,
		message: "",
	});

	return (
		<main className="mx-auto flex h-dvh w-full max-w-5xl flex-col justify-center gap-3">
			<section className="px-6 py-12">
				<div className="flex flex-col justify-center gap-3">
					<h1 className="text-4xl font-extrabold sm:text-7xl">
						Create new <span className="gradient-text">Ticket</span>
					</h1>
					<div className="w-full max-w-3xl tracking-wide sm:text-lg">
						Create a new ticket by adding a subject, description, and priority level so you can keep
						track of what needs to be done.
					</div>
				</div>

				<div className="mt-12 min-w-xs md:min-w-2xl">
					<Card>
						<CardContent>
							<form action={formAction} className="flex flex-col gap-6">
								<div className="space-y-3">
									<Label htmlFor="subject">Subject</Label>
									<Input
										id="subject"
										name="subject"
										placeholder="Enter subject"
										type="text"
										className="py-6"
										autoComplete="off"
									/>
								</div>

								<div className="space-y-3">
									<Label htmlFor="description">Description</Label>

									<Textarea
										id="description"
										name="description"
										placeholder="Enter the description"
										className="field-sizing-content max-h-20 min-h-20 resize-none"
									/>
								</div>

								<div className="space-y-3">
									<Label htmlFor="priorityLevel">Priority Level</Label>

									<Select
										defaultValue="Low"
										onValueChange={(val) => console.log(val)}
										name="priorityLevel"
									>
										<SelectTrigger id="priorityLevel" className="w-full py-6">
											<SelectValue placeholder="Select framework" />
										</SelectTrigger>

										<SelectContent className="w-full p-3" position="popper">
											<SelectItem value="Low">Low</SelectItem>
											<SelectItem value="Medium">Medium</SelectItem>
											<SelectItem value="High">High</SelectItem>
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

								<div className="flex justify-end gap-1.5">
									<Button size="lg" variant="ghost" type="reset">
										Clear
									</Button>

									<Button size="lg" type="submit">
										Submit Ticket
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}

export default NewTicketPage;
