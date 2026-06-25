import { getTickets } from "@/actions/ticket.actions";

import { Card, CardContent } from "@/components/ui/card";

import TicketsTable from "./components/tickets-table";

async function TicketsPage() {
	const tickets = await getTickets();

	return (
		<main className="mx-auto flex h-dvh w-full max-w-5xl flex-col justify-center gap-3">
			<section className="px-6 py-12">
				<div className="flex flex-col justify-center gap-3">
					<h1 className="text-4xl font-extrabold sm:text-7xl">
						Manage <span className="gradient-text">Tickets</span>
					</h1>
					<div className="w-full max-w-3xl tracking-wide sm:text-lg">
						Create a new ticket by adding a subject, description, and priority level so you can keep
						track of what needs to be done.
					</div>
				</div>

				<div className="mt-12">
					<Card className="relative ring-0">
						<CardContent>
							<div className="container px-0">
								<TicketsTable tickets={tickets} />
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}

export default TicketsPage;
