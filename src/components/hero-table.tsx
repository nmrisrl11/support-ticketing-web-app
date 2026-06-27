import { PRIORITY_COLORS } from "@/constants/priority";
import { Priority } from "@/generated/prisma/enums";
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

type Status = "Open" | "Closed";

interface TicketsTableProps {
	subject: string;
	description: string;
	priority: Priority;
	status: Status;
}

const tickets: TicketsTableProps[] = [
	{
		subject: "API Integration",
		description: "Connect frontend application to REST API endpoints and handle error responses",
		priority: "High",
		status: "Closed",
	},
	{
		subject: "Database Optimization",
		description: "Improve query performance by adding indexes and optimizing database schema",
		priority: "Medium",
		status: "Open",
	},
	{
		subject: "Unit Testing",
		description: "Write comprehensive unit tests for utility functions and service layers",
		priority: "High",
		status: "Closed",
	},
	{
		subject: "UI Refactoring",
		description: "Refactor reusable components to improve maintainability and code consistency",
		priority: "Low",
		status: "Open",
	},
	{
		subject: "Code Documentation",
		description: "Document project architecture, API contracts, and setup instructions",
		priority: "Low",
		status: "Closed",
	},
];

function HeroTable() {
	return (
		<div className="mt-12">
			<Card className="relative ring-0">
				<CardContent className="relative">
					<div className="container px-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="text-primary hidden font-bold md:table-cell">
										Subject
									</TableHead>

									<TableHead>
										<span className="text-primary hidden font-bold md:block">Description</span>
										<span className="text-primary block font-bold md:hidden">Tickets</span>
									</TableHead>

									<TableHead className="text-primary hidden font-bold md:table-cell">
										Priority
									</TableHead>

									<TableHead className="text-primary hidden font-bold md:table-cell">
										Status
									</TableHead>
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
														{ticket.status === "Closed" ? (
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
																PRIORITY_COLORS[ticket.priority],
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
														PRIORITY_COLORS[ticket.priority],
													)}
												/>
												{ticket.priority}
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{ticket.status === "Closed" ? (
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
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>

				<div
					aria-hidden
					className="to-background pointer-events-none absolute inset-0 z-10 bg-linear-to-b from-transparent"
				/>
			</Card>
		</div>
	);
}

export default HeroTable;
