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

type Priority = "Low" | "Medium" | "High";
type Status = "Pending" | "Done";

interface DataTableProps {
	subject: string;
	description: string;
	createdAt: number;
	priority: Priority;
	status: Status;
}

const data: DataTableProps[] = [
	{
		subject: "API Integration",
		description: "Connect frontend application to REST API endpoints and handle error responses",
		createdAt: 2024,
		priority: "High",
		status: "Done",
	},
	{
		subject: "Database Optimization",
		description: "Improve query performance by adding indexes and optimizing database schema",
		createdAt: 2024,
		priority: "Medium",
		status: "Pending",
	},
	{
		subject: "Unit Testing",
		description: "Write comprehensive unit tests for utility functions and service layers",
		createdAt: 2024,
		priority: "High",
		status: "Done",
	},
	{
		subject: "UI Refactoring",
		description: "Refactor reusable components to improve maintainability and code consistency",
		createdAt: 2025,
		priority: "Low",
		status: "Pending",
	},
	{
		subject: "Code Documentation",
		description: "Document project architecture, API contracts, and setup instructions",
		createdAt: 2025,
		priority: "Low",
		status: "Done",
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
										<span className="text-primary block font-bold md:hidden">Project</span>
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
								{data.map((item) => (
									<TableRow key={item.subject}>
										<TableCell className="hidden md:table-cell">{item.subject}</TableCell>
										<TableCell className="pl-0 align-top md:pl-4">
											<div className="flex flex-col gap-2">
												<div className="flex items-baseline justify-between gap-1 md:hidden">
													<div className="flex items-center gap-1">
														<span className="text-sm font-medium">{item.subject}</span>
														{item.status === "Done" ? (
															<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
																<CircleCheckBigIcon data-icon="inline-start" />
																{item.status}
															</Badge>
														) : (
															<Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
																<CircleDashedIcon data-icon="inline-start" />
																{item.status}
															</Badge>
														)}

														<span
															className={cn(
																"ml-1 block h-1.5 w-4 rounded-full md:hidden",
																item.priority === "High" && "bg-red-400",
																item.priority === "Medium" && "bg-orange-400",
																item.priority === "Low" && "bg-blue-400",
															)}
														/>
													</div>
													<span className="text-muted-foreground text-xs">{item.createdAt}</span>
												</div>
												<p className="text-muted-foreground md:text-primary text-sm">
													{item.description}
												</p>
											</div>
										</TableCell>

										<TableCell className="hidden md:table-cell">
											<div className="flex items-center gap-2">
												<span
													className={cn(
														"block h-6 w-1.5 rounded-full",
														item.priority === "High" && "bg-red-400",
														item.priority === "Medium" && "bg-orange-400",
														item.priority === "Low" && "bg-blue-400",
													)}
												></span>
												{item.priority}
											</div>
										</TableCell>
										<TableCell className="hidden md:table-cell">
											{item.status === "Done" ? (
												<Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
													<CircleCheckBigIcon data-icon="inline-start" />
													{item.status}
												</Badge>
											) : (
												<Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
													<CircleDashedIcon data-icon="inline-start" />
													{item.status}
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
