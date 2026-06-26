import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "./lib/auth";

const AUTH_ROUTES = ["/register", "/login"];
const PROTECTED_ROUTES = ["/tickets"];

export function proxy(req: NextRequest): NextResponse {
	const TOKEN = req.cookies.get(cookieName)?.value;
	const { pathname } = req.nextUrl;

	const isAuthRoute = AUTH_ROUTES.includes(pathname);
	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

	//! If unauthenticated user go to PROTECTED_ROUTES
	if (!TOKEN && isProtectedRoute) {
		const targetPath = new URL("/login", req.url);
		return NextResponse.redirect(targetPath);
	}

	//! If authenticated user go to AUTH_ROUTES
	if (TOKEN && isAuthRoute) {
		const ticketsPath = new URL("/tickets", req.url);
		return NextResponse.redirect(ticketsPath);
	}

	return NextResponse.next();
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
