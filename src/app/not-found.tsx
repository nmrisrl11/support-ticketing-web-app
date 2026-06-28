import Link from "next/link";

import { Button } from "@/components/ui/button";

function NotFoundPage() {
	return (
		<main className="h-dvh">
			<section className="flex h-full flex-col items-center justify-center gap-3">
				<div className="text-center">
					<span className="text-7xl font-extrabold">
						4<span className="gradient-text">0</span>4
					</span>
					<h2 className="text-4xl font-semibold">
						Page <span className="gradient-text">Not</span> Found
					</h2>
				</div>

				<p className="text-xl">Oops! We couldn&apos;t find what you were looking for.</p>

				<Button asChild>
					<Link href="/">Return Home</Link>
				</Button>
			</section>
		</main>
	);
}
export default NotFoundPage;
