"use client";

import { useActionState, useEffect } from "react";
import { logoutUser } from "@/actions/auth.actions";
import { toast } from "sonner";

import { Button } from "./ui/button";

const initialState = {
	success: false,
	message: "",
};

function LogoutButton() {
	const [state, formAction] = useActionState(logoutUser, initialState);

	useEffect(() => {
		if (!state.success && state.message) {
			toast.error(state.message);
		}
	}, [state]);

	return (
		<form action={formAction}>
			<Button variant="destructive" className="h-auto rounded-lg px-3 py-1.5 text-xs" type="submit">
				Logout
			</Button>
		</form>
	);
}

export default LogoutButton;
