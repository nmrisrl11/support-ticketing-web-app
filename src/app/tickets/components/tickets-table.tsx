"use client";

import { useState } from "react";
import Link from "next/link";
import { Priority, PRIORITY_COLORS } from "@/constants/priority";
import { CircleCheckBigIcon, CircleDashedIcon, HashIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import ViewTicketDialog from "./view-ticket-dialog";

interface TicketsTableProps {
	id: number;
	subject: string;
	description: string;
	priority: string;
	status: string;
}

function TicketsTable({ tickets }: { tickets: TicketsTableProps[] }) {
	const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

	return tickets.length > 0 ? (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="text-primary hidden font-bold md:table-cell">Subject</TableHead>

						<TableHead>
							<span className="text-primary hidden font-bold md:block">Description</span>
							<span className="text-primary block font-bold md:hidden">Project</span>
						</TableHead>

						<TableHead className="text-primary hidden font-bold md:table-cell">Priority</TableHead>

						<TableHead className="text-primary hidden font-bold md:table-cell">Status</TableHead>

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
								<Button size="xs" onClick={() => setSelectedTicketId(ticket.id.toString())}>
									View Ticket
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<ViewTicketDialog ticketId={selectedTicketId} onClose={() => setSelectedTicketId(null)} />
		</>
	) : (
		<Empty className="bg-secondary border border-dashed">
			<EmptyHeader>
				<EmptyMedia variant="icon" className="bg-background/50">
					<HashIcon />
				</EmptyMedia>

				<EmptyTitle>No Tickets Found</EmptyTitle>
				<EmptyDescription>
					Create a ticket to start tracking issues, requests, or tasks.
				</EmptyDescription>
			</EmptyHeader>

			<EmptyContent>
				<Button size="lg" variant="default" asChild>
					<Link href="tickets/new">Create Ticket</Link>
				</Button>
			</EmptyContent>
		</Empty>
	);
}

export default TicketsTable;
