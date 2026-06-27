"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth.actions";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = {
	success: false,
	message: "",
};

function LoginForm() {
	const router = useRouter();
	const [state, formAction] = useActionState(loginUser, initialState);

	useEffect(() => {
		if (state.success) {
			toast.success("Login successful!");
			router.push("/tickets");
			router.refresh();
		} else if (state.message) {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
		<main className="h-dvh">
			<section className="flex h-full items-center justify-center">
				<div className="flex flex-col items-center gap-6">
					<Card className="w-full max-w-sm min-w-sm">
						<CardContent>
							<h1 className="mb-6 text-xl font-semibold">Login your account</h1>

							<form action={formAction} className="flex flex-col gap-6">
								<div className="space-y-3">
									<Label htmlFor="email">Email</Label>

									<Input
										id="email"
										name="email"
										placeholder="Enter Email"
										type="email"
										className="py-6"
										autoComplete="off"
									/>
								</div>

								<div className="space-y-3">
									<Label htmlFor="password">Password</Label>

									<Input
										id="password"
										name="password"
										placeholder="Enter Password"
										type="password"
										className="py-6"
										autoComplete="off"
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<Button size="lg" type="submit">
										Login
									</Button>
								</div>
							</form>
						</CardContent>
					</Card>

					<div className="text-muted-foreground flex justify-center gap-1 text-sm">
						<p>Need an account?</p>

						<Link href="/register" className="text-primary font-medium hover:underline">
							Register
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
}

export default LoginForm;
