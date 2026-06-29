import { EditIcon, EllipsisIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ActionType } from "../types/ticket.types";

interface TicketActionMenuProps {
	handleActionType: (actionType: ActionType) => void;
}

function TicketActionMenu({ handleActionType }: TicketActionMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button aria-label="Open action menu" className="shadow-none" size="xs" variant="ghost">
					<EllipsisIcon aria-hidden="true" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => handleActionType("EDIT")}>
						<EditIcon aria-hidden="true" className="opacity-60" size={16} />
						Edit
					</DropdownMenuItem>

					<DropdownMenuItem variant="destructive" onClick={() => handleActionType("DELETE")}>
						<TrashIcon aria-hidden="true" size={16} />
						Delete
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default TicketActionMenu;
