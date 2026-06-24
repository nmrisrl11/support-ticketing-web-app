import HeroTable from "@/components/hero-table";
import { Button } from "@/components/ui/button";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import Link from "next/link";

function HomePage() {
	return (
		<main className="mx-auto flex h-dvh w-full max-w-5xl flex-col justify-center gap-3">
			<section className="px-6 py-12">
				<div className="flex flex-col justify-center gap-3">
					<h1 className="gradient-text text-4xl font-extrabold sm:text-7xl">ResolveHub</h1>
					<div className="w-full max-w-3xl tracking-wide sm:text-lg">
						a
						<PointerHighlight
							rectangleClassName="bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-700 leading-loose"
							pointerClassName="text-orange-500 h-3 w-3"
							containerClassName="inline-block mx-1"
						>
							<span className="relative z-10">simple task tracker</span>
						</PointerHighlight>
						for creating and managing tickets with ease. Keep your work organized with clear
						subjects, descriptions, and priority levels.
					</div>

					<div className="space-x-1.5">
						<Button size="lg" variant="ghost" asChild>
							<Link href="tickets">Track Status</Link>
						</Button>
						<Button size="lg" variant="default" asChild>
							<Link href="tickets/new">Create Ticket</Link>
						</Button>
					</div>
				</div>

				<HeroTable />
			</section>
		</main>
	);
}

export default HomePage;
