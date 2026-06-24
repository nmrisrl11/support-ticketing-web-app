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
						<CardContent className="flex flex-col gap-6">
							<div className="space-y-3">
								<Label htmlFor="subject">Subject</Label>
								<Input id="subject" placeholder="Enter subject" type="text" className="py-6" />
							</div>

							<div className="space-y-3">
								<Label htmlFor="description">Description</Label>

								<Textarea
									id="description"
									placeholder="Enter the description"
									className="field-sizing-content max-h-20 min-h-20 resize-none"
								/>
							</div>

							<div className="space-y-3">
								<Label htmlFor="priorityLevel">Priority Level</Label>

								<Select defaultValue="Low">
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

							<div className="flex justify-end gap-1.5">
								<Button size="lg" variant="ghost">
									Clear
								</Button>

								<Button size="lg">Submit Ticket</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}

export default NewTicketPage;
