"use client";

import { Priority, PRIORITY_COLORS } from "@/constants/priority";
import { Ticket } from "@/generated/prisma/client";
import { CircleCheckBigIcon, CircleDashedIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

interface TicketRowProps {
	ticket: Ticket;
	setSelectedTicketId: (val: string) => void;
}

function TicketRow({ ticket, setSelectedTicketId }: TicketRowProps) {
	return (
		<TableRow>
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

					<p className="text-muted-foreground md:text-primary text-sm">{ticket.description}</p>
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
	);
}

export default TicketRow;
