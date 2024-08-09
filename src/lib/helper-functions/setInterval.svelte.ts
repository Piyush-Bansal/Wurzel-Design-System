export class Interval<T, U> {
	private intervalId: ReturnType<typeof setInterval> | null = $state(null);
	isRunning = $derived(this.intervalId);

	constructor(private duration: number) {}

	start(func: (arg?: T) => U, arg?: T): void {
		if (this.intervalId) {
			// console.error('Interval already running');
			return;
		}

		this.intervalId = setInterval(() => {
			func(arg);
		}, this.duration);
	}

	stop(): void {
		if (!this.intervalId) {
			// console.error('No interval to stop');
			return;
		}

		clearInterval(this.intervalId);
		this.intervalId = null;
	}
}
