import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
	title: "ResolveHub",
	description:
		"ResolveHub is a powerful support ticketing system that helps businesses manage customer requests, track issues, automate workflows, and improve support efficiency.",
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
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	);
}
