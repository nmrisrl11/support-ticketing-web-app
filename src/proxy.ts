import { NextRequest, NextResponse } from "next/server";

import { cookieName, verifyAuthToken } from "./lib/auth";

const AUTH_ROUTES = ["/register", "/login"];
const PROTECTED_ROUTES = ["/tickets"];

export async function proxy(req: NextRequest): Promise<NextResponse> {
	const TOKEN = req.cookies.get(cookieName)?.value;
	const { pathname } = req.nextUrl;

	const isAuthRoute = AUTH_ROUTES.includes(pathname);
	const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

	//! If unauthenticated user go to PROTECTED_ROUTES
	if (isProtectedRoute) {
		if (!TOKEN) return NextResponse.redirect(new URL("/login", req.url));

		try {
			await verifyAuthToken(TOKEN);
			return NextResponse.next();
		} catch (error) {
			//! Token is invalid or expired. Clean the cookie and redirect to login page.
			const response = NextResponse.redirect(new URL("/login", req.url));
			response.cookies.delete(cookieName);

			return response;
		}
	}

	//! If authenticated user go to AUTH_ROUTES
	if (isAuthRoute) {
		if (!TOKEN) return NextResponse.next();

		try {
			await verifyAuthToken(TOKEN);
			return NextResponse.redirect(new URL("/tickets", req.url));
		} catch (error) {
			//! Token is invalid or expired. Clean the cookie but let the user stay on the login page.
			const response = NextResponse.next();
			response.cookies.delete(cookieName);

			return response;
		}
	}

	return NextResponse.next();
}

export const config = {
	// Match all pathnames except for
	// - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
	// - … the ones containing a dot (e.g. `favicon.ico`)
	matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
