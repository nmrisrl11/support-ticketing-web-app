import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
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

const HomePage = () => {
	return (
		<main className="mx-auto flex h-dvh w-full max-w-5xl flex-col justify-center gap-3">
			<section className="px-6 py-12">
				<div className="flex flex-col justify-center gap-3">
					<h1 className="text-4xl font-bold sm:text-7xl">ResolveHub</h1>
					<div className="w-full max-w-3xl tracking-wide sm:text-lg">
						a
						<PointerHighlight
							rectangleClassName="bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-700 leading-loose"
							pointerClassName="text-blue-500 h-3 w-3"
							containerClassName="inline-block mx-1"
						>
							<span className="relative z-10">powerful support ticketing system</span>
						</PointerHighlight>
						that helps businesses manage customer requests, track issues, automate workflows, and
						improve support efficiency.
					</div>

					<div className="space-x-1.5">
						<Button size="lg" variant="ghost">
							Track Status
						</Button>
						<Button size="lg" variant="default">
							Create Request
						</Button>
					</div>
				</div>

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

											<TableHead className="text-primary hidden text-right font-bold md:table-cell">
												Created At
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
																<span className="text-muted-foreground text-sm">
																	- {item.status}
																</span>
																<span
																	className={cn(
																		"ml-1 block h-1.5 w-4 rounded-full md:hidden",
																		item.priority === "High" && "bg-red-400",
																		item.priority === "Medium" && "bg-orange-400",
																		item.priority === "Low" && "bg-blue-400",
																	)}
																></span>
															</div>
															<span className="text-muted-foreground text-xs">
																{item.createdAt}
															</span>
														</div>
														<p className="text-muted-foreground md:text-primary text-sm">
															{item.description}
														</p>
													</div>
												</TableCell>

												<TableCell className="hidden text-right md:table-cell">
													{item.createdAt}
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
												<TableCell className="hidden md:table-cell">{item.status}</TableCell>
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
			</section>
		</main>
	);
};

export default HomePage;
