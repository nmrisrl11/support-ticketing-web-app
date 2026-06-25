import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "ResolveHub - Simple Task Tracking Made Easy",
	description:
		"ResolveHub is a lightweight task tracking app for organizing everyday work. It lets you create and manage simple tickets with priority levels, helping you keep tasks clear, structured, and easy to follow.",
	keywords: [
		"task-tracker",
		"task-management",
		"ticket-tracker",
		"ticket-management",
		"todo-app",
		"task-organizer",
		"priority-tracking",
		"work-tracker",
		"productivity-tool",
		"resolvehub",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
		>
			<body className="flex min-h-full flex-col">
				<Navbar />
				{children}
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
