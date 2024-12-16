export type DateFormat =
	`${number}-${number}-${number}T${number}:${number}:${number}${string}`;

export interface Date {
	targetDate: DateFormat;
}

export interface CountDownState {
	interval: undefined | number;
	diff: number;
	days: number;
	hr: number;
	min: number;
	sec: number;
	targetDate: DateFormat;
	calculateTimeLeft(): void;
	resetTimeLeft(): void;
	clearInterval(): void;
	computeTime(): void;
}
