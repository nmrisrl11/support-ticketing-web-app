"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/actions/auth.actions";
import { toast } from "sonner";

import { Button } from "./ui/button";

const initialState = {
	success: false,
	message: "",
};

function LogoutButton() {
	const router = useRouter();
	const [state, formAction] = useActionState(logoutUser, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Logout successful!");
			router.push("/login");
			router.refresh();
		} else if (state.message) {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
		<form action={formAction}>
			<Button variant="destructive" className="h-auto rounded-lg px-3 py-1.5 text-xs" type="submit">
				Logout
			</Button>
		</form>
	);
}

export default LogoutButton;
