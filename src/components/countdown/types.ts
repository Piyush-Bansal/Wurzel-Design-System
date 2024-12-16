export type DateFormat =
	`${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export interface CountdownProps {
	targetDate: DateFormat;
}

export interface ICountdown {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	start(): void;
	stop(): void;
	reset(): void;
}
