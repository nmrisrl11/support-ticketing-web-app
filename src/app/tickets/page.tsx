import { getTickets } from "@/actions/ticket.actions";
import { logEvent } from "@/lib/sentry";
import Link from "next/link";
import { CircleCheckBigIcon, CircleDashedIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Priority, PRIORITY_COLORS } from "@/constants/priority";
import { Button } from "@/components/ui/button";

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
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead className="text-primary hidden font-bold md:table-cell">
												Subject
											</TableHead>

											<TableHead>
												<span className="text-primary hidden font-bold md:block">Description</span>
												<span className="text-primary block font-bold md:hidden">Project</span>
											</TableHead>

											<TableHead className="text-primary hidden font-bold md:table-cell">
												Priority
											</TableHead>

											<TableHead className="text-primary hidden font-bold md:table-cell">
												Status
											</TableHead>

											<TableHead />
										</TableRow>
									</TableHeader>
									<TableBody>
										{tickets.map((ticket) => (
											<TableRow key={ticket.subject}>
												<TableCell className="hidden md:table-cell">{ticket.subject}</TableCell>

												<TableCell className="pl-0 align-top md:pl-4">
													<div className="flex flex-col gap-2">
														<div className="flex items-baseline justify-between gap-1 md:hidden">
															<div className="flex items-center gap-1">
																<span className="text-sm font-medium">{ticket.subject}</span>

																{ticket.status === "Done" ? (
																	<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
																		<CircleCheckBigIcon data-icon="inline-start" />
																		{ticket.status}
																	</Badge>
																) : (
																	<Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
																		<CircleDashedIcon data-icon="inline-start" />
																		{ticket.status}
																	</Badge>
																)}

																<span
																	className={cn(
																		"ml-1 block h-1.5 w-4 rounded-full md:hidden",
																		PRIORITY_COLORS[ticket.priority as Priority],
																	)}
																/>
															</div>
														</div>

														<p className="text-muted-foreground md:text-primary text-sm">
															{ticket.description}
														</p>
													</div>
												</TableCell>

												<TableCell className="hidden md:table-cell">
													<div className="flex items-center gap-2">
														<span
															className={cn(
																"block h-6 w-1.5 rounded-full",
																PRIORITY_COLORS[ticket.priority as Priority],
															)}
														/>
														{ticket.priority}
													</div>
												</TableCell>

												<TableCell className="hidden md:table-cell">
													{ticket.status === "Done" ? (
														<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
															<CircleCheckBigIcon data-icon="inline-start" />
															{ticket.status}
														</Badge>
													) : (
														<Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
															<CircleDashedIcon data-icon="inline-start" />
															{ticket.status}
														</Badge>
													)}
												</TableCell>

												<TableCell>
													<Button size="xs">View Ticket</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	);
}

export default TicketsPage;
