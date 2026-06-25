import NewTicketForm from "./ticket-form";

function NewTicketPage() {
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

				<NewTicketForm />
			</section>
		</main>
	);
}

export default NewTicketPage;
