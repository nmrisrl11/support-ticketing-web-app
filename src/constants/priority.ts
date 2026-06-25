export type Priority = "Low" | "Medium" | "High";

export const PRIORITY_COLORS: Record<Priority, string> = {
	High: "bg-red-400",
	Medium: "bg-orange-400",
	Low: "bg-blue-400",
};
