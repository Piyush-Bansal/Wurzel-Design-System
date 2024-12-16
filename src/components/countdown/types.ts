export type DateFormat =
	`${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export interface CountdownProps {
	targetDate: DateFormat;
	options?: { onComplete: () => void };
}
