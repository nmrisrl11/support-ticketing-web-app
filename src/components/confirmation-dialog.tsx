import { CircleAlertIcon } from "lucide-react";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmationDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	isLoading?: boolean;
}

function ConfirmationDialog({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmText = "Confirm",
	cancelText = "Cancel",
	isLoading = false,
}: ConfirmationDialogProps) {
	return (
		<AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<AlertDialogContent>
				<div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
					<div
						aria-hidden="true"
						className="border-destructive/20 bg-destructive/10 text-destructive flex size-9 shrink-0 items-center justify-center rounded-full border"
					>
						<CircleAlertIcon className="opacity-80" size={16} />
					</div>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						<AlertDialogDescription>{description}</AlertDialogDescription>
					</AlertDialogHeader>
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isLoading}>{cancelText}</AlertDialogCancel>

					<Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
						{isLoading ? "Deleting..." : confirmText}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default ConfirmationDialog;
