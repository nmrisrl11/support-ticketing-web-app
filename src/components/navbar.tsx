"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NAV_ITEMS = [
	{ name: "Home", link: "/" },
	{ name: "Tickets", link: "/tickets" },
];

const MobileNav = () => {
	return (
		<div className="mr-2 flex items-center justify-center md:hidden">
			<Popover>
				<PopoverTrigger>
					<Menu className="text-foreground size-5" />
				</PopoverTrigger>

				<PopoverContent
					align="center"
					className="w-screen overflow-hidden rounded-t-none border-0 bg-neutral-200 ring-0 dark:bg-neutral-900"
				>
					<div className="text-foreground w-full pt-2 backdrop-blur-md">
						{NAV_ITEMS.map((navItem, idx) => (
							<div key={idx} className="hover:bg-accent rounded-lg px-4 py-3 text-xs">
								<a href={navItem.link} className="flex items-center justify-between">
									<span className="text-foreground">{navItem.name}</span>
								</a>
							</div>
						))}

						<div className="flex flex-col gap-2 py-2">
							<Button variant="default" className="px-3 text-xs">
								Log in
							</Button>
						</div>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
};

function Navbar() {
	return (
		<section
			className={cn(
				"fixed top-0 left-1/2 z-50 -translate-x-1/2",
				"flex w-full max-w-full items-center justify-between bg-linear-to-t from-neutral-200 to-neutral-300 px-6 py-3 md:w-fit md:rounded-b-2xl md:px-12 lg:gap-4 dark:from-neutral-900 dark:to-neutral-950",
			)}
		>
			<MobileNav />

			<div className="hidden md:flex">
				{NAV_ITEMS.map((item, index) => (
					<Link key={index} href={item.link} className="bg-transparent px-3 py-1.5 text-xs">
						{item.name}
					</Link>
				))}
			</div>

			<div className="hidden md:block">
				<Button variant="default" className="h-auto rounded-lg px-3 py-1.5 text-xs">
					Log in
				</Button>
			</div>
		</section>
	);
}

export default Navbar;
