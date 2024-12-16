import { setContext } from 'svelte';

class Countdown {
	#targetDate = $state('');
	#endTime = $state(0);

	days = $state(0);
	hours = $state(0);
	minutes = $state(0);
	seconds = $state(0);

	#timerInterval?: ReturnType<typeof setInterval>;
	#onComplete?: () => void;

	constructor(targetDate: string, onComplete?: () => void) {
		// Validate date format
		if (!this.#isValidDateFormat(targetDate)) {
			throw new Error(
				'Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss)'
			);
		}

		this.#targetDate = targetDate;
		this.#updateEndTime();
		this.#onComplete = onComplete;
	}

	#isValidDateFormat(dateString: string): boolean {
		// Basic ISO 8601 format validation
		const isoDateRegex =
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/;
		return isoDateRegex.test(dateString) && !isNaN(Date.parse(dateString));
	}

	#updateEndTime() {
		this.#endTime = new Date(this.#targetDate).getTime();
	}

	start() {
		// Clear any existing interval
		this.stop();

		// Initial calculation
		this.#calculate();

		// Start interval
		this.#timerInterval = setInterval(() => {
			this.#calculate();
		}, 1000);
	}

	stop() {
		if (this.#timerInterval) {
			clearInterval(this.#timerInterval);
			this.#timerInterval = undefined;
		}
	}

	#calculate() {
		const now = Date.now();
		const difference = this.#endTime - now;

		if (difference <= 0) {
			this.stop();
			this.reset();
			// Call the completion callback if provided
			this.#onComplete?.();
			return;
		}

		// More efficient time calculation
		const totalSeconds = Math.floor(difference / 1000);

		this.days = Math.floor(totalSeconds / (24 * 3600));
		const remainingSeconds = totalSeconds % (24 * 3600);

		this.hours = Math.floor(remainingSeconds / 3600);
		const remainingMinutes = remainingSeconds % 3600;

		this.minutes = Math.floor(remainingMinutes / 60);
		this.seconds = remainingMinutes % 60;
	}

	reset() {
		this.days = 0;
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
	}
}

const COUNTDOWN_KEY = Symbol('COUNTDOWN');

export const createCountdown = (
	targetDate: string,
	options?: { onComplete: () => void }
) => {
	const countdown = new Countdown(targetDate, options?.onComplete);
	setContext(COUNTDOWN_KEY, countdown);
	return countdown;
};
