"use client";

import { useActionState, useEffect } from "react";
import { logoutUser } from "@/actions/auth.actions";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const initialState = {
	success: false,
	message: "",
};

function LogoutButton({ className }: { className?: string }) {
	const [state, formAction] = useActionState(logoutUser, initialState);

	useEffect(() => {
		if (!state.success && state.message) {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<Button
				variant="destructive"
				className={cn("h-auto rounded-lg px-3 py-1.5 text-xs", className)}
				type="submit"
			>
				Logout
			</Button>
		</form>
	);
}

export default LogoutButton;
