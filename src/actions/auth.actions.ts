"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/db/prisma";
import bcrypt from "bcryptjs";

import { removeAuthCookie, setAuthCookie, signAuthToken } from "@/lib/auth";
import { logEvent } from "@/lib/sentry";

type ResponseResult = {
	success: boolean;
	message: string;
};

//! Register User
export async function registerUser(
	prevState: ResponseResult,
	formData: FormData,
): Promise<ResponseResult> {
	try {
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (!name || !email || !password) {
			logEvent("Validation Error: Missing registration fields", "auth", { name, email }, "warning");

			return { success: false, message: "All fields are required." };
		}

		//! Check if user exists
		const isUserExists = await prisma.user.findUnique({ where: { email } });

		if (isUserExists) {
			logEvent(`Registration failed: User already exists - ${email}`, "auth", { email }, "warning");
			return { success: false, message: "User already exists." };
		}

		//! Hash Password
		const hashedPassword = await bcrypt.hash(password, 10);

		//! Create user
		const user = await prisma.user.create({ data: { name, email, password: hashedPassword } });

		//! Sign and set auth token
		const token = await signAuthToken({ userId: user.id });
		await setAuthCookie(token);

		logEvent(`User registered successfully: ${email}`, "auth", { userId: user.id, email }, "info");

		return { success: true, message: "Registration successful" };
	} catch (error) {
		logEvent("Unexpected error during registration", "auth", {}, "error", error);

		return { success: false, message: "Something went wrong, please try again." };
	}
}

//! Login user
export async function loginUser(
	prevState: ResponseResult,
	formData: FormData,
): Promise<ResponseResult> {
	try {
		const email = formData.get("email") as string;
		const password = formData.get("password") as string;

		if (!email || !password) {
			logEvent("Validation Error: Missing login fields", "auth", { email }, "warning");

			return { success: false, message: "Email and password are required." };
		}

		const user = await prisma.user.findUnique({ where: { email } });

		if (!user || !user.password) {
			logEvent(`Login Failed: User not found - ${email}`, "auth", { email }, "warning");

			return { success: false, message: "Invalid email or password" };
		}

		const isMatched = await bcrypt.compare(password, user.password);

		if (!isMatched) {
			logEvent(`Login Failed: Incorrect password`, "auth", { email }, "warning");

			return { success: false, message: "Invalid email or password" };
		}

		//! Sign and set auth token
		const token = await signAuthToken({ userId: user.id });
		await setAuthCookie(token);

		return { success: true, message: "Login successful" };
	} catch (error) {
		logEvent("Unexpected error during login", "auth", {}, "error", error);

		return { success: false, message: "Something went wrong, please try again." };
	}
}

//! Log user out and remove auth cookie
export async function logoutUser(): Promise<ResponseResult> {
	let isSuccess = false;

	try {
		await removeAuthCookie();
		logEvent("User logged out successfully", "auth", {}, "info");
		isSuccess = true;
	} catch (error) {
		logEvent("Unexpected error during logout", "auth", {}, "error", error);
		return { success: false, message: "Logout failed, please try again." };
	}

	if (isSuccess) {
		redirect("/login");
	}

	return { success: false, message: "Unexpected state reached." };
}
